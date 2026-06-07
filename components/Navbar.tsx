import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div
        className={`w-full max-w-5xl mx-auto flex justify-between items-center px-6 md:px-10 py-4 transition-all duration-500 pointer-events-auto ${scrolled
            ? 'bg-white/85 border-b border-stone-100'
            : 'bg-transparent'
          }`}
        style={{
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        }}
      >
        {/* Left — Logo */}
        <div
          className="flex items-center gap-2.5 cursor-pointer group"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img src="/rb_logo_default_coloured.png" alt="Robin Bailey" className="h-6 w-auto object-contain group-hover:scale-105 transition-transform" />
          <span className="font-heading font-extrabold text-[21px] tracking-[-0.03em] text-stone-900">Robin Bailey</span>
        </div>

        {/* Right — Social text links + CTA */}
        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-7">
            <a
              href="https://www.linkedin.com/in/robinwbailey/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[17px] font-extrabold text-stone-500 hover:text-stone-900 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://twitter.com/RobinBailey"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[17px] font-extrabold text-stone-500 hover:text-stone-900 transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://github.com/robinwbailey"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[17px] font-extrabold text-stone-500 hover:text-stone-900 transition-colors"
            >
              GitHub
            </a>
          </div>
          <div className="w-px h-4 bg-stone-200 hidden md:block flex-shrink-0" />
          <a
            href="mailto:robin.w.bailey@gmail.com"
            className="font-sans text-[16px] font-extrabold bg-stone-900 text-white px-7 py-3 rounded-full hover:bg-stone-700 transition-colors uppercase tracking-[0.07em] whitespace-nowrap"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
