import React, { useState, useEffect, useRef } from 'react';
import { Project } from '../types';

interface DepartureBoardProps {
  projects: Project[];
}

const CHAR_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-.:& ";

const SplitFlapChar: React.FC<{ char: string; delay?: number }> = ({ char, delay = 0 }) => {
  const [displayChar, setDisplayChar] = useState(char);
  const [prevChar, setPrevChar] = useState(char);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (char !== displayChar) {
      const timeout = setTimeout(() => {
        setPrevChar(displayChar);
        setDisplayChar(char);
        setIsFlipping(true);
        setTimeout(() => setIsFlipping(false), 600); 
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [char, delay, displayChar]);

  return (
    <div className="relative w-4 h-6 md:w-5 md:h-8 bg-[#222] rounded-[2px] overflow-hidden shadow-sm inline-block mx-[1px] perspective-md">
      {/* Top Half (Static) */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#2a2a2a] overflow-hidden border-b border-black/50 z-0">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 text-white/90 font-mono text-sm md:text-lg font-bold leading-[200%] md:leading-[160%]">
          {char}
        </span>
         {/* Gloss */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
      </div>

      {/* Bottom Half (Static) */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#222] overflow-hidden z-0">
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-white/90 font-mono text-sm md:text-lg font-bold leading-none md:leading-[0%]">
           {/* Adjust leading/positioning to show bottom half of char */}
           <span className="block -mt-[12px] md:-mt-[16px]">{char}</span>
        </span>
      </div>

      {/* Flipper (Animation) */}
      {isFlipping && (
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-[#2a2a2a] origin-bottom animate-flip-down z-10 overflow-hidden backface-hidden border-b border-black/30">
           <span className="absolute top-0 left-1/2 -translate-x-1/2 text-white/90 font-mono text-sm md:text-lg font-bold leading-[200%] md:leading-[160%]">
            {prevChar}
          </span>
           <div className="absolute inset-0 bg-black/20"></div> {/* Shadow during flip */}
        </div>
      )}
       <style>{`
        .perspective-md { perspective: 400px; }
        .backface-hidden { backface-visibility: hidden; }
        @keyframes flip-down {
            0% { transform: rotateX(0deg); }
            100% { transform: rotateX(-180deg); }
        }
        .animate-flip-down {
            animation: flip-down 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

// Helper component for a whole word/field
const FlapField: React.FC<{ text: string; length: number; label?: string }> = ({ text, length, label }) => {
  // Pad or truncate text to fixed length
  const paddedText = text.padEnd(length, ' ').slice(0, length).toUpperCase();
  
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-[9px] md:text-[10px] font-lato font-bold tracking-widest text-amber-500/80 uppercase mb-0.5 ml-1">{label}</span>}
      <div className="flex bg-black/20 p-1 rounded border border-white/5 shadow-inner">
        {paddedText.split('').map((char, i) => (
          <SplitFlapChar key={i} char={char} delay={i * 30} /> // Stagger effect
        ))}
      </div>
    </div>
  );
};

const DepartureBoard: React.FC<DepartureBoardProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  // Filter projects
  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  // Reset index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Cycle projects
  useEffect(() => {
    if (filteredProjects.length <= 1) return; // Don't cycle if only 1 item

    const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 6000); 
    return () => clearInterval(interval);
  }, [filteredProjects.length, selectedCategory]); // Reset interval when list changes

  const currentProject = filteredProjects[currentIndex];

  if (!projects.length || !currentProject) return null;

  return (
    <div className="w-full flex justify-center pointer-events-none fade-in-up">
       {/* Board Container */}
       <div className="pointer-events-auto bg-[#1a1a1a] border-t-2 border-b-2 border-stone-800 shadow-2xl overflow-hidden relative group rounded-lg md:rounded-xl w-full flex flex-col">
          
          {/* Metal Texture & Gloss */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 z-0"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-black/40 z-0 pointer-events-none"></div>
          
          {/* Header / Categories Row */}
          <div className="relative z-10 flex items-center gap-4 px-4 pt-2 pb-1 border-b border-white/5 bg-black/20 backdrop-blur-sm overflow-x-auto hide-scrollbar">
             <span className="text-[9px] md:text-[10px] font-lato font-bold tracking-widest text-stone-500 uppercase flex-shrink-0 mr-2">HIGHLIGHTS:</span>
             
             <div className="flex items-center gap-3">
                {categories.map((cat) => (
                    <button 
                        key={cat} 
                        onClick={() => setSelectedCategory(cat)}
                        className={`text-[10px] md:text-[11px] font-mono font-medium uppercase tracking-tight transition-all duration-300 relative ${
                             selectedCategory === cat 
                             ? 'text-amber-500 text-shadow-amber' 
                             : 'text-stone-400 hover:text-stone-200'
                        }`}
                    >
                        {cat}
                        {selectedCategory === cat && (
                            <span className="absolute -bottom-1 left-0 right-0 h-[1px] bg-amber-500 shadow-[0_0_4px_rgba(245,158,11,0.8)]"></span>
                        )}
                    </button>
                ))}
             </div>
          </div>

          {/* Split Flap Row */}
          <div className="relative z-10 flex flex-nowrap items-center gap-2 md:gap-4 p-2 md:p-3 overflow-x-auto hide-scrollbar">
            
            {/* Status Indicator */}
             <div className="flex flex-col items-center justify-center gap-1 min-w-[12px] md:min-w-[20px]">
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${currentIndex % 2 === 0 ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-amber-900'} transition-all duration-300`}></div>
             </div>

            {/* Project Title */}
            <FlapField text={currentProject.title} length={18} label="PROJECT" />

            {/* Role */}
             <div className="hidden sm:block">
               <FlapField text={currentProject.role.replace('Product', 'Prod.').slice(0, 20)} length={20} label="ROLE" />
             </div>
             
             {/* Link Arrow */}
             <a href={`#project-${currentProject.id}`} className="ml-2 w-8 h-8 rounded border border-white/10 flex items-center justify-center text-amber-500 hover:text-amber-300 hover:bg-white/5 transition-colors cursor-pointer group-hover:animate-pulse">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                </svg>
             </a>

          </div>
          
          {/* Bottom Screw Details */}
          <div className="absolute bottom-1 left-2 w-1.5 h-1.5 rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] drop-shadow-[0_1px_0_rgba(255,255,255,0.1)]"></div>
          <div className="absolute bottom-1 right-2 w-1.5 h-1.5 rounded-full bg-[#111] shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] drop-shadow-[0_1px_0_rgba(255,255,255,0.1)]"></div>

       </div>
    </div>
  );
};

export default DepartureBoard;
