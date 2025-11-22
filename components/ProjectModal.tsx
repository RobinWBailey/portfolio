import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, ArrowRight, Tag, User, Building } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity duration-500 ease-in-out"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div className="relative w-full md:w-[70vw] lg:w-[50vw] h-full bg-stone-50 shadow-2xl overflow-y-auto animate-slide-in">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/80 hover:bg-stone-900 hover:text-white transition-colors duration-300 z-10 border border-stone-200"
        >
          <X size={24} />
        </button>

        <div className="p-8 md:p-12 lg:p-16">
          {/* Header Info */}
          <div className="mb-12 border-b border-stone-200 pb-8">
            <div className="flex items-center gap-3 text-xs font-sans tracking-widest uppercase text-stone-500 mb-4">
              <span>{project.year}</span>
              <span className="w-1 h-1 rounded-full bg-stone-400" />
              <span>{project.category}</span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-6xl font-bold text-stone-900 mb-6 leading-none">
              {project.title}
            </h2>
            
            <p className="font-sans text-lg md:text-xl text-stone-600 font-light leading-relaxed max-w-2xl">
              {project.summary}
            </p>
          </div>

          {/* Main Image */}
          <div className="mb-12">
            <img 
              src={project.images[0]} 
              alt={project.title} 
              className="w-full h-[50vh] md:h-[60vh] object-cover object-center grayscale hover:grayscale-0 transition-all duration-700 ease-in-out border border-stone-200"
            />
          </div>

          {/* Detailed Description */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            <div className="md:col-span-2">
              <h3 className="font-serif text-2xl font-medium mb-4">The Project</h3>
              <div className="prose prose-stone font-sans font-light text-stone-600 leading-loose">
                {project.description}
              </div>
              
              {project.link && project.link !== '#' && (
                <a 
                  href={project.link} 
                  className="inline-flex items-center gap-2 mt-8 font-sans text-sm uppercase tracking-widest border-b border-stone-900 pb-1 hover:text-stone-600 hover:border-stone-600 transition-colors"
                >
                  Visit Live Project <ArrowRight size={14} />
                </a>
              )}
            </div>

            {/* Meta / Tags */}
            <div className="md:col-span-1 space-y-8">
              
              {project.client && (
                <div>
                  <h4 className="font-serif text-lg mb-3 border-b border-stone-200 pb-2 flex items-center gap-2"><Building size={16} /> Client</h4>
                  <p className="font-sans text-sm text-stone-500">{project.client}</p>
                </div>
              )}

              {project.role && (
                <div>
                  <h4 className="font-serif text-lg mb-3 border-b border-stone-200 pb-2 flex items-center gap-2"><User size={16} /> Role</h4>
                  <p className="font-sans text-sm text-stone-500">{project.role}</p>
                </div>
              )}

              <div>
                <h4 className="font-serif text-lg mb-3 border-b border-stone-200 pb-2 flex items-center gap-2"><Tag size={16} /> Tech & Skills</h4>
                <ul className="space-y-2">
                  {project.tags.map(tag => (
                    <li key={tag} className="flex items-center gap-2 font-sans text-sm text-stone-500">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Secondary Images */}
          <div className="grid grid-cols-1 gap-8">
            {project.images.slice(1).map((img, index) => (
              <img 
                key={index}
                src={img} 
                alt={`${project.title} detail ${index + 1}`}
                className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700 border border-stone-200"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;