import React from 'react';
import logoImg from '../files/logo.png';
import profileImg from '../files/tjien_profile2022_2048.png';
import part1Img from '../files/part1.png';
import part2Img from '../files/part2.png';
import part3Img from '../files/part3.png';
import part4Img from '../files/part4.png';
import { RAW_ARTICLES } from '../data/articles';

interface MainWebsiteContentProps {
  onNavigateToSection?: (sectionId: string) => void;
  headerLogoRef?: React.Ref<HTMLDivElement>;
  headerButtonsRef?: React.Ref<HTMLDivElement>;
  onSelectArticle?: (articleIdOrSlug: string) => void;
}

export const MainWebsiteContent: React.FC<MainWebsiteContentProps> = ({ 
  onNavigateToSection,
  headerLogoRef,
  headerButtonsRef,
  onSelectArticle,
}) => {
  const handleScrollTo = (sectionId: string) => {
    if (onNavigateToSection) {
      onNavigateToSection(sectionId);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePlanCall = () => {
    window.open('https://calendly.com/secretofgames/introduction', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-black text-white">
      {/* SECTION 1: HEADER SECTION */}
      <section className="w-full bg-black pt-6 md:pt-10 pb-10 md:pb-14 px-6 md:px-12 border-b border-gray-900">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* Logo & Title - Fades in first on scroll */}
          <div 
            ref={headerLogoRef}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-24 md:mb-36 will-change-transform"
            style={{ opacity: 0, transform: 'translateY(35px)' }}
          >
            <img 
              src={logoImg} 
              alt="Secret of Games Logo" 
              className="h-[120px] md:h-[160px] lg:h-[180px] object-contain select-none"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight">
                Secret of Games
              </h1>
              <p className="text-xl md:text-3xl lg:text-4xl font-bold text-[#faed24] mt-2 md:mt-3">
                Creativity thrives on boundaries
              </p>
            </div>
          </div>

          {/* 5 White Navigation Buttons - Slides in on scroll without transparency */}
          <div 
            ref={headerButtonsRef}
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 w-full will-change-transform"
            style={{ transform: 'translateY(35px)' }}
          >
            <button
              onClick={() => handleScrollTo('strategic-coaching')}
              className="bg-white text-black font-bold px-5 py-3 text-sm md:text-base cursor-pointer transition-colors duration-150 hover:bg-[#faed24] active:bg-[#faed24] select-none"
            >
              Strategic Coaching
            </button>
            <button
              onClick={() => handleScrollTo('mentorship')}
              className="bg-white text-black font-bold px-5 py-3 text-sm md:text-base cursor-pointer transition-colors duration-150 hover:bg-[#faed24] active:bg-[#faed24] select-none"
            >
              Mentorship
            </button>
            <button
              onClick={() => handleScrollTo('design-direction')}
              className="bg-white text-black font-bold px-5 py-3 text-sm md:text-base cursor-pointer transition-colors duration-150 hover:bg-[#faed24] active:bg-[#faed24] select-none"
            >
              Design &amp; Direction
            </button>
            <button
              onClick={() => handleScrollTo('resources')}
              className="bg-white text-black font-bold px-5 py-3 text-sm md:text-base cursor-pointer transition-colors duration-150 hover:bg-[#faed24] active:bg-[#faed24] select-none"
            >
              Resources
            </button>
            <button
              onClick={handlePlanCall}
              className="bg-white text-black font-bold px-5 py-3 text-sm md:text-base cursor-pointer transition-colors duration-150 hover:bg-[#faed24] active:bg-[#faed24] select-none"
            >
              Plan a free call
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: INTRO (WHITE BLOCK #FFFFFF) */}
      <section className="w-full bg-white text-black py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5 flex justify-center">
            <img 
              src={profileImg} 
              alt="Tjien" 
              className="w-full max-w-xs md:max-w-sm object-contain select-none"
            />
          </div>
          <div className="md:col-span-7 flex flex-col justify-center text-left">
            <h2 className="text-xl md:text-2xl font-bold text-black mb-6 leading-snug">
              Bound by budgets? Limited by time? Stuck by constraints? Feeling stuck?
            </h2>
            <p className="text-base md:text-lg text-gray-800 leading-relaxed font-normal">
              I help people, teams and projects turn their boundaries into clarity, direction, focus and creative solutions. I’m available for strategic coaching, mentorship, freelance design and direction work. Happy to look at the constraints your project is living with!
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: STRATEGIC COACHING (YELLOW BLOCK #FAED24) */}
      <section id="strategic-coaching" className="w-full bg-[#faed24] text-black py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-6">
              Strategic Coaching
            </h2>
            <h3 className="text-lg md:text-2xl font-bold text-black mb-6 leading-snug">
              Losing your grip on your team? Game designers looking left and programmers right? Production saying everything is alright, but you don’t see any progress? Not sure about your business “why”?
            </h3>
            <p className="text-base md:text-lg text-black leading-relaxed mb-4">
              Strategic game design, where the design of the game helps the business to thrive by being complimentary and aligned with the vision for the business. A team needs a strong leader, one that is convinced about the business goals and direction. I believe any leader has these qualities, but many struggle to formulate it and seemingly operate from gut alone. Your gut is right, but your team needs to have a full understanding what it is trying to tell.
            </p>
            <p className="text-base md:text-lg text-black font-bold leading-relaxed">
              Let me help you explore your inner conviction, determine a clear vision and communicate it effectively. Plan a free call and let’s explore together!
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <img 
              src={part4Img} 
              alt="Strategic Coaching Icon" 
              className="w-32 md:w-44 object-contain mb-6 select-none"
            />
            <button
              onClick={handlePlanCall}
              className="bg-[#faed24] text-black font-bold py-3 px-8 text-base md:text-lg border-4 border-white shadow-md hover:bg-white hover:text-black transition-all cursor-pointer inline-block text-center select-none"
            >
              Plan a free call
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: CAREER MENTORSHIP (WHITE BLOCK #FFFFFF) */}
      <section id="mentorship" className="w-full bg-white text-black py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center order-2 md:order-1">
            <img 
              src={part3Img} 
              alt="Career Mentorship Icon" 
              className="w-32 md:w-44 object-contain mb-6 select-none"
            />
            <button
              onClick={handlePlanCall}
              className="bg-[#faed24] text-black font-bold py-3 px-8 text-base md:text-lg border-4 border-white shadow-md hover:bg-black hover:text-white transition-all cursor-pointer inline-block text-center select-none"
            >
              Plan a free call
            </button>
          </div>
          <div className="md:col-span-7 text-left order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-6">
              Career mentorship
            </h2>
            <h3 className="text-lg md:text-2xl font-bold text-black mb-6 leading-snug">
              You’re stuck in your career and don’t know what your next move is going to be? You’ve got the skills but somehow receive rejection after rejection? A portfolio that’s not being perceived well and undervalued by potential employers?
            </h3>
            <p className="text-base md:text-lg text-gray-800 mb-4 leading-relaxed">
              As an active game director and industry mentor passionate about the game’s industry, I care deeply about your success. I can provide quick, no nonsense and actionable advice that improves your portfolio, clears up your mind about next steps and gets you hired.
            </p>
            <p className="text-base md:text-lg text-gray-800 mb-4 leading-relaxed">
              As an active{' '}
              <a
                href="https://asgc.gg/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold text-black hover:text-[#29ABE1] transition-colors"
              >
                ASGC
              </a>{' '}
              mentor I offer a 30-minute free consult to anyone in the games industry, no strings attached.
            </p>
            <p className="text-base md:text-lg text-black font-semibold leading-relaxed">
              Need more regular guidance? Reach out to work with me!
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5: DESIGN & DIRECTION (BLUE BLOCK #29ABE1) */}
      <section id="design-direction" className="w-full bg-[#29ABE1] text-black py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-7 text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-6">
              Design &amp; Direction
            </h2>
            <h3 className="text-lg md:text-2xl font-bold text-black mb-6 leading-snug">
              Did your game lose its initial vision? Are business realities forcing unwanted decisions? Is your game design team moving in circles, but not making any steps forward? Stuck in pre-production forever?
            </h3>
            <p className="text-base md:text-lg text-black leading-relaxed mb-4">
              Making great games is a hard and an especially messy process. Within this messy process hide clear boundaries, project goals, unspoken ambitions and business realities. As a game director with over 20 years experience and 25+ shipped titles I know this process and how to untangle it. Creativity thrives on clear boundaries, teams regain their enthusiasm and motivation and projects gain momentum and games ship on time and within budget.
            </p>
            <p className="text-base md:text-lg text-black font-bold leading-relaxed">
              Let me help you, explore how by booking a free call.
            </p>
          </div>
          <div className="md:col-span-5 flex flex-col items-center justify-center">
            <img 
              src={part2Img} 
              alt="Design & Direction Icon" 
              className="w-32 md:w-44 object-contain mb-6 select-none"
            />
            <button
              onClick={handlePlanCall}
              className="bg-[#faed24] text-black font-bold py-3 px-8 text-base md:text-lg border-4 border-white shadow-md hover:bg-white hover:text-black transition-all cursor-pointer inline-block text-center select-none"
            >
              Plan a free call
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: RESOURCES (WHITE BLOCK #FFFFFF) */}
      <section id="resources" className="w-full bg-white text-black py-16 md:py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="md:col-span-5 flex flex-col items-center justify-center order-2 md:order-1">
            <img 
              src={part1Img} 
              alt="Resources Icon" 
              className="w-32 md:w-44 object-contain mb-6 select-none"
            />
            <button
              onClick={handlePlanCall}
              className="bg-[#faed24] text-black font-bold py-3 px-8 text-base md:text-lg border-4 border-white shadow-md hover:bg-black hover:text-white transition-all cursor-pointer inline-block text-center select-none"
            >
              Plan a free call
            </button>
          </div>
          <div className="md:col-span-7 text-left order-1 md:order-2">
            <h2 className="text-3xl md:text-5xl font-extrabold text-black mb-6">
              Resources
            </h2>
            
            <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
              Articles
            </h3>
            <ul className="list-disc list-inside text-base md:text-lg text-gray-800 space-y-2 font-medium">
              {RAW_ARTICLES.map((art) => {
                const targetId = art.slug || art.id || art.HeaderTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                return (
                  <li
                    key={targetId}
                    onClick={() => onSelectArticle?.(targetId)}
                    className="text-black font-bold underline hover:text-[#29ABE1] cursor-pointer transition-colors"
                  >
                    {art.HeaderTitle}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 7: FOOTER (BLACK BLOCK #000000) */}
      <footer id="contact" className="w-full bg-black text-white pt-16 pb-12 px-6 md:px-12 border-t border-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-left">
          {/* Column 1 */}
          <div>
            <h3 className="text-[#faed24] font-bold text-xl md:text-2xl mb-4">
              Secret of games
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Pianostraat 45, 5642 RC<br />
              Eindhoven, The Netherlands<br />
              KVK: 89161750<br />
              VAT: NL004701137B76
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-[#faed24] font-bold text-xl md:text-2xl mb-4">
              Contact
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              <button 
                onClick={handlePlanCall} 
                className="hover:text-[#faed24] cursor-pointer font-semibold underline text-white transition-colors block mb-1 text-left"
              >
                Plan a free call
              </button>
              or reach out at<br />
              <a 
                href="mailto:tjien@secretofgames.com" 
                className="text-white hover:text-[#faed24] font-semibold underline transition-colors"
              >
                tjien@secretofgames.com
              </a>
            </p>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-[#faed24] font-bold text-xl md:text-2xl mb-4">
              More about me
            </h3>
            <ul className="text-gray-300 text-base md:text-lg space-y-2">
              <li>
                <a 
                  href="https://linkedin.com/in/gamedesign" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-[#faed24] underline transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a 
                  href="https://supercharge.games" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-[#faed24] underline transition-colors"
                >
                  Supercharge.games
                </a>
              </li>
              <li>
                <a 
                  href="https://tjien.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-[#faed24] underline transition-colors"
                >
                  Tjien.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-gray-900 text-center text-gray-500 text-sm md:text-base">
          Copyright {new Date().getFullYear()} Secret of Games
        </div>
      </footer>
    </div>
  );
};
