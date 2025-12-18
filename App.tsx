import React, { useState } from 'react';
import VerticalSidebar from './components/VerticalSidebar';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import { PROJECTS } from './constants';
import { Project } from './types';
import { ArrowDown, ArrowUp, Linkedin, Github, Twitter, Mail, Calendar, Globe, Mic, ExternalLink, Briefcase, GraduationCap, Lightbulb, Star } from 'lucide-react';

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFreelanceProjects, setShowFreelanceProjects] = useState(false);
  const [showDigitalEdProjects, setShowDigitalEdProjects] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };



  return (
    <div className="min-h-screen bg-[#fcfcfc] relative overflow-hidden animate-fade-in">
      
      {/* 1. Paper Texture Overlay (Noise) */}
      <div 
        className="fixed inset-0 opacity-[0.04] pointer-events-none z-40 mix-blend-multiply"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          transform: 'translateZ(0)'
        }} 
      />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes draw-stroke {
          from { stroke-dashoffset: 800; }
          to { stroke-dashoffset: 0; }
        }
      `}} />

      {/* 2. Atmosphere / Color Orbs */}
      <div className="fixed top-[-20%] right-[-10%] w-[800px] h-[800px] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-multiply opacity-60 animate-pulse duration-[10000ms]" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[100px] pointer-events-none z-0 mix-blend-multiply opacity-60" />

      {/* Fixed Sidebar (Desktop) */}
      <VerticalSidebar />

      {/* Mobile Header (Visible only on small screens) */}
      <header className="md:hidden fixed top-0 left-0 w-full bg-[#fcfcfc]/90 backdrop-blur-md z-50 border-b border-stone-200 p-4 flex justify-between items-center">
        <h1 className="font-display font-medium italic text-3xl tracking-tight text-stone-900">Robin</h1>
        <img src="/rectangle_logo.png" alt="Logo" className="h-7 w-auto object-contain" />
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 md:pl-24 lg:pl-32 pt-20 md:pt-0">
        
        <div className="max-w-screen-2xl mx-auto px-6 md:px-16 lg:px-24 py-12 md:py-24">
          
          {/* Hero Section */}
          <section className="mb-24 md:mb-32">
            <div className="flex flex-col xl:flex-row xl:items-start gap-12 xl:gap-24 border-b border-stone-900/10 pb-12 relative">
              {/* Decorative Line Accent */}
              <div className="absolute bottom-[-1px] left-0 w-32 h-[2px] bg-rust-600 z-10"></div>
              
              <div className="flex flex-col gap-3 relative z-10">
                {/* Hidden H1 for SEO/Accessibility since visual title is in sidebar */}
                <h1 className="sr-only">Robin Bailey</h1>
                
                <div className="flex flex-col">

                  <span className="font-sans font-semibold text-4xl md:text-7xl tracking-tighter text-stone-900 leading-[0.9] -ml-[2px]">
                    Product <span className="relative inline-block z-0">
                      <span className="relative z-10">Leader</span>
                      <svg className="absolute -z-10 w-[120%] h-[150%] top-[0%] -left-[10%] text-orange-500 opacity-90 rotate-[-1deg]" viewBox="0 0 250 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                        <path d="M10 85 C 80 95 160 85 240 75" 
                          stroke="currentColor" 
                          strokeWidth="6" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeDasharray="800" 
                          strokeDashoffset="800"
                          style={{ animation: 'draw-stroke 0.5s ease-out forwards 1.3s' }} />
                        <path d="M15 105 C 90 100 170 110 235 95" 
                          stroke="currentColor" 
                          strokeWidth="6" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeDasharray="800" 
                          strokeDashoffset="800"
                          style={{ animation: 'draw-stroke 0.5s ease-out forwards 1.7s' }} />
                      </svg>
                    </span>
                  </span>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 text-4xl md:text-7xl text-stone-600 leading-none mt-2">
                    <span className="font-serif italic text-stone-800 font-medium tracking-tight">
                      Designer
                    </span>
                    <span className="font-serif italic text-stone-300 font-light text-4xl md:text-6xl">&</span>
                    <span className="font-mono text-4xl md:text-6xl text-rust-600 font-medium tracking-tighter transform translate-y-[-2px]">
                      Engineer
                    </span>
                  </div>
                </div>
              </div>

              <div className="max-w-xl pb-2 xl:mb-2">
                <p className="font-sans font-light text-stone-600 leading-relaxed text-lg md:text-xl">
                  I help turn complex business challenges into clear, user-focused product solutions — working with you to design, architect, and implement technical systems that deliver real <span className="relative inline-block z-0"><span className="relative z-10">impact</span><svg className="absolute -z-10 w-[140%] h-[150%] -top-[25%] -left-[20%] text-orange-500 opacity-90 rotate-[-2deg]" viewBox="0 0 250 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M40 40 C 40 20 90 10 130 15 C 190 20 230 50 220 80 C 210 110 140 115 80 110 C 30 105 10 70 25 50 C 35 35 90 25 140 30 C 180 35 210 60 200 85" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="800" strokeDashoffset="800" style={{ animation: 'draw-stroke 0.8s ease-out forwards 2.3s' }} /></svg></span>.
                </p>
                
                <div className="flex items-center gap-3 mt-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="font-lato text-xs font-bold uppercase tracking-widest text-emerald-700">
                    Available for new opportunities
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Experience & Education Columns */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
            <div className="lg:col-span-7 space-y-16">
              
              {/* Experience */}
              <div>
                <h3 className="font-display italic text-3xl md:text-4xl mb-8 text-stone-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center not-italic">
                     <Briefcase size={20} />
                  </div>
                  Experience
                </h3>
                <div className="space-y-12 border-l border-stone-200 ml-2 pl-5 md:pl-8 relative">
                  
                  <div className="relative group">
                    <div className="absolute -left-[39px] top-2 w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#fcfcfc] shadow-sm transition-transform group-hover:scale-125"></div>
                    <h4 className="font-serif text-2xl text-stone-900 group-hover:text-emerald-700 transition-colors">Product & Technical Lead: Learning Analytics & Student Support Experience</h4>
                    <p className="font-lato text-sm font-bold uppercase tracking-widest text-stone-400 mb-2 mt-1">Plymouth University / 2025 — Present</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed">
                      Leading the strategic development and technical implementation of data-informed student success initiatives and experience platforms.
                    </p>
                    <div className="mt-4 space-y-3">
                      <div className="flex gap-3 items-start">
                         <span className="text-emerald-400 mt-1.5 text-[10px]">●</span>
                         <div>
                           <h5 className="font-serif text-stone-800 text-lg leading-tight">Learning Analytics for Early Intervention</h5>
                           <p className="font-sans text-stone-600 font-light text-sm mt-1">
                             Led the design and development of a data-informed learning analytics platform to identify at-risk students early in the semester. Implemented a organisational first student ambassador led call centre to enable peer-led support and signposting.
                           </p>
                           <p className="font-lato text-xs text-emerald-600 font-medium mt-2 flex items-center gap-1.5">
                             <span className="text-lg leading-none">★</span> Vice-Chancellor's Award for Supporting a Great Student Experience 'Highly Commended'
                           </p>
                         </div>
                      </div>
                      <div className="flex gap-3 items-start">
                         <span className="text-emerald-400 mt-1.5 text-[10px]">●</span>
                         <div>
                           <h5 className="font-serif text-stone-800 text-lg leading-tight">Student Support Case Management</h5>
                           <p className="font-sans text-stone-600 font-light text-sm mt-1">
                             Leading the design and implementation of a fully integrated student support case management system across the entire institution.
                           </p>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[39px] top-2 w-5 h-5 rounded-full bg-emerald-500 border-4 border-[#fcfcfc] shadow-sm transition-transform group-hover:scale-125"></div>
                    <h4 className="font-serif text-2xl text-stone-900 group-hover:text-emerald-700 transition-colors">Digital Education Product Manager</h4>
                    <p className="font-lato text-sm font-bold uppercase tracking-widest text-stone-400 mb-2 mt-1">Academic Development, Plymouth University / 2019 — 2025</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed">
                      Building a first class student success platform for the Faculty of Medicine and Dentistry. Member of multiple faculty committees.
                    </p>
                    <div className="mt-4 space-y-3">
                      <div className="flex gap-3 items-start">
                         <span className="text-emerald-400 mt-1.5 text-[10px]">●</span>
                         <div>
                           <h5 className="font-serif text-stone-800 text-lg leading-tight">PULSE Student Success Platform</h5>
                           <p className="font-sans text-stone-600 font-light text-sm mt-1">
                             Led the design and implementation of a fully integrated Salesforce assessment platform for Medicine and Dentistry.
                           </p>
                         </div>
                      </div>

                      <div className="flex gap-3 items-start">
                         <span className="text-emerald-400 mt-1.5 text-[10px]">●</span>
                         <div>
                           <h5 className="font-serif text-stone-800 text-lg leading-tight">Content Adaptive Progress Testing</h5>
                           <p className="font-sans text-stone-600 font-light text-sm mt-1">
                             Designed and implemented a industry first feedback system to enable longitudinal personalised learning feedback to medical students against the GMC topic map. Coinciding and enabling dynamic assessment of student based on past assessment performance.
                           </p>
                         </div>
                      </div>

                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDigitalEdProjects ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="flex gap-3 items-start pb-3">
                           <span className="text-emerald-400 mt-1.5 text-[10px]">●</span>
                           <div>
                             <h5 className="font-serif text-stone-800 text-lg leading-tight">On-Clinic Dental Experience Assessment</h5>
                             <p className="font-sans text-stone-600 font-light text-sm mt-1">
                               Digitised the assessment of clinical dental experience, replacing paper logs and enabling real-time progression tracking.
                             </p>
                           </div>
                        </div>
                        <div className="flex gap-3 items-start pb-3">
                           <span className="text-emerald-400 mt-1.5 text-[10px]">●</span>
                           <div>
                             <h5 className="font-serif text-stone-800 text-lg leading-tight">Academic Benchmarking</h5>
                             <p className="font-sans text-stone-600 font-light text-sm mt-1">
                               Developed a comparative analytics tool allowing faculty to benchmark cohort performance against national standards.
                             </p>
                           </div>
                        </div>
                        <div className="flex gap-3 items-start pb-3">
                           <span className="text-emerald-400 mt-1.5 text-[10px]">●</span>
                           <div>
                             <h5 className="font-serif text-stone-800 text-lg leading-tight">Wave Digital Assistant</h5>
                             <p className="font-sans text-stone-600 font-light text-sm mt-1">
                               AI chatbot for staff digital education queries in Moodle & student careers advice in the university app.
                             </p>
                           </div>
                        </div>
                        <div className="flex gap-3 items-start pb-1">
                           <span className="text-emerald-400 mt-1.5 text-[10px]">●</span>
                           <div>
                             <h5 className="font-serif text-stone-800 text-lg leading-tight">Dynamic Clinical Assessments</h5>
                             <p className="font-sans text-stone-600 font-light text-sm mt-1">
                               TBA
                             </p>
                           </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => setShowDigitalEdProjects(!showDigitalEdProjects)}
                        className="font-lato text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-emerald-500 transition-colors mt-2 flex items-center gap-1 pl-5"
                      >
                        {showDigitalEdProjects ? (
                          <>Show Less <ArrowUp size={12} /></>
                        ) : (
                          <>Show More <ArrowDown size={12} /></>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[39px] top-2 w-5 h-5 rounded-full bg-blue-500 border-4 border-[#fcfcfc] shadow-sm transition-transform group-hover:scale-125"></div>
                    <h4 className="font-serif text-2xl text-stone-900 group-hover:text-blue-700 transition-colors">Product Architect; Senior UX Designer</h4>
                    <p className="font-lato text-sm font-bold uppercase tracking-widest text-stone-400 mb-2 mt-1">iotec Global / 2016 — 2018</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed">
                      Leading UX and product design, building campaign management and reporting tools for a cutting edge AdTech platform.
                    </p>
                    <div className="mt-4 space-y-3">
                      <div className="flex gap-3 items-start">
                         <span className="text-blue-400 mt-1.5 text-[10px]">●</span>
                         <div>
                           <h5 className="font-serif text-stone-800 text-lg leading-tight">iotec Horizon Platform Interface</h5>
                           <p className="font-sans text-stone-600 font-light text-sm mt-1">
                             Designed self-service tools that reduced campaign setup time by 80% and enabled scaling to 200+ clients.
                           </p>
                         </div>
                      </div>
                      <div className="flex gap-3 items-start">
                         <span className="text-blue-400 mt-1.5 text-[10px]">●</span>
                         <div>
                           <h5 className="font-serif text-stone-800 text-lg leading-tight">iotec Platform RESTful API</h5>
                           <p className="font-sans text-stone-600 font-light text-sm mt-1">
                             TBA
                           </p>
                         </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <div className="absolute -left-[39px] top-2 w-5 h-5 rounded-full bg-orange-500 border-4 border-[#fcfcfc] shadow-sm transition-transform group-hover:scale-125"></div>
                    <h4 className="font-serif text-2xl text-stone-900 group-hover:text-orange-700 transition-colors">Freelance Product Design</h4>
                    <p className="font-lato text-sm font-bold uppercase tracking-widest text-stone-400 mb-2 mt-1">Multiple Clients / 2010 — Present</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed mb-3">
                      Working with diverse clients to build educational iOS applications and digital solutions.
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Wild Planet Trust', 'ToolFinder', 'Local Gov', 'Apollo Health Innovations'].map(client => (
                        <span key={client} className="font-lato text-xs font-medium text-stone-500 bg-stone-100 px-2 py-1 rounded-md border border-stone-200/50 hover:bg-orange-50 hover:text-orange-600 hover:border-orange-200 transition-colors cursor-default">
                          {client}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 mb-4 space-y-3">
                      <div className="flex gap-3 items-start">
                         <span className="text-orange-400 mt-1.5 text-[10px]">●</span>
                         <div>
                           <h5 className="font-serif text-stone-800 text-lg leading-tight">Local Government Digital Healthcare Initiative</h5>
                           <p className="font-sans text-stone-600 font-light text-sm mt-1">
                             More details coming soon.
                           </p>
                         </div>
                      </div>
                      <div className="flex gap-3 items-start">
                         <span className="text-orange-400 mt-1.5 text-[10px]">●</span>
                         <div>
                           <h5 className="font-serif text-stone-800 text-lg leading-tight">Bento for iOS & Android</h5>
                           <p className="font-sans text-stone-600 font-light text-sm mt-1">
                             A "Do Less" to-do list application focused on mindful productivity.
                           </p>
                           <p className="font-lato text-xs text-orange-600 font-medium mt-2 flex items-center gap-1.5 align-top">
                             <span className="text-lg leading-none mt-[-2px]">★</span> <span>Featured by Apple as a "New & Noteworthy" and a Top 5 Paid Productivity App in 30 different countries</span>
                           </p>
                         </div>
                      </div>
                      <div className="flex gap-3 items-start">
                         <span className="text-orange-400 mt-1.5 text-[10px]">●</span>
                         <div>
                           <h5 className="font-serif text-stone-800 text-lg leading-tight">Investigate Invertebrates</h5>
                           <p className="font-sans text-stone-600 font-light text-sm mt-1">
                             Designed an interactive companion app for Paignton Zoo that increased visitor dwell time through gamification.
                           </p>
                         </div>
                      </div>
                      
                      </div>
                      
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFreelanceProjects ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="flex gap-3 items-start pb-1">
                           <span className="text-orange-400 mt-1.5 text-[10px]">●</span>
                           <div>
                             <h5 className="font-serif text-stone-800 text-lg leading-tight">BearForms</h5>
                             <p className="font-sans text-stone-600 font-light text-sm mt-1">
                               Designed and developed an offline-first data capture application for iOS and Android.
                             </p>
                           </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => setShowFreelanceProjects(!showFreelanceProjects)}
                        className="font-lato text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-orange-500 transition-colors mt-2 flex items-center gap-1 pl-5"
                      >
                        {showFreelanceProjects ? (
                          <>Show Less <ArrowUp size={12} /></>
                        ) : (
                          <>Show More <ArrowDown size={12} /></>
                        )}
                      </button>


                  </div>

                </div>
              </div>


            </div>

            <div className="lg:col-span-5 space-y-16">
               {/* Expertise */}
              <div className="bg-gradient-to-br from-stone-900 to-slate-800 text-stone-50 p-6 md:p-12 relative overflow-hidden rounded-sm shadow-2xl">
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
                      <h4 className="font-lato text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                        Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {['Product & UX', 'Salesforce', 'Mobile Apps', 'AI & ML', 'Wireframing', 'Prototyping'].map(skill => (
                          <span key={skill} className="px-3 py-1.5 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-orange-500/50 rounded-md text-sm font-lato font-light text-stone-300 transition-colors cursor-default">{skill}</span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-lato text-xs font-bold uppercase tracking-widest text-stone-400 mb-4 flex items-center gap-2">
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

              {/* Education */}
              <div>
                <h3 className="font-display italic text-3xl md:text-4xl mb-8 text-stone-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center not-italic">
                     <GraduationCap size={20} />
                  </div>
                  Education
                </h3>
                <div className="grid grid-cols-1 gap-6">
                   {/* Masters */}
                   <div className="p-6 border border-stone-200 bg-white hover:border-purple-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition duration-300 rounded-sm group flex flex-col">
                      <div className="w-6 h-1 bg-purple-500 mb-3 group-hover:w-10 transition-all"></div>
                      <h4 className="font-serif text-2xl text-stone-900 leading-none mb-1">Master of Science</h4>
                      <p className="text-stone-500 font-lato text-sm mb-3">Business & Management</p>
                      
                      <div className="mb-3 flex-grow">
                        <p className="font-lato text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Awards</p>
                        <ul className="space-y-1">
                          <li className="flex items-start gap-2 font-lato text-xs text-stone-600">
                            <span className="text-purple-500">★</span>
                            <span>Dean's List Award for Academic Excellence</span>
                          </li>
                        </ul>
                      </div>

                      <p className="font-lato text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-purple-600 transition-colors mt-auto pt-3 border-t border-stone-100">Plymouth University / Distinction</p>
                   </div>

                   {/* Bachelors */}
                   <div className="p-6 border border-stone-200 bg-white hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition duration-300 rounded-sm group flex flex-col">
                      <div className="w-6 h-1 bg-blue-500 mb-3 group-hover:w-10 transition-all"></div>
                      <h4 className="font-serif text-2xl text-stone-900 leading-none mb-1">Bachelor of Science</h4>
                      <p className="text-stone-500 font-lato text-sm mb-3">Computer Science</p>
                      
                       <div className="mb-3 flex-grow">
                        <p className="font-lato text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-2">Awards</p>
                        <ul className="space-y-1">
                          <li className="flex items-start gap-2 font-lato text-xs text-stone-600">
                            <span className="text-blue-500">★</span>
                            <span>Dean's List Award (2010, 2011, 2012)</span>
                          </li>
                        </ul>
                      </div>

                      <p className="font-lato text-[10px] uppercase tracking-widest text-stone-400 group-hover:text-blue-600 transition-colors mt-auto pt-3 border-t border-stone-100">Plymouth University / First-Class Honours</p>
                   </div>
                </div>
              </div>
            </div>
          </section>



          {/* Volunteering & Speaking Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-32 border-t border-stone-200 pt-16 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-stone-200 rounded-full hidden md:block"></div>
             
             {/* Volunteering */}
             <div>
               <h3 className="font-display italic text-3xl mb-8 text-stone-900 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center not-italic">
                    <Globe size={16} />
                 </div>
                 Volunteering & Advisory
               </h3>
               <div className="space-y-10">
                  <div className="group border-b border-stone-100 pb-8 cursor-default">
                    <h4 className="font-serif text-xl text-stone-900 group-hover:text-emerald-700 transition-colors">Assessment Alliance Security Group</h4>
                    <p className="font-lato text-stone-500 text-sm mt-1">Medical Schools Council UK</p>
                    <p className="font-lato text-xs uppercase tracking-widest text-stone-400 mt-2 mb-3 group-hover:text-emerald-500">2025 — Present</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed text-sm">
                      Advising the Medical Schools Council on best practices for digital assessment security and integrity across UK medical schools.
                    </p>
                  </div>
                  <div className="group border-b border-stone-100 pb-8 cursor-default">
                    <h4 className="font-serif text-xl text-stone-900 group-hover:text-emerald-700 transition-colors">Learning Analytics Steering Group</h4>
                    <p className="font-lato text-stone-500 text-sm mt-1">HESPA: The Higher Education Strategic Planners Association</p>
                    <p className="font-lato text-xs uppercase tracking-widest text-stone-400 mt-2 mb-3 group-hover:text-emerald-500">2025 — Present</p>
                  </div>
                  <div className="group border-b border-stone-100 pb-8 cursor-default">
                    <h4 className="font-serif text-xl text-stone-900 group-hover:text-emerald-700 transition-colors">Education</h4>
                    <p className="font-lato text-stone-500 text-sm mt-1">Wild Planet Trust</p>
                    <p className="font-lato text-xs uppercase tracking-widest text-stone-400 mt-2 mb-3 group-hover:text-emerald-500">2004 — 2023</p>
                    <p className="font-sans text-stone-600 font-light leading-relaxed text-sm">
                      Supporting the education department in delivering conservation education to public audiences and school groups.
                    </p>
                  </div>
                  <div className="group cursor-default">
                    <h4 className="font-serif text-xl text-stone-900 group-hover:text-emerald-700 transition-colors">Mayor's Youth Council Representative</h4>
                    <p className="font-lato text-stone-500 text-sm mt-1">Town Council</p>
                    <p className="font-lato text-xs uppercase tracking-widest text-stone-400 mt-2 mb-3 group-hover:text-emerald-500">2006 — 2009</p>
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
                       <span className="block font-lato font-bold text-lg text-stone-300 group-hover:text-rose-500 transition-colors">2024</span>
                    </div>
                    <div>
                       <h4 className="font-serif text-xl text-stone-900 leading-tight group-hover:text-rose-700 transition-colors">Annual European Conference on Assessment in Medical Education | EBMA</h4>
                       <p className="font-lato text-stone-500 text-sm mt-1 italic">The Future of Assessment in Medical Education: Opportunities and Threats</p>
                       <div className="mt-3 space-y-2">
                         <div className="flex gap-2 items-start">
                           <span className="text-rose-400 mt-1.5 text-[10px]">●</span>
                           <p className="font-sans text-stone-600 font-light leading-relaxed text-sm">
                             <span className="font-medium text-stone-800">Symposium — Adaptive Testing:</span> Current and Future Perspectives.
                           </p>
                         </div>
                         <div className="flex gap-2 items-start">
                           <span className="text-rose-400 mt-1.5 text-[10px]">●</span>
                           <p className="font-sans text-stone-600 font-light leading-relaxed text-sm">
                             <span className="font-medium text-stone-800">Presentation:</span> Implementation of Content Adaptive Progress Tests at Peninsula Medical School in Plymouth.
                           </p>
                         </div>
                       </div>
                     </div>
                  </div>
                  <div className="group border-b border-stone-100 pb-6 flex gap-4 cursor-default">
                    <div className="flex-shrink-0 w-12 text-center pt-1">
                       <span className="block font-lato font-bold text-lg text-stone-300 group-hover:text-rose-500 transition-colors">2024</span>
                    </div>
                    <div>
                       <h4 className="font-serif text-xl text-stone-900 leading-tight group-hover:text-rose-700 transition-colors">Salesforce UK/EMEA Education User Group</h4>
                       <p className="font-lato text-stone-500 text-sm mt-1 italic">Student Success Platform for Medicine</p>
                       <p className="font-sans text-stone-600 font-light leading-relaxed text-sm mt-2">
                         Showcasing how we utilised Salesforce to build a bespoke Student Success Platform for the Faculty of Medicine.
                       </p>
                    </div>
                  </div>
                  <div className="group border-b border-stone-100 pb-6 flex gap-4 cursor-default">
                    <div className="flex-shrink-0 w-12 text-center pt-1">
                       <span className="block font-lato font-bold text-lg text-stone-300 group-hover:text-rose-500 transition-colors">2022</span>
                    </div>
                    <div>
                       <h4 className="font-serif text-xl text-stone-900 leading-tight group-hover:text-rose-700 transition-colors">Peninsula Medical School Conference</h4>
                       <p className="font-lato text-stone-500 text-sm mt-1 italic">Visualising Adaptive Progress Testing</p>
                       <p className="font-sans text-stone-600 font-light leading-relaxed text-sm mt-2">
                         Discussing data visualisation techniques for complex longitudinal assessment data.
                       </p>
                    </div>
                  </div>
                  <div className="group flex gap-4 cursor-default">
                    <div className="flex-shrink-0 w-12 text-center pt-1">
                       <span className="block font-lato font-bold text-lg text-stone-300 group-hover:text-rose-500 transition-colors">2012</span>
                    </div>
                    <div>
                       <h4 className="font-serif text-xl text-stone-900 leading-tight group-hover:text-rose-700 transition-colors">Learning Without Frontiers</h4>
                       <p className="font-lato text-stone-500 text-sm mt-1 italic">London</p>
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
                     <th className="py-4 w-8 md:w-12"></th>
                     <th className="py-4 pr-4 font-lato text-xs uppercase tracking-widest font-bold text-stone-900 w-24">Year</th>
                     <th className="py-4 pr-4 font-lato text-xs uppercase tracking-widest font-bold text-stone-900">Project</th>
                     <th className="py-4 pr-4 font-lato text-xs uppercase tracking-widest font-bold text-stone-900 hidden md:table-cell">Category</th>
                     <th className="py-4 font-lato text-xs uppercase tracking-widest font-bold text-stone-900 hidden lg:table-cell">Client</th>
                     <th className="py-4 w-10"></th>
                   </tr>
                 </thead>
                  <tbody>
                    {PROJECTS.map((project) => (
                      <tr 
                        key={project.id} 
                        className="border-b border-stone-200 group hover:bg-white cursor-default transition-colors"
                      >
                        <td className="py-4 pl-2 md:pl-4">
                           {project.isSelected && (
                             <Star size={16} className="text-rust-600 fill-current" />
                           )}
                        </td>
                        <td className="py-4 pr-4 font-serif text-stone-400 group-hover:text-rust-600 transition-colors">{project.year}</td>
                        <td className="py-4 pr-4">
                          <span className="font-serif text-lg text-stone-900 font-medium block group-hover:translate-x-2 transition-transform duration-300">{project.title}</span>
                          <span className="font-lato text-xs text-stone-500 md:hidden mt-1 block">{project.category}</span>
                       </td>
                       <td className="py-4 pr-4 font-lato text-sm text-stone-500 hidden md:table-cell">
                          <span className="px-2 py-1 rounded-md bg-stone-100 group-hover:bg-rust-50 group-hover:text-rust-800 transition-colors">
                            {project.category}
                          </span>
                       </td>
                       <td className="py-4 font-lato text-sm text-stone-600 hidden lg:table-cell opacity-70 group-hover:opacity-100">{project.client || '-'}</td>
                       <td className="py-4 text-stone-300 group-hover:text-rust-500">
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
               <a href="mailto:robin.w.bailey@gmail.com" className="inline-block bg-stone-900 text-white font-lato font-bold tracking-wide px-10 py-5 hover:bg-rust-600 transition-colors shadow-xl hover:shadow-rust-500/20 transform hover:-translate-y-1 duration-300 rounded-sm">
                   Get in Touch
               </a>
               <div className="flex justify-center gap-8 mt-12">
                    <a href="https://twitter.com/RobinBailey" className="text-stone-400 hover:text-blue-400 hover:scale-110 transition-all"><Twitter size={24} /></a>
                    <a href="https://www.linkedin.com/in/robinwbailey/" className="text-stone-400 hover:text-blue-700 hover:scale-110 transition-all"><Linkedin size={24} /></a>
                    <a href="https://github.com/yourprofile" className="text-stone-400 hover:text-stone-900 hover:scale-110 transition-all"><Github size={24} /></a>
                    <a href="mailto:robin.w.bailey@gmail.com" className="text-stone-400 hover:text-rust-500 hover:scale-110 transition-all"><Mail size={24} /></a>
               </div>
             </div>
          </section>
          
          <footer className="flex flex-col md:flex-row justify-between items-start md:items-end pt-12 border-t border-stone-200/60">
             <div className="mb-4 md:mb-0">
               <span className="font-display text-stone-500 italic text-lg block">Robin Bailey © 2025</span>
               <span className="font-lato text-xs text-stone-400">Made with care in Plymouth</span>
             </div>
             <a href="#" className="group font-lato text-xs uppercase tracking-widest text-stone-900 font-bold hover:text-rust-600 flex items-center gap-2">
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