import { TETRIS_COLORS, TetrisColor, RawArticleData, ParsedArticle, ArticleSection } from '../types/article';

// Eagerly import all article assets from the files/articles folder
const articleImageModules = import.meta.glob('../files/articles/*', { eager: true, import: 'default' });

/**
 * Resolves a given image or video link into a playable/renderable URL.
 */
export function resolveArticleMedia(pathOrUrl?: string): { url: string; isYouTube: boolean } {
  if (!pathOrUrl) {
    return { url: '', isYouTube: false };
  }

  const trimmed = pathOrUrl.trim();

  // Check for YouTube URL
  const ytMatch = trimmed.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (ytMatch && ytMatch[1]) {
    return {
      url: `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?autoplay=0&rel=0`,
      isYouTube: true,
    };
  }

  // If already an absolute http/https/data URL
  if (/^(https?:|\/\/|data:)/i.test(trimmed)) {
    return { url: trimmed, isYouTube: false };
  }

  // Clean filename to search in imported assets
  const filename = trimmed.replace(/^.*[\\\/]/, '');

  for (const [key, value] of Object.entries(articleImageModules)) {
    if (key.endsWith('/' + filename) || key.endsWith('\\' + filename)) {
      return { url: value as string, isYouTube: false };
    }
  }

  // Fallback to direct path
  return { url: trimmed, isYouTube: false };
}

/**
 * Seeded pseudo-random generator to produce deterministic Tetris bag per article ID
 */
function createSeededRandom(seedStr: string) {
  let hash = 0;
  for (let i = 0; i < seedStr.length; i++) {
    hash = (hash << 5) - hash + seedStr.charCodeAt(i);
    hash |= 0;
  }
  return function () {
    hash = (hash * 9301 + 49297) % 233280;
    return Math.abs(hash) / 233280;
  };
}

/**
 * Generates an array of Tetris random colors for N items (header + images)
 * Rule: 4-color bag (Yellow, Blue, Red, Green). Draw without replacement.
 * When bag is empty, refill and reshuffle.
 */
export function generateTetrisColorSequence(count: number, seed: string): TetrisColor[] {
  const rand = createSeededRandom(seed);
  const result: TetrisColor[] = [];
  let currentBag: TetrisColor[] = [];

  for (let i = 0; i < count; i++) {
    if (currentBag.length === 0) {
      // Refill full 4-color bag
      currentBag = [...TETRIS_COLORS];
      // Fisher-Yates shuffle with seeded random
      for (let j = currentBag.length - 1; j > 0; j--) {
        const k = Math.floor(rand() * (j + 1));
        [currentBag[j], currentBag[k]] = [currentBag[k], currentBag[j]];
      }
    }
    result.push(currentBag.pop()!);
  }

  return result;
}

/**
 * Parse raw article input into ordered sections with assigned Tetris colors.
 */
export function parseArticle(raw: RawArticleData): ParsedArticle {
  const title = raw.HeaderTitle || 'Untitled Article';
  const slug = raw.slug || raw.id || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const id = raw.id || slug;

  // Find all numbered items in raw object
  const bodyTitleMap: Record<number, string> = {};
  const bodySubTitleMap: Record<number, string> = {};
  const bodyTextMap: Record<number, string> = {};
  const bodyImageMap: Record<number, string> = {};
  const bodyImageTextMap: Record<number, string> = {};
  let fallbackImageText = '';

  const indices = new Set<number>();

  for (const [key, val] of Object.entries(raw)) {
    if (!val || typeof val !== 'string') continue;

    const titleMatch = key.match(/^BodyTitle(\d+)$/i);
    if (titleMatch) {
      const idx = parseInt(titleMatch[1], 10);
      bodyTitleMap[idx] = val;
      indices.add(idx);
      continue;
    }

    const subTitleMatch = key.match(/^BodySub(?:Title)?(\d+)$/i);
    if (subTitleMatch) {
      const idx = parseInt(subTitleMatch[1], 10);
      bodySubTitleMap[idx] = val;
      indices.add(idx);
      continue;
    }

    const textMatch = key.match(/^BodyText(\d+)$/i);
    if (textMatch) {
      const idx = parseInt(textMatch[1], 10);
      bodyTextMap[idx] = val;
      indices.add(idx);
      continue;
    }

    const imgTextMatch = key.match(/^BodyI?mage(\d+)Text$/i) || key.match(/^BodyI?mageText(\d+)$/i);
    if (imgTextMatch) {
      const idx = parseInt(imgTextMatch[1], 10);
      bodyImageTextMap[idx] = val;
      indices.add(idx);
      continue;
    }

    if (key.match(/^BodyI?mageText$/i)) {
      fallbackImageText = val;
      continue;
    }

    const imgMatch = key.match(/^BodyI?mage(\d+)$/i);
    if (imgMatch) {
      const idx = parseInt(imgMatch[1], 10);
      bodyImageMap[idx] = val;
      indices.add(idx);
      continue;
    }
  }

  // Count total images needed (including header if header needs a color)
  const imageIndicesSorted = Array.from(indices).filter((idx) => Boolean(bodyImageMap[idx])).sort((a, b) => a - b);
  
  // If there is a fallback unnumbered image text and only one image without explicit text, assign it
  if (fallbackImageText) {
    for (const idx of imageIndicesSorted) {
      if (!bodyImageTextMap[idx]) {
        bodyImageTextMap[idx] = fallbackImageText;
        break;
      }
    }
  }

  const totalColorSlots = 1 + imageIndicesSorted.length; // 1 for header + N for body images

  const colorSequence = generateTetrisColorSequence(totalColorSlots, id || title);
  const headerBgColor = colorSequence[0];
  const imageColorMap: Record<number, TetrisColor> = {};

  imageIndicesSorted.forEach((idx, i) => {
    imageColorMap[idx] = colorSequence[1 + i];
  });

  const sortedIndices = Array.from(indices).sort((a, b) => a - b);
  const sections: ArticleSection[] = [];

  for (const idx of sortedIndices) {
    if (bodyTextMap[idx] || bodyTitleMap[idx] || bodySubTitleMap[idx]) {
      sections.push({
        type: 'text',
        index: idx,
        title: bodyTitleMap[idx],
        subtitle: bodySubTitleMap[idx],
        text: bodyTextMap[idx],
      });
    }

    if (bodyImageMap[idx]) {
      const media = resolveArticleMedia(bodyImageMap[idx]);
      sections.push({
        type: media.isYouTube ? 'video' : 'image',
        index: idx,
        mediaUrl: media.url,
        caption: bodyImageTextMap[idx] || '',
        bgColor: imageColorMap[idx] || '#FFE800',
      });
    }
  }

  return {
    id,
    slug,
    headerTitle: title,
    headerImage: raw.HeaderImage ? resolveArticleMedia(raw.HeaderImage).url : undefined,
    headerSubTitle: raw.HeaderSubTitle,
    headerBgColor,
    sections,
    raw,
  };
}
