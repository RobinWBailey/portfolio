import React, { useState, useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'experience', label: 'Experience' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'education', label: 'Education' },
  { id: 'advisory', label: 'Advisory' },
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
      {/* Liquid Glass Filter Definition - Smoother "Molten" Warp */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="glass-warp">
            <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur in="noise" stdDeviation="0.5" result="smoothedNoise" /> {/* Optional smoothing */}
          </filter>
        </defs>
      </svg>

      <div className="w-[95%] max-w-7xl flex justify-between items-center px-4 md:px-8">
        
        {/* Left Pill: Logo & Name */}
        <div 
            className={`pointer-events-auto rounded-full border border-white/20 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 px-5 py-3 flex items-center gap-3 cursor-pointer group shadow-[inset_0_0.5px_0_rgba(255,255,255,0.7),inset_0_-0.5px_0_rgba(0,0,0,0.05)] ring-1 ring-white/30 ${
              scrolled ? 'bg-white/60' : 'bg-white/20 supports-[backdrop-filter]:bg-stone-50/10'
            }`}
             style={{ 
                backdropFilter: 'blur(32px) saturate(180%) brightness(1.1) contrast(1.05)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%) brightness(1.1) contrast(1.05)',
                boxShadow: '0 8px 32px -4px rgba(0,0,0,0.1), inset 0 1px 1px 0 rgba(255,255,255,0.8), inset 0 -1px 1px 0 rgba(0,0,0,0.02)',
             }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
           {/* Glass Background - Left - Warped */}
           <div className="absolute inset-0 rounded-full z-0 overflow-hidden mix-blend-overlay opacity-30 pointer-events-none">
               {/* Using a separate div for the warp to avoid blurring content */}
               <div className="absolute inset-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl" style={{ filter: 'url(#glass-warp)' }}></div>
           </div>
           
           {/* CONTENT */}
           <div className="relative z-10 flex items-center gap-3">
               <img src="/rb_logo_default_coloured.png" alt="Robin Bailey" className="h-8 w-auto object-contain group-hover:scale-105 transition-transform" />
               <span className="font-display font-medium italic text-xl tracking-tight text-stone-900 hidden lg:block group-hover:text-stone-700 transition-colors">Robin Bailey</span>
           </div>
        </div>

        {/* Right Pill: Navigation & Contact */}
        <div 
          className={`pointer-events-auto rounded-full border border-white/20 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 px-2 py-2 pl-3 flex items-center gap-2 shadow-[inset_0_0.5px_0_rgba(255,255,255,0.7),inset_0_-0.5px_0_rgba(0,0,0,0.05)] ring-1 ring-white/30 ${
            scrolled ? 'bg-white/60' : 'bg-white/20 supports-[backdrop-filter]:bg-stone-50/10'
          }`}
          style={{ 
            backdropFilter: 'blur(32px) saturate(180%) brightness(1.1) contrast(1.05)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%) brightness(1.1) contrast(1.05)',
            boxShadow: '0 8px 32px -4px rgba(0,0,0,0.1), inset 0 1px 1px 0 rgba(255,255,255,0.8), inset 0 -1px 1px 0 rgba(0,0,0,0.02)',
         }}
        >
            {/* Glass Background - Right - Warped */}
           <div className="absolute inset-0 rounded-full z-0 overflow-hidden mix-blend-overlay opacity-30 pointer-events-none">
               <div className="absolute inset-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-white/10 to-transparent backdrop-blur-xl" style={{ filter: 'url(#glass-warp)' }}></div>
           </div>
            
            <div className="relative z-10 hidden md:flex items-center gap-1 lg:gap-2 mr-2">
            
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
