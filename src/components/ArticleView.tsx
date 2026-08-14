import React, { useEffect } from 'react';
import { ParsedArticle } from '../types/article';
import logoImg from '../files/logo.png';
import { ArrowLeft, X } from 'lucide-react';

interface ArticleViewProps {
  article: ParsedArticle;
  onClose: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onClose }) => {
  // Instantly reset scroll to the top when article opens
  useEffect(() => {
    window.scrollTo(0, 0);
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollTop = 0;
    }
  }, [article.id]);

  return (
    <div className="w-full bg-black text-white min-h-screen flex flex-col items-center animate-fade-in selection:bg-[#faed24] selection:text-black">
      {/* Floating Back / Close Pill Button (Mobile & Desktop convenience) */}
      <div className="fixed top-4 left-4 z-50">
        <button
          onClick={onClose}
          className="flex items-center gap-2 bg-black/85 hover:bg-black text-white px-4 py-2 border border-gray-700 hover:border-[#faed24] transition-all cursor-pointer text-sm font-bold shadow-lg backdrop-blur-md group"
          title="Back to Home"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </button>
      </div>

      {/* Centered Main Column */}
      <div className="w-full max-w-4xl lg:max-w-5xl bg-black overflow-hidden shadow-2xl">
        {/* ARTICLE HEADER (Black Box with Logo + Title + Subtitle) */}
        <header className="w-full bg-black text-white py-8 md:py-10 px-6 md:px-12 border-b border-gray-900">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center md:text-left">
            <img
              src={logoImg}
              alt="Secret of Games Logo"
              className="h-16 md:h-20 object-contain select-none"
            />
            <div>
              <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                Secret of Games
              </h1>
              <p className="text-base md:text-xl font-bold text-[#faed24] mt-1">
                Creativity thrives on boundaries
              </p>
            </div>
          </div>
        </header>

        {/* HEADER SECTION (Colored Background with HeaderTitle + HeaderImage + HeaderSubTitle) */}
        <section
          className="w-full text-black px-6 md:px-16 py-8 md:py-12 transition-colors duration-300"
          style={{ backgroundColor: article.headerBgColor }}
        >
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Header Title */}
            <h2 className="w-full text-2xl md:text-4xl font-extrabold text-black text-center mb-6 md:mb-8 leading-tight tracking-tight">
              {article.headerTitle}
            </h2>

            {/* Header Image - Expands to full width of text */}
            {article.headerImage && (
              <div className="w-full flex justify-center mb-6 md:mb-8">
                <img
                  src={article.headerImage}
                  alt={article.headerTitle}
                  className="w-full max-h-[600px] object-contain shadow-sm select-none"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            {/* Header Subtitle */}
            {article.headerSubTitle && (
              <div className="w-full text-left md:text-center">
                <p className="text-base md:text-lg font-bold text-black leading-snug">
                  {article.headerSubTitle}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ORDERED BODY SECTIONS (BodyText1, BodyImage1, BodyText2, BodyImage2, ...) */}
        {article.sections.map((section, idx) => {
          if (section.type === 'text' && (section.text || section.title || section.subtitle)) {
            const paragraphs = section.text ? section.text.split(/\n\s*\n/).filter(Boolean) : [];
            return (
              <section
                key={`text-${section.index}-${idx}`}
                className="w-full bg-white text-black py-6 md:py-8 px-6 md:px-16"
              >
                <div className="max-w-3xl mx-auto space-y-4 text-left">
                  {section.title && (
                    <h3 className="text-xl md:text-2xl font-bold text-black pt-2 pb-1 leading-snug tracking-tight">
                      {section.title}
                    </h3>
                  )}
                  {section.subtitle && (
                    <h4 className="text-base md:text-lg font-bold text-black pt-1 leading-snug">
                      {section.subtitle}
                    </h4>
                  )}
                  {paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-base md:text-lg text-gray-900 leading-relaxed font-normal"
                    >
                      {p.trim()}
                    </p>
                  ))}
                </div>
              </section>
            );
          }

          if ((section.type === 'image' || section.type === 'video') && section.mediaUrl) {
            return (
              <section
                key={`media-${section.index}-${idx}`}
                className="w-full py-10 md:py-14 px-6 md:px-16 flex flex-col items-center justify-center text-center transition-colors duration-300"
                style={{ backgroundColor: section.bgColor || '#29ABE1' }}
              >
                <div className="max-w-3xl w-full mx-auto flex flex-col items-center justify-center">
                  {section.type === 'video' ? (
                    <div className="w-full aspect-video shadow-xl overflow-hidden bg-black">
                      <iframe
                        src={section.mediaUrl}
                        title={section.caption || 'Video'}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <img
                      src={section.mediaUrl}
                      alt={section.caption || 'Article Visual'}
                      className="w-full h-auto object-contain shadow-md select-none"
                      referrerPolicy="no-referrer"
                    />
                  )}

                  {section.caption && (
                    <p className="mt-5 md:mt-6 text-white font-bold text-base md:text-lg drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] text-center tracking-wide">
                      {section.caption}
                    </p>
                  )}
                </div>
              </section>
            );
          }

          return null;
        })}

        {/* ARTICLE FOOTER (Black Box with Close Button & Copyright) */}
        <footer className="w-full bg-black text-white pt-12 pb-16 px-6 md:px-12 border-t border-gray-900 flex flex-col items-center justify-center text-center">
          <button
            onClick={onClose}
            className="bg-white text-black font-bold py-2.5 px-8 text-base md:text-lg border-2 border-white hover:bg-black hover:text-white transition-all cursor-pointer shadow-md mb-32 md:mb-48 select-none"
          >
            Close Article
          </button>

          <p className="text-gray-400 text-sm md:text-base font-normal select-none">
            Copyright {new Date().getFullYear()} Secret of Games
          </p>
        </footer>
      </div>
    </div>
  );
};
