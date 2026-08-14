/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { ChevronsDown } from 'lucide-react';
import Layer0 from './components/Layer0';
import { MainWebsiteContent } from './components/MainWebsiteContent';
import { ArticleView } from './components/ArticleView';
import { getArticleById } from './data/articles';
import { CONFIG } from './config';

export default function App() {
  const [activeArticleId, setActiveArticleId] = useState<string | null>(() => {
    if (typeof window !== 'undefined' && window.location.hash.startsWith('#article/')) {
      return window.location.hash.replace('#article/', '');
    }
    return null;
  });

  const containerRef = useRef<HTMLElement>(null);
  const topCurtainRef = useRef<HTMLDivElement>(null);
  const bottomCurtainRef = useRef<HTMLDivElement>(null);
  const topOverlayRef = useRef<HTMLDivElement>(null);
  const bottomOverlayRef = useRef<HTMLDivElement>(null);
  const sequenceBarRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLElement | null)[]>([]);
  const reverseWordRefs = useRef<(HTMLElement | null)[]>([]);
  const headerLogoRef = useRef<HTMLDivElement>(null);
  const headerButtonsRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef<number>(0);
  const isScrollingDownRef = useRef<boolean>(true);

  const handleNavigateToSection = (sectionId: string) => {
    if (activeArticleId) {
      setActiveArticleId(null);
      window.history.pushState(null, '', window.location.pathname);
    }
    const el = document.getElementById(sectionId);
    if (el && containerRef.current) {
      const targetTop = el.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top + containerRef.current.scrollTop;
      containerRef.current.scrollTo({ top: targetTop, behavior: 'smooth' });
    }
  };

  const handleSelectArticle = (articleIdOrSlug: string) => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
    setActiveArticleId(articleIdOrSlug);
    window.location.hash = `#article/${articleIdOrSlug}`;
  };

  const scrollToResourcesSection = () => {
    const tryScroll = (attempts = 0) => {
      const el = document.getElementById('resources');
      if (el && containerRef.current) {
        const targetTop = el.getBoundingClientRect().top - containerRef.current.getBoundingClientRect().top + containerRef.current.scrollTop;
        containerRef.current.scrollTo({ top: targetTop, behavior: 'smooth' });
      } else if (attempts < 10) {
        setTimeout(() => tryScroll(attempts + 1), 40);
      }
    };
    requestAnimationFrame(() => tryScroll(0));
  };

  const handleCloseArticle = () => {
    setActiveArticleId(null);
    if (window.location.hash.startsWith('#article/')) {
      window.history.pushState(null, '', window.location.pathname);
    }
    scrollToResourcesSection();
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash.startsWith('#article/')) {
        const id = window.location.hash.replace('#article/', '');
        if (containerRef.current) {
          containerRef.current.scrollTop = 0;
        }
        window.scrollTo(0, 0);
        setActiveArticleId(id);
      } else if (activeArticleId) {
        setActiveArticleId(null);
        scrollToResourcesSection();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeArticleId]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number | null = null;

    const calculateWordState = (
      idx: number,
      progress: number,
      words: typeof CONFIG.blinds.sequenceWords,
      isScrollingDown: boolean
    ) => {
      if (!isScrollingDown) {
        return { opacity: 0, blur: CONFIG.blinds.sequenceBlurAmount, translateX: -CONFIG.blinds.sequenceSlideDistance };
      }

      const targetP = words[idx].progress;
      const isLast = idx === words.length - 1;
      const prevP = idx > 0 ? words[idx - 1].progress : 0;
      
      const entryStart = idx === 0 ? 0.15 : prevP + (targetP - prevP) * 0.25;
      const entryEnd = targetP;
      
      const nextP = !isLast ? words[idx + 1].progress : 1.0;
      const peakEnd = isLast ? targetP + (1.0 - targetP) * 0.3 : targetP + (nextP - targetP) * 0.25;
      const exitEnd = isLast ? targetP + (1.0 - targetP) * 0.85 : targetP + (nextP - targetP) * 0.65;

      let opacity = 0;
      let blur = CONFIG.blinds.sequenceBlurAmount;
      let translateX = -CONFIG.blinds.sequenceSlideDistance;

      if (progress < entryStart) {
        opacity = 0;
        blur = CONFIG.blinds.sequenceBlurAmount;
        translateX = -CONFIG.blinds.sequenceSlideDistance;
      } else if (progress >= entryStart && progress <= entryEnd) {
        const t = (progress - entryStart) / (entryEnd - entryStart);
        opacity = Math.min(1, Math.max(0, t));
        blur = (1 - t) * CONFIG.blinds.sequenceBlurAmount;
        translateX = (t - 1) * CONFIG.blinds.sequenceSlideDistance;
      } else if (progress > entryEnd && progress <= peakEnd) {
        opacity = 1;
        blur = 0;
        translateX = 0;
      } else if (progress > peakEnd && progress <= exitEnd) {
        const t = (progress - peakEnd) / (exitEnd - peakEnd);
        opacity = Math.min(1, Math.max(0, 1 - t));
        blur = t * (CONFIG.blinds.sequenceBlurAmount * 0.7);
        translateX = t * 20;
      } else {
        opacity = 0;
        blur = CONFIG.blinds.sequenceBlurAmount;
        translateX = 20;
      }

      return { opacity, blur, translateX };
    };

    const calculateReverseWordState = (
      idx: number,
      progress: number,
      words: typeof CONFIG.blinds.reverseSequenceWords,
      isScrollingDown: boolean
    ) => {
      if (isScrollingDown) {
        return { opacity: 0, blur: CONFIG.blinds.sequenceBlurAmount, translateX: -CONFIG.blinds.sequenceSlideDistance };
      }

      const targetP = words[idx].progress;
      const isFirst = idx === 0;
      const isLast = idx === words.length - 1;

      const prevP = isFirst ? 1.0 : words[idx - 1].progress;
      const nextP = isLast ? 0.0 : words[idx + 1].progress;

      const entryStart = isFirst ? 0.85 : targetP + (prevP - targetP) * 0.75;
      const entryEnd = targetP + (prevP - targetP) * 0.25;
      const peakEnd = targetP - (targetP - nextP) * 0.25;
      const exitEnd = isLast ? 0.0 : targetP - (targetP - nextP) * 0.75;

      let opacity = 0;
      if (progress > entryStart) {
        opacity = 0;
      } else if (progress <= entryStart && progress > entryEnd) {
        const t = (entryStart - progress) / (entryStart - entryEnd);
        opacity = Math.min(1, Math.max(0, t));
      } else if (progress <= entryEnd && progress >= peakEnd) {
        opacity = 1;
      } else if (progress < peakEnd && progress >= exitEnd) {
        const t = (progress - exitEnd) / (peakEnd - exitEnd);
        opacity = Math.min(1, Math.max(0, t));
      } else {
        opacity = 0;
      }

      const blur = CONFIG.blinds.sequenceBlurAmount > 0 ? (1 - opacity) * CONFIG.blinds.sequenceBlurAmount : 0;
      const translateX = CONFIG.blinds.sequenceSlideDistance > 0 ? (1 - opacity) * -CONFIG.blinds.sequenceSlideDistance : 0;

      return { opacity, blur, translateX };
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!container) return;
        const scrollTop = container.scrollTop;
        const blindsMaxScroll = (window.innerHeight * 150) / (Math.max(0.01, CONFIG.blinds.closeSpeed || 1) * 100);
        const progress = blindsMaxScroll > 0 ? Math.min(1, Math.max(0, scrollTop / blindsMaxScroll)) : 0;

        const delta = scrollTop - lastScrollTopRef.current;
        const reverseThreshold = CONFIG.blinds.reverseThresholdPx ?? 15;

        if (delta > 0) {
          isScrollingDownRef.current = true;
          lastScrollTopRef.current = scrollTop;
        } else if (delta < -reverseThreshold) {
          isScrollingDownRef.current = false;
          lastScrollTopRef.current = scrollTop;
        } else if (progress >= 0.98) {
          isScrollingDownRef.current = true;
        }

        const isScrollingDown = isScrollingDownRef.current;

        if (topCurtainRef.current) {
          topCurtainRef.current.style.transform = `scaleY(${progress})`;
          if (progress < CONFIG.blinds.threshold) {
            topCurtainRef.current.style.background = '#000';
          } else {
            topCurtainRef.current.style.background = `linear-gradient(to bottom, #000 ${CONFIG.blinds.falloffStart}%, rgba(0,0,0,0) ${CONFIG.blinds.falloffEnd}%)`;
          }
        }
        if (bottomCurtainRef.current) {
          bottomCurtainRef.current.style.transform = `scaleY(${progress})`;
          if (progress < CONFIG.blinds.threshold) {
            bottomCurtainRef.current.style.background = '#000';
          } else {
            bottomCurtainRef.current.style.background = `linear-gradient(to top, #000 ${CONFIG.blinds.falloffStart}%, rgba(0,0,0,0) ${CONFIG.blinds.falloffEnd}%)`;
          }
        }

        if (topOverlayRef.current) {
          topOverlayRef.current.style.transform = `scaleY(${progress})`;
        }
        if (bottomOverlayRef.current) {
          bottomOverlayRef.current.style.transform = `scaleY(${progress})`;
        }

        if (sequenceBarRef.current) {
          sequenceBarRef.current.style.transform = `translateY(${-progress * CONFIG.blinds.closingWidth}vh)`;
        }

        CONFIG.blinds.sequenceWords.forEach((_word, idx) => {
          const el = wordRefs.current[idx];
          if (!el) return;
          const state = calculateWordState(idx, progress, CONFIG.blinds.sequenceWords, isScrollingDown);
          if (state.opacity <= 0.001) {
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
            el.style.filter = 'none';
          } else {
            el.style.visibility = 'visible';
            el.style.opacity = state.opacity.toFixed(3);
            el.style.filter = state.blur <= 0.1 ? 'none' : `blur(${state.blur.toFixed(1)}px)`;
            el.style.transform = `translate(-50%, 0) translateX(${state.translateX.toFixed(1)}px)`;
          }
        });

        CONFIG.blinds.reverseSequenceWords?.forEach((_word, idx) => {
          const el = reverseWordRefs.current[idx];
          if (!el) return;
          const state = calculateReverseWordState(idx, progress, CONFIG.blinds.reverseSequenceWords, isScrollingDown);
          if (state.opacity <= 0.001) {
            el.style.opacity = '0';
            el.style.visibility = 'hidden';
            el.style.filter = 'none';
          } else {
            el.style.visibility = 'visible';
            el.style.opacity = state.opacity.toFixed(3);
            el.style.filter = state.blur <= 0.1 ? 'none' : `blur(${state.blur.toFixed(1)}px)`;
            el.style.transform = `translate(-50%, -50%) translateX(${state.translateX.toFixed(1)}px)`;
          }
        });

        if (scrollHintRef.current && CONFIG.scrollHint?.enabled) {
          if (scrollTop > 0) {
            const fadeThreshold = CONFIG.scrollHint.fadeSpeed || 0.05;
            const hintOpacity = Math.max(0, 1 - progress / fadeThreshold);
            scrollHintRef.current.style.opacity = hintOpacity.toFixed(3);
            scrollHintRef.current.style.pointerEvents = hintOpacity > 0 ? 'auto' : 'none';
          }
        }

        // Fade in Section 1 (Logo + Title first, Buttons second) smoothly as user scrolls downwards
        const fadeStartLogo = blindsMaxScroll * 0.50;
        const fadeEndLogo = blindsMaxScroll * 0.90;
        const logoProgress = Math.min(1, Math.max(0, (scrollTop - fadeStartLogo) / (fadeEndLogo - fadeStartLogo)));

        const fadeStartButtons = blindsMaxScroll * 0.70;
        const fadeEndButtons = blindsMaxScroll * 1.10;
        const buttonsProgress = Math.min(1, Math.max(0, (scrollTop - fadeStartButtons) / (fadeEndButtons - fadeStartButtons)));

        if (headerLogoRef.current) {
          headerLogoRef.current.style.opacity = logoProgress.toFixed(3);
          headerLogoRef.current.style.transform = `translateY(${((1 - logoProgress) * 35).toFixed(1)}px)`;
        }
        if (headerButtonsRef.current) {
          headerButtonsRef.current.style.transform = `translateY(${((1 - buttonsProgress) * 35).toFixed(1)}px)`;
        }

        // Expose progress and scroll metrics globally for Layer0 animation loop
        (window as any).__VOLTARE_SCROLL_PROGRESS = progress;
        (window as any).__VOLTARE_SCROLL_TOP = scrollTop;
        (window as any).__VOLTARE_BLINDS_MAX_SCROLL = blindsMaxScroll;
      });
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  const currentArticle = activeArticleId ? getArticleById(activeArticleId) : null;

  return (
    <main 
      ref={containerRef}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden font-sans bg-black text-white selection:bg-[#faed24] selection:text-black"
    >
      {/* Fixed Background Gradient Layer covering total view */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
        <Layer0 showParticles={!currentArticle} />
      </div>

      {currentArticle ? (
        /* Active Article View */
        <div className="relative z-30 w-full bg-transparent px-[2vw] md:px-6 lg:px-12 py-8 md:py-12">
          <div className="w-full max-w-4xl lg:max-w-5xl mx-auto overflow-hidden">
            <ArticleView 
              article={currentArticle} 
              onClose={handleCloseArticle} 
            />
          </div>
        </div>
      ) : (
        /* Standard Home View with Interactive Blinds & Content */
        <>
          {/* Interactive Blinds Container Section */}
          <div 
            className="relative w-full z-10"
            style={{ height: `calc(100vh + ${150 / Math.max(0.01, CONFIG.blinds.closeSpeed || 1)}vh)` }}
          >
            <div className="sticky top-0 left-0 w-full h-screen overflow-hidden z-20 pointer-events-none px-[2vw] md:px-6 lg:px-12">
              {/* Centered Column for Blinds & Content matching MainWebsiteContent max-width */}
              <div className="relative w-full max-w-4xl lg:max-w-5xl h-full mx-auto overflow-hidden">
                {/* Top Black Curtain with Soft Edge Falloff */}
                <div 
                  ref={topCurtainRef}
                  className="absolute top-0 left-0 w-full z-20 pointer-events-none will-change-transform bg-black"
                  style={{ 
                    height: `${CONFIG.blinds.closingWidth}vh`, 
                    transformOrigin: 'top', 
                    transform: 'scaleY(0)'
                  }}
                />

                {/* Bottom Black Curtain with Soft Edge Falloff */}
                <div 
                  ref={bottomCurtainRef}
                  className="absolute bottom-0 left-0 w-full z-20 pointer-events-none will-change-transform bg-black"
                  style={{ 
                    height: `${CONFIG.blinds.closingWidth}vh`, 
                    transformOrigin: 'bottom', 
                    transform: 'scaleY(0)'
                  }}
                />

                {/* Top 30% Transparent Overlay Box with Solid Black Edge Line */}
                <div 
                  ref={topOverlayRef}
                  className="absolute top-0 left-0 w-full z-25 pointer-events-none will-change-transform"
                  style={{ 
                    height: `${CONFIG.blinds.closingWidth}vh`, 
                    transformOrigin: 'top', 
                    transform: 'scaleY(0)',
                    backgroundColor: `rgba(0, 0, 0, ${CONFIG.blinds.overlayOpacity})`
                  }}
                >
                  <div 
                    className="absolute bottom-0 left-0 w-full pointer-events-none"
                    style={{ 
                      height: `${CONFIG.blinds.edgeLineWidth}px`, 
                      backgroundColor: CONFIG.blinds.edgeLineColor 
                    }}
                  />
                </div>

                {/* Bottom 30% Transparent Overlay Box with Solid Black Edge Line */}
                <div 
                  ref={bottomOverlayRef}
                  className="absolute bottom-0 left-0 w-full z-25 pointer-events-none will-change-transform"
                  style={{ 
                    height: `${CONFIG.blinds.closingWidth}vh`, 
                    transformOrigin: 'bottom', 
                    transform: 'scaleY(0)',
                    backgroundColor: `rgba(0, 0, 0, ${CONFIG.blinds.overlayOpacity})`
                  }}
                >
                  <div 
                    className="absolute top-0 left-0 w-full pointer-events-none"
                    style={{ 
                      height: `${CONFIG.blinds.edgeLineWidth}px`, 
                      backgroundColor: CONFIG.blinds.edgeLineColor 
                    }}
                  />
                </div>

                {/* 4-Word Sequence Bar attached to Top Edge of Bottom Closing Blind */}
                <div 
                  ref={sequenceBarRef}
                  className="absolute bottom-0 left-0 w-full z-30 pointer-events-none flex items-center justify-center text-center"
                  style={{ 
                    transform: `translateY(0vh)`,
                  }}
                >
                  <div className="relative w-full flex items-center justify-center text-center pointer-events-none">
                    {CONFIG.blinds.sequenceWords.map((item, idx) => (
                      <div
                        key={idx}
                        ref={(el) => { wordRefs.current[idx] = el; }}
                        className="absolute left-1/2 top-2 text-center whitespace-nowrap text-white font-bold select-none pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] inline-flex items-center justify-center gap-2"
                        style={{
                          fontSize: `${1.125 * (CONFIG.blinds.sequenceFontScale || 1.3)}rem`,
                          opacity: 0,
                          filter: `blur(${CONFIG.blinds.sequenceBlurAmount}px)`,
                          transform: `translate(-50%, 0) translateX(-${CONFIG.blinds.sequenceSlideDistance}px)`,
                          willChange: 'transform, opacity, filter',
                        }}
                      >
                        {'icon' in item && item.icon && (
                          <img 
                            src={item.icon as string} 
                            alt="" 
                            className="object-contain inline-block select-none pointer-events-none"
                            style={{
                              width: `${CONFIG.blinds.sequenceIconSize ?? 22}px`,
                              height: `${CONFIG.blinds.sequenceIconSize ?? 22}px`,
                            }}
                          />
                        )}
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upward Scroll 4-Word Reverse Sequence Centered in Bright Center of Screen */}
                <div 
                  className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center text-center"
                >
                  <div className="relative w-full flex items-center justify-center text-center pointer-events-none">
                    {CONFIG.blinds.reverseSequenceWords?.map((item, idx) => (
                      <span
                        key={idx}
                        ref={(el) => { reverseWordRefs.current[idx] = el; }}
                        className="absolute left-1/2 top-1/2 text-center whitespace-nowrap text-white font-bold select-none pointer-events-none drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
                        style={{
                          fontSize: `${1.125 * (CONFIG.blinds.reverseSequenceFontScale || 3)}rem`,
                          opacity: 0,
                          filter: `blur(${CONFIG.blinds.sequenceBlurAmount}px)`,
                          transform: `translate(-50%, -50%) translateX(-${CONFIG.blinds.sequenceSlideDistance}px)`,
                          willChange: 'transform, opacity, filter',
                        }}
                      >
                        {item.text}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Scroll Hint fixed at bottom center */}
                {CONFIG.scrollHint?.enabled && (
                  <div
                    ref={scrollHintRef}
                    className="absolute bottom-6 left-0 right-0 mx-auto w-max z-15 flex flex-col items-center text-center select-none pointer-events-none animate-scroll-hint-fade-in"
                  >
                    <div className="animate-scroll-hint-bounce flex flex-col items-center gap-0.5 text-black font-bold text-xs md:text-sm tracking-wide drop-shadow-[0_1px_2px_rgba(255,255,255,0.7)]">
                      <span>{CONFIG.scrollHint.text}</span>
                      <ChevronsDown className="w-5 h-5 text-black stroke-[2.5]" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Website Sections (Centered content card with dynamic background visible on margins) */}
          <div className="relative z-30 w-full bg-transparent -mt-24 md:-mt-40 px-[2vw] md:px-6 lg:px-12 pb-16">
            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto overflow-hidden">
              <MainWebsiteContent 
                onNavigateToSection={handleNavigateToSection} 
                headerLogoRef={headerLogoRef}
                headerButtonsRef={headerButtonsRef}
                onSelectArticle={handleSelectArticle}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
}




