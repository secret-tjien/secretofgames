export type TetrisColor = '#FFE800' | '#29ABE1' | '#ED2024' | '#3CB64B';

export const TETRIS_COLORS: TetrisColor[] = [
  '#FFE800', // Yellow
  '#29ABE1', // Blue
  '#ED2024', // Red
  '#3CB64B', // Green
];

export interface RawArticleData {
  id?: string;
  slug?: string;
  HeaderTitle: string;
  HeaderImage?: string;
  HeaderSubTitle?: string;
  [key: string]: string | undefined;
}

export type ArticleSectionType = 'text' | 'image' | 'video';

export interface ArticleSection {
  type: ArticleSectionType;
  index: number;
  title?: string;
  subtitle?: string;
  text?: string;
  mediaUrl?: string;
  caption?: string;
  bgColor?: TetrisColor;
}

export interface ParsedArticle {
  id: string;
  slug: string;
  headerTitle: string;
  headerImage?: string;
  headerSubTitle?: string;
  headerBgColor: TetrisColor;
  sections: ArticleSection[];
  raw: RawArticleData;
}
