import React from 'react';

const VerticalSidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-24 lg:w-32 border-r border-stone-200/60 bg-stone-50/80 backdrop-blur-sm z-50 flex-col justify-start items-center py-12 select-none gap-12">
      {/* Top Marker Removed as requested */}
      
      {/* Rotated Name - Hung from top */}
      <div className="flex items-center justify-center group cursor-default pt-12">
        <h1 
          className="font-plantin font-normal text-5xl lg:text-6xl tracking-widest text-stone-900 whitespace-nowrap origin-center transform rotate-90"
        >
          Robin
        </h1>
      </div>

      {/* Spacer to push bottom elements down */}
      <div className="flex-1"></div>

      {/* Bottom Marker / Social Hint */}
      <div className="flex flex-col items-center gap-6">
        <span className="text-xs font-mono text-orange-600/80 uppercase tracking-widest rotate-90 mb-4">Est. 2024</span>
        <div className="w-[1px] h-16 bg-stone-900"></div>
      </div>
    </aside>
  );
};

export default VerticalSidebar;