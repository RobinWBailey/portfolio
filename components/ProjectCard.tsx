import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

// Map categories to specific accent colors for the hover effect
const getAccentColor = (category: string) => {
  const normalized = category.toLowerCase();
  if (normalized.includes('education')) return 'group-hover:border-emerald-500 group-hover:text-emerald-600';
  if (normalized.includes('adtech') || normalized.includes('data')) return 'group-hover:border-blue-500 group-hover:text-blue-600';
  if (normalized.includes('mobile') || normalized.includes('ios')) return 'group-hover:border-rose-500 group-hover:text-rose-600';
  if (normalized.includes('concept') || normalized.includes('branding')) return 'group-hover:border-purple-500 group-hover:text-purple-600';
  return 'group-hover:border-orange-500 group-hover:text-orange-600'; // Default
};

const getIconBg = (category: string) => {
  const normalized = category.toLowerCase();
  if (normalized.includes('education')) return 'group-hover:bg-emerald-600 group-hover:border-emerald-600';
  if (normalized.includes('adtech') || normalized.includes('data')) return 'group-hover:bg-blue-600 group-hover:border-blue-600';
  if (normalized.includes('mobile') || normalized.includes('ios')) return 'group-hover:bg-rose-600 group-hover:border-rose-600';
  if (normalized.includes('concept') || normalized.includes('branding')) return 'group-hover:bg-purple-600 group-hover:border-purple-600';
  return 'group-hover:bg-orange-600 group-hover:border-orange-600'; // Default
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const accentClass = getAccentColor(project.category);
  const iconBgClass = getIconBg(project.category);

  return (
    <div 
      className={`group relative flex flex-col gap-4 cursor-pointer p-6 md:p-8 hover:bg-white transition-all duration-500 ease-out border-t border-stone-200 border-l-0 border-r-0 hover:border-l-4 ${accentClass} hover:shadow-lg hover:shadow-stone-100/50 hover:-translate-y-1`}
      onClick={() => onClick(project)}
    >
      {/* Top Row: ID & Category */}
      <div className="flex justify-between items-start text-xs font-lato uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors">
        <span className={`transition-colors duration-300 ${accentClass.split(' ')[1]}`}>{project.category}</span>
        <span>/{project.year}</span>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-end mt-2">
        
        {/* Title - Big Serif */}
        <div className="md:col-span-5">
          <h3 className="font-serif text-3xl md:text-4xl text-stone-900 font-medium leading-tight group-hover:translate-x-2 transition-transform duration-500">
            {project.title}
          </h3>
        </div>

        {/* Summary - Clean Sans */}
        <div className="md:col-span-5">
          <p className="font-sans text-sm md:text-base font-light text-stone-500 line-clamp-2 group-hover:text-stone-700 transition-colors">
            {project.summary}
          </p>
        </div>

        {/* Action Icon */}
        <div className="md:col-span-2 flex justify-end">
          <div className={`w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 group-hover:text-white transition-all duration-300 ${iconBgClass}`}>
            <ArrowUpRight size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;