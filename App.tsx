import React, { useState } from 'react';
import VerticalSidebar from './components/VerticalSidebar';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import { PROJECTS } from './constants';
import { Project } from './types';
import { Menu, ArrowDown, Linkedin, Github, Twitter, Mail, Calendar, Globe, Mic, ExternalLink, Briefcase, GraduationCap, Lightbulb } from 'lucide-react';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const featuredProjects = PROJECTS.filter(p => p.isSelected);
  const archiveProjects = PROJECTS.filter(p => !p.isSelected);

  return (
    <div className="min-h-screen bg-[#fcfcfc] relative overflow-hidden">
      
      {/* 1. Paper Texture Overlay (Noise) */}
      <div 
        className="fixed inset-0 opacity-[0.04] pointer-events-none z-40 mix-blend-multiply"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          transform: 'translateZ(0)'
        }} 
      />

      {/* 2. Atmosphere / Color Orbs */}
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply opacity-60 animate-pulse duration-[10000ms]" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply opacity-60" />

      {/* Fixed Sidebar (Desktop) */}
      <VerticalSidebar />

      {/* Mobile Header (Visible only on small screens) */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-[#fcfcfc]/90 backdrop-blur-md z-50 border-b border-stone-200 p-4 flex justify-between items-center">
        <h1 className="font-display font-medium italic text-3xl tracking-tight text-stone-900">Robin</h1>
        <button className="p-2 text-stone-900">
          <Menu size={24} />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 md:pl-24 lg:pl-32 pt-20 md:pt-0 transition-all duration-300">
        
        <div className="max-w-screen-2xl mx-auto px-6 md:px-16 lg:px-24 py-12 md:py-24">
          
          {/* Hero Section */}
          <section className="mb-24 md:mb-32 animate-fade-in-up">
            <div className="flex flex-col xl:flex-row xl:items-end gap-12 xl:gap-24 border-b border-stone-900/10 pb-12 relative">
              {/* Decorative Line Accent */}
              <div className="absolute bottom-[-1px] left-0 w-32 h-[2px] bg-orange-600 z-10"></div>
              
              <div className="flex flex-col gap-3 relative z-10">
                {/* Hidden H1 for SEO/Accessiblity since visual title is in sidebar */}
                <h1 className="sr-only">Robin Bailey</h1>
                
                <div className="flex flex-col">
                  <span className="font-sans font-bold text-5xl md:text-7xl tracking-tighter text-stone-900 leading-[0.9] -ml-[2px]">
                    Product Manager
                  </span>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-5xl md:text-7xl text-stone-600 leading-none mt-2">
                    <span className="font-serif italic text-stone-800 font-medium tracking-tight">
                      Designer
                    </span>
                    <span className="font-serif italic text-stone-300 font-light text-4xl md:text-6xl">&</span>
                    <span className="font-mono text-4xl md:text-6xl text-orange-600 font-medium tracking-tighter transform translate-y-[-2px]">
                      Engineer
                    </span>
                  </div>
                </div>
              </div>

              <div className="max-w-xl pb-2 xl:mb-2">
                <p className="font-sans font-light text-stone-600 leading-relaxed text-lg md:text-xl">
                  I help turn complex business challenges into clear, user-focused product solutions — working with you to design, architect, and implement technical systems that deliver real impact.
                </p>
              </div>
            </div>
          </section>

          {/* Experience & Education Columns */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-7 space-y-16">
              
              {/* Experience */}
              <div>
                <h3 className="font-display italic text-4xl mb-8 text-stone-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center not-italic">
                     <Briefcase size={20} />
                  </div>
                  Experience
                </h3>
                <div className="space-y-12 border-l border-stone-200 ml-2 pl-8 relative">
                  
                  <div className="relative group">
                    <div className="absolute -left-[39px] top-2 w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#fcfcfc] shadow-sm transition-transform group-hover:scale-125"></div>
                    <h4 className="font-serif text-2xl text-stone-900 group-hover:text-emerald-700 transition-colors">Digital Education Product Manager</h4>
                    <p className="font-sans text-sm font-bold uppercase tracking-widest text-stone-400 mb-2">Academic Development, Plymouth University / 2019 — Present</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed">
                      Building a first class student success platform for the Faculty of Medicine and Dentistry. Member of multiple faculty committees.
                    </p>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[39px] top-2 w-5 h-5 rounded-full bg-blue-500 border-4 border-[#fcfcfc] shadow-sm transition-transform group-hover:scale-125"></div>
                    <h4 className="font-serif text-2xl text-stone-900 group-hover:text-blue-700 transition-colors">Product Architect; Senior UX Designer</h4>
                    <p className="font-sans text-sm font-bold uppercase tracking-widest text-stone-400 mb-2">iotec Global / 2016 — 2018</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed">
                      Leading UX and product design, building campaign management and reporting tools for a cutting edge AdTech platform.
                    </p>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[39px] top-2 w-5 h-5 rounded-full bg-orange-500 border-4 border-[#fcfcfc] shadow-sm transition-transform group-hover:scale-125"></div>
                    <h4 className="font-serif text-2xl text-stone-900 group-hover:text-orange-700 transition-colors">Freelance Product Design</h4>
                    <p className="font-sans text-sm font-bold uppercase tracking-widest text-stone-400 mb-2">Multiple Clients / 2010 — Present</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed">
                      Working with diverse clients like Wild Planet Trust building educational iOS applications and digital solutions.
                    </p>
                  </div>

                </div>
              </div>

              {/* Education */}
              <div>
                <h3 className="font-display italic text-4xl mb-8 text-stone-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center not-italic">
                     <GraduationCap size={20} />
                  </div>
                  Education
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {/* Masters */}
                   <div className="p-6 border border-stone-200 bg-white hover:border-purple-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 rounded-sm group flex flex-col">
                      <div className="w-6 h-1 bg-purple-500 mb-3 group-hover:w-10 transition-all"></div>
                      <h4 className="font-serif text-2xl text-stone-900 leading-none mb-1">Master of Science</h4>
                      <p className="text-stone-500 font-sans text-sm mb-3">Business & Management</p>
                      
                      <div className="mb-3 flex-grow">
                        <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Awards</p>
                        <ul className="space-y-1">
                          <li className="flex items-start gap-2 font-sans text-xs text-stone-600">
                            <span className="text-purple-500">★</span>
                            <span>Dean's List Award for Academic Excellence</span>
                          </li>
                        </ul>
                      </div>

                      <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-purple-600 transition-colors mt-auto pt-3 border-t border-stone-100">Plymouth University / Distinction</p>
                   </div>

                   {/* Bachelors */}
                   <div className="p-6 border border-stone-200 bg-white hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 rounded-sm group flex flex-col">
                      <div className="w-6 h-1 bg-blue-500 mb-3 group-hover:w-10 transition-all"></div>
                      <h4 className="font-serif text-2xl text-stone-900 leading-none mb-1">Bachelor of Science</h4>
                      <p className="text-stone-500 font-sans text-sm mb-3">Computer Science</p>
                      
                       <div className="mb-3 flex-grow">
                        <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Awards</p>
                        <ul className="space-y-1">
                          <li className="flex items-start gap-2 font-sans text-xs text-stone-600">
                            <span className="text-blue-500">★</span>
                            <span>Dean's List Award (2010, 2011, 2012)</span>
                          </li>
                        </ul>
                      </div>

                      <p className="font-sans text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-blue-600 transition-colors mt-auto pt-3 border-t border-stone-100">Plymouth University / First-Class Honours</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-16">
               {/* Expertise */}
              <div className="bg-gradient-to-br from-stone-900 to-slate-800 text-stone-50 p-8 md:p-12 relative overflow-hidden rounded-sm shadow-2xl">
                {/* Abstract Shapes in Card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-500/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2"></div>
                
                <div className="relative z-10">
                  <h3 className="font-display text-3xl mb-8 italic text-orange-50 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500/20 text-orange-200 flex items-center justify-center not-italic">
                       <Lightbulb size={20} />
                    </div>
                    Expertise
                  </h3>
                  <div className="space-y-10">
                    <div>
                      <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Product & UX', 'Salesforce', 'Mobile Apps', 'AI & ML', 'Wireframing', 'Prototyping'].map(skill => (
                          <span key={skill} className="px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-orange-500/50 rounded-md text-sm font-sans font-light text-stone-300 transition-colors cursor-default">{skill}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-sans text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Sectors
                      </h4>
                      <ul className="font-serif text-xl space-y-3 text-stone-300">
                        <li className="flex items-center gap-3 group cursor-default">
                           <span className="h-[1px] w-4 bg-stone-600 group-hover:bg-orange-400 group-hover:w-6 transition-all"></span>
                           <span className="group-hover:text-white transition-colors">Education & EdTech</span>
                        </li>
                        <li className="flex items-center gap-3 group cursor-default">
                           <span className="h-[1px] w-4 bg-stone-600 group-hover:bg-orange-400 group-hover:w-6 transition-all"></span>
                           <span className="group-hover:text-white transition-colors">Health & Medical</span>
                        </li>
                        <li className="flex items-center gap-3 group cursor-default">
                           <span className="h-[1px] w-4 bg-stone-600 group-hover:bg-orange-400 group-hover:w-6 transition-all"></span>
                           <span className="group-hover:text-white transition-colors">Government</span>
                        </li>
                        <li className="flex items-center gap-3 group cursor-default">
                           <span className="h-[1px] w-4 bg-stone-600 group-hover:bg-orange-400 group-hover:w-6 transition-all"></span>
                           <span className="group-hover:text-white transition-colors">AdTech</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Selected Work Grid */}
          <section id="work" className="mb-32">
            <div className="flex items-end justify-between mb-8 md:mb-12">
               <h3 className="font-display text-3xl md:text-4xl italic text-stone-400">Selected Works</h3>
               <span className="font-sans text-xs font-bold uppercase tracking-widest text-orange-600/80 hidden md:block bg-orange-50 px-3 py-1 rounded-full">Recent & Featured</span>
            </div>
            
            <div className="flex flex-col">
              {featuredProjects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={handleProjectClick} 
                />
              ))}
            </div>
             <div className="w-full h-[1px] bg-stone-200"></div>
          </section>

          {/* Volunteering & Speaking Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-32 border-t border-stone-200 pt-16 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-stone-200 rounded-full hidden md:block"></div>
             
             {/* Volunteering */}
             <div>
               <h3 className="font-display italic text-3xl mb-8 text-stone-900 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center not-italic">
                    <Globe size={16} />
                 </div>
                 Volunteering
               </h3>
               <div className="space-y-10">
                  <div className="group border-b border-stone-100 pb-8 cursor-default">
                    <h4 className="font-serif text-xl text-stone-900 group-hover:text-emerald-700 transition-colors">Assessment Alliance Security Group</h4>
                    <p className="font-sans text-stone-500 text-sm mt-1">Medical Schools Council</p>
                    <p className="font-sans text-xs uppercase tracking-widest text-stone-400 mt-2 mb-3 group-hover:text-emerald-500">2025 — Present</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed text-sm">
                      Advising the Medical Schools Council on best practices for digital assessment security and integrity across UK medical schools.
                    </p>
                  </div>
                  <div className="group border-b border-stone-100 pb-8 cursor-default">
                    <h4 className="font-serif text-xl text-stone-900 group-hover:text-emerald-700 transition-colors">Education</h4>
                    <p className="font-sans text-stone-500 text-sm mt-1">Wild Planet Trust</p>
                    <p className="font-sans text-xs uppercase tracking-widest text-stone-400 mt-2 mb-3 group-hover:text-emerald-500">2004 — 2023</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed text-sm">
                      Supporting the education department in delivering conservation education to public audiences and school groups.
                    </p>
                  </div>
                  <div className="group cursor-default">
                    <h4 className="font-serif text-xl text-stone-900 group-hover:text-emerald-700 transition-colors">Mayor's Youth Council Representative</h4>
                    <p className="font-sans text-stone-500 text-sm mt-1">Town Council</p>
                    <p className="font-sans text-xs uppercase tracking-widest text-stone-400 mt-2 mb-3 group-hover:text-emerald-500">2006 — 2009</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed text-sm">
                      Representing the views of young people in local government decision making processes and community initiatives.
                    </p>
                  </div>
               </div>
             </div>

             {/* Speaking */}
             <div>
               <h3 className="font-display italic text-3xl mb-8 text-stone-900 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center not-italic">
                    <Mic size={16} />
                 </div>
                 Speaking
               </h3>
               <div className="space-y-8">
                  <div className="group border-b border-stone-100 pb-6 flex gap-4 cursor-default">
                    <div className="flex-shrink-0 w-12 text-center pt-1">
                       <span className="block font-sans font-bold text-lg text-stone-300 group-hover:text-rose-500 transition-colors">2024</span>
                    </div>
                    <div>
                       <h4 className="font-serif text-xl text-stone-900 leading-tight group-hover:text-rose-700 transition-colors">EBMA Annual European Conference</h4>
                       <p className="font-sans text-stone-500 text-sm mt-1 italic">Symposium: Adaptive Testing</p>
                       <p className="font-sans text-stone-600 font-light leading-relaxed text-sm mt-2">
                         Presentation on the implementation and benefits of content-adaptive progress testing in medical education.
                       </p>
                    </div>
                  </div>
                  <div className="group border-b border-stone-100 pb-6 flex gap-4 cursor-default">
                    <div className="flex-shrink-0 w-12 text-center pt-1">
                       <span className="block font-sans font-bold text-lg text-stone-300 group-hover:text-rose-500 transition-colors">2024</span>
                    </div>
                    <div>
                       <h4 className="font-serif text-xl text-stone-900 leading-tight group-hover:text-rose-700 transition-colors">Salesforce UK/EMEA Education User Group</h4>
                       <p className="font-sans text-stone-500 text-sm mt-1 italic">Student Success Platform for Medicine</p>
                       <p className="font-sans text-stone-600 font-light leading-relaxed text-sm mt-2">
                         Showcasing how we utilised Salesforce to build a bespoke Student Success Platform for the Faculty of Medicine.
                       </p>
                    </div>
                  </div>
                  <div className="group border-b border-stone-100 pb-6 flex gap-4 cursor-default">
                    <div className="flex-shrink-0 w-12 text-center pt-1">
                       <span className="block font-sans font-bold text-lg text-stone-300 group-hover:text-rose-500 transition-colors">2022</span>
                    </div>
                    <div>
                       <h4 className="font-serif text-xl text-stone-900 leading-tight group-hover:text-rose-700 transition-colors">Peninsula Medical School Conference</h4>
                       <p className="font-sans text-stone-500 text-sm mt-1 italic">Visualising Adaptive Progress Testing</p>
                       <p className="font-sans text-stone-600 font-light leading-relaxed text-sm mt-2">
                         Discussing data visualisation techniques for complex longitudinal assessment data.
                       </p>
                    </div>
                  </div>
                  <div className="group flex gap-4 cursor-default">
                    <div className="flex-shrink-0 w-12 text-center pt-1">
                       <span className="block font-sans font-bold text-lg text-stone-300 group-hover:text-rose-500 transition-colors">2012</span>
                    </div>
                    <div>
                       <h4 className="font-serif text-xl text-stone-900 leading-tight group-hover:text-rose-700 transition-colors">Learning Without Frontiers</h4>
                       <p className="font-sans text-stone-500 text-sm mt-1 italic">London</p>
                       <p className="font-sans text-stone-600 font-light leading-relaxed text-sm mt-2">
                         Discussing the future of mobile learning and digital engagement in education.
                       </p>
                    </div>
                  </div>
               </div>
             </div>

          </section>
          
          {/* Project Archive (Non-Selected Works) */}
          <section className="mb-32">
             <div className="flex items-baseline gap-4 mb-12">
                <h3 className="font-display text-3xl md:text-4xl italic text-stone-400">Project Archive</h3>
                <div className="h-[1px] flex-1 bg-stone-200"></div>
             </div>
             
             <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead>
                   <tr className="border-b-2 border-stone-900">
                     <th className="py-4 pr-4 font-sans text-xs uppercase tracking-widest font-bold text-stone-900 w-24">Year</th>
                     <th className="py-4 pr-4 font-sans text-xs uppercase tracking-widest font-bold text-stone-900">Project</th>
                     <th className="py-4 pr-4 font-sans text-xs uppercase tracking-widest font-bold text-stone-900 hidden md:table-cell">Category</th>
                     <th className="py-4 font-sans text-xs uppercase tracking-widest font-bold text-stone-900 hidden lg:table-cell">Client</th>
                     <th className="py-4 w-10"></th>
                   </tr>
                 </thead>
                 <tbody>
                   {archiveProjects.map((project) => (
                     <tr 
                       key={project.id} 
                       className="border-b border-stone-200 group hover:bg-white cursor-pointer transition-colors"
                       onClick={() => handleProjectClick(project)}
                     >
                       <td className="py-4 pr-4 font-serif text-stone-400 group-hover:text-orange-600 transition-colors">{project.year}</td>
                       <td className="py-4 pr-4">
                         <span className="font-serif text-lg text-stone-900 font-medium block group-hover:translate-x-2 transition-transform duration-300">{project.title}</span>
                         <span className="font-sans text-xs text-stone-500 md:hidden mt-1 block">{project.category}</span>
                       </td>
                       <td className="py-4 pr-4 font-sans text-sm text-stone-500 hidden md:table-cell">
                          <span className="px-2 py-1 rounded-md bg-stone-100 group-hover:bg-orange-50 group-hover:text-orange-800 transition-colors">
                            {project.category}
                          </span>
                       </td>
                       <td className="py-4 font-sans text-sm text-stone-600 hidden lg:table-cell opacity-70 group-hover:opacity-100">{project.client || '-'}</td>
                       <td className="py-4 text-stone-300 group-hover:text-orange-500">
                         <ExternalLink size={16} />
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
          </section>

          {/* Final CTA / Contact */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-16 pb-24">
             <div className="md:col-span-8 md:col-start-3 text-center relative">
               {/* Background shape behind CTA */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-gradient-to-b from-transparent via-white/50 to-transparent -z-10 blur-xl"></div>
               
               <h2 className="font-display italic text-4xl md:text-5xl text-stone-900 mb-8">Let's build something meaningful.</h2>
               <a href="mailto:robin.w.bailey@gmail.com" className="inline-block bg-stone-900 text-white font-sans font-bold tracking-wide px-10 py-5 hover:bg-orange-600 transition-colors shadow-xl hover:shadow-orange-500/20 transform hover:-translate-y-1 duration-300 rounded-sm">
                   Get in Touch
               </a>
               <div className="flex justify-center gap-8 mt-12">
                    <a href="https://twitter.com/RobinBailey" className="text-stone-400 hover:text-blue-400 hover:scale-110 transition-all"><Twitter size={24} /></a>
                    <a href="https://www.linkedin.com/in/robinwbailey/" className="text-stone-400 hover:text-blue-700 hover:scale-110 transition-all"><Linkedin size={24} /></a>
                    <a href="https://github.com/yourprofile" className="text-stone-400 hover:text-stone-900 hover:scale-110 transition-all"><Github size={24} /></a>
                    <a href="mailto:robin.w.bailey@gmail.com" className="text-stone-400 hover:text-orange-500 hover:scale-110 transition-all"><Mail size={24} /></a>
               </div>
             </div>
          </section>
          
          <footer className="flex flex-col md:flex-row justify-between items-end pt-12 border-t border-stone-200/60">
             <div className="mb-4 md:mb-0">
               <span className="font-display text-stone-500 italic text-lg block">Robin Bailey © 2025</span>
               <span className="font-sans text-xs text-stone-400">Made with care in Plymouth</span>
             </div>
             <a href="#" className="group font-sans text-xs uppercase tracking-widest text-stone-900 font-bold hover:text-orange-600 flex items-center gap-2">
               Back to Top <ArrowDown size={12} className="rotate-180 group-hover:-translate-y-1 transition-transform" />
             </a>
          </footer>

        </div>
      </main>

      {/* Project Detail Overlay */}
      <ProjectModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}

export default App;