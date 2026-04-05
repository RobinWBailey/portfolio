import React, { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'experience', label: 'Experience' },
  { id: 'advisory', label: 'Advisory' },
  { id: 'speaking', label: 'Speaking' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div 
        className={`w-full flex justify-between items-center px-4 md:px-8 lg:px-12 py-3 transition-all duration-500 pointer-events-auto ${
          scrolled 
            ? 'bg-white/80 border-b border-stone-200/60 shadow-sm' 
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
          <span className="font-heading font-extrabold text-[14px] text-stone-900 tracking-normal hidden md:block">Robin Bailey</span>
        </div>

        {/* Right — Minimal Nav */}
        <div className="flex items-center gap-1">
          <div className="hidden md:flex items-center gap-0.5 mr-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="font-sans text-[11px] font-semibold uppercase tracking-[0.12em] px-3 py-2 rounded-xl transition-all duration-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100/80"
              >
                {item.label}
              </button>
            ))}
          </div>
          <button 
            onClick={() => scrollToSection('contact')} 
            className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl font-sans text-[11px] font-semibold uppercase tracking-[0.12em] transition-all hover:shadow-md flex items-center gap-1.5 group flex-shrink-0"
          >
            <span>Contact</span>
            <ArrowUpRight size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
