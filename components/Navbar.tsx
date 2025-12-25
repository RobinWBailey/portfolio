import React, { useState, useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'education', label: 'Education' },
  { id: 'volunteering', label: 'Volunteering' },
  { id: 'speaking', label: 'Speaking' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        // Offset for the fixed header (approx 100px or more)
        const y = element.getBoundingClientRect().top + window.scrollY - 120;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none transition-all duration-300">
      <div className="w-[95%] max-w-7xl flex justify-between items-center px-4 md:px-8">
        
        {/* Left Pill: Logo & Name */}
        <div 
            className={`pointer-events-auto rounded-full border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 px-5 py-3 flex items-center gap-3 cursor-pointer group ${
              scrolled ? 'bg-white/80' : 'bg-white/60'
            }`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
           <img src="/rb_logo_default_coloured.png" alt="Robin Bailey" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
           <span className="font-display font-medium italic text-xl tracking-tight text-stone-900 hidden lg:block group-hover:text-stone-700 transition-colors">Robin Bailey</span>
        </div>

        {/* Right Pill: Navigation & Contact */}
        <div 
          className={`pointer-events-auto rounded-full border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.1)] backdrop-blur-md transition-all duration-300 px-2 py-2 pl-3 flex items-center gap-2 ${
            scrolled ? 'bg-white/80' : 'bg-white/60'
          }`}
        >
            <div className="hidden md:flex items-center gap-1 lg:gap-2 mr-2">
            
            {NAV_ITEMS.map((item) => (
                <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="font-lato text-[11px] lg:text-xs font-bold uppercase tracking-widest px-4 py-2.5 rounded-lg transition-colors duration-300 text-stone-500 hover:text-stone-900 hover:bg-black/5"
                >
                    {item.label}
                </button>
            ))}
            </div>

            {/* Contact CTA */}
            <button 
                onClick={() => scrollToSection('contact')} 
                className="bg-stone-900 hover:bg-stone-800 text-white px-5 py-2.5 rounded-full font-lato text-xs font-bold uppercase tracking-widest transition-all hover:shadow-lg flex items-center gap-2 group flex-shrink-0"
            >
                <span>Contact</span>
                <Mail size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
