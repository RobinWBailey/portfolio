import React from 'react';

const VerticalSidebar: React.FC = () => {
  return (
    <aside className="hidden md:flex fixed top-0 left-0 h-screen w-24 lg:w-32 border-r border-stone-200/60 bg-stone-50/80 backdrop-blur-sm z-50 flex-col justify-start items-center py-12 select-none gap-12">
      {/* Top Marker Removed as requested */}
      
      {/* Rotated Name - Hung from top */}
      <div className="flex items-center justify-center group cursor-default pt-28">
        <h1 
          className="font-plantin font-normal text-5xl lg:text-6xl tracking-tight text-stone-900 whitespace-nowrap origin-center transform rotate-90"
        >
          Robin
        </h1>
      </div>

      {/* Spacer to push bottom elements down */}
      <div className="flex-1"></div>

      {/* Bottom Marker / Social Hint */}
      <div className="flex flex-col items-center gap-6">
        <img src="/rectangle_logo.png" alt="Logo" className="w-16 h-auto object-contain" />
      </div>
    </aside>
  );
};

export default VerticalSidebar;