import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ProjectModal from './components/ProjectModal';
import { PROJECTS } from './constants';
import { Project } from './types';
import { ArrowDown, ArrowUp, Linkedin, Github, Twitter, Mail, Globe, Mic, Briefcase, GraduationCap, Lightbulb, Star, LayoutTemplate, Cloud, Smartphone, Database, PenTool, Zap, BookOpen, Stethoscope, Landmark, Megaphone, Waves, ArrowUpRight, MapPin } from 'lucide-react';

// Scroll-reveal hook
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.08 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

// Local time hook
function useLocalTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 60000); return () => clearInterval(t); }, []);
  return time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/London' });
}

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFreelanceProjects, setShowFreelanceProjects] = useState(false);
  const [showDigitalEdProjects, setShowDigitalEdProjects] = useState(false);

  const experience = useScrollReveal();
  const volunteering = useScrollReveal();
  const speaking = useScrollReveal();
  const archive = useScrollReveal();
  const cta = useScrollReveal();
  const localTime = useLocalTime();

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f4] relative">

      {/* Grain */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.02]" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundRepeat: 'repeat', backgroundSize: '256px 256px' }} 
      />

      <style>{`
        .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-child > * { opacity: 0; transform: translateY(16px); transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .reveal-child.visible > *:nth-child(1) { transition-delay: 0ms; opacity: 1; transform: translateY(0); }
        .reveal-child.visible > *:nth-child(2) { transition-delay: 80ms; opacity: 1; transform: translateY(0); }
        .reveal-child.visible > *:nth-child(3) { transition-delay: 160ms; opacity: 1; transform: translateY(0); }
        .reveal-child.visible > *:nth-child(4) { transition-delay: 240ms; opacity: 1; transform: translateY(0); }
        .reveal-child.visible > *:nth-child(5) { transition-delay: 320ms; opacity: 1; transform: translateY(0); }
        .card-hover { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 30px -12px rgba(0,0,0,0.1); }
        .archive-row { transition: background-color 0.2s ease; }
        .archive-row:hover { background-color: rgba(250,250,249,0.8); }
        .archive-row:hover .archive-arrow { transform: translateX(3px) translateY(-3px); opacity: 1; }
        .archive-arrow { opacity: 0.3; transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease; }
        .profile-card::-webkit-scrollbar { display: none; }
        .profile-card { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Navbar />

      {/* ─── MAIN LAYOUT: Profile Card + Content Feed ─── */}
      <main className="relative z-10 pt-20 pb-16">
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

            {/* ━━━━━ LEFT: PROFILE CARD (sticky) ━━━━━ */}
            <aside className="lg:w-[340px] xl:w-[380px] flex-shrink-0">
              <div className="lg:sticky lg:top-24 profile-card lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
                <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden">
                  
                  {/* Cover + Photo */}
                  <div className="relative">
                    <div className="h-28 bg-gradient-to-br from-stone-800 via-stone-900 to-stone-950"></div>
                    <div className="absolute -bottom-14 left-6">
                      <div className="w-28 h-28 rounded-2xl border-4 border-white shadow-lg overflow-hidden bg-stone-200">
                        <img src="/headshot.jpg" alt="Robin Bailey" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-16 px-6 pb-6">
                    {/* Name & Title */}
                    <h1 className="font-sans text-2xl font-bold text-stone-900 tracking-tight leading-tight">Robin Bailey</h1>
                    <p className="font-sans text-[15px] text-stone-500 mt-1 leading-snug">Product Leader · Designer · Engineer</p>
                    
                    <div className="flex items-center gap-1.5 mt-2.5">
                      <MapPin size={12} className="text-stone-400" />
                      <span className="font-sans text-xs text-stone-400 font-medium">Cornwall, UK · {localTime}</span>
                    </div>

                    {/* Availability Pill */}
                    <div className="flex items-center gap-2 mt-4 bg-emerald-50 border border-emerald-200/60 rounded-xl px-3.5 py-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="font-sans text-xs font-semibold text-emerald-700 uppercase tracking-wider">Available for opportunities</span>
                    </div>

                    {/* Bio */}
                    <p className="font-sans text-sm text-stone-500 leading-relaxed mt-5">
                      I help turn complex business challenges into clear, user-focused product solutions — designing, architecting, and implementing technical systems that deliver real impact.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-2 mt-5">
                      <a href="mailto:robin.w.bailey@gmail.com" className="flex items-center gap-1.5 bg-stone-900 text-white text-xs font-bold px-4 py-2 rounded-xl hover:bg-stone-800 transition-colors uppercase tracking-wider">
                        <Mail size={13} /> Contact
                      </a>
                      <a href="https://www.linkedin.com/in/robinwbailey/" className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-colors"><Linkedin size={16} /></a>
                      <a href="https://twitter.com/RobinBailey" className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-colors"><Twitter size={16} /></a>
                      <a href="https://github.com/yourprofile" className="w-9 h-9 rounded-xl bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-700 transition-colors"><Github size={16} /></a>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-stone-100 mx-6"></div>

                  {/* Skills */}
                  <div className="px-6 py-5">
                    <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-3">Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        { label: 'Product & UX', icon: <LayoutTemplate size={12} /> },
                        { label: 'Salesforce', icon: <Cloud size={12} /> },
                        { label: 'Mobile Apps', icon: <Smartphone size={12} /> },
                        { label: 'Data Modeling', icon: <Database size={12} /> },
                        { label: 'Wireframing', icon: <PenTool size={12} /> },
                        { label: 'Prototyping', icon: <Zap size={12} /> }
                      ].map(s => (
                        <span key={s.label} className="px-2.5 py-1 bg-stone-50 border border-stone-200/60 rounded-lg text-xs font-sans font-medium text-stone-500 flex items-center gap-1.5 hover:bg-stone-100 transition-colors cursor-default">
                          <span className="text-stone-400">{s.icon}</span> {s.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-stone-100 mx-6"></div>

                  {/* Sectors */}
                  <div className="px-6 py-5">
                    <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-3">Sectors</h4>
                    <div className="space-y-2">
                      {[
                        { label: 'Education & EdTech', icon: <BookOpen size={14} /> },
                        { label: 'Health & Medical', icon: <Stethoscope size={14} /> },
                        { label: 'Government', icon: <Landmark size={14} /> },
                        { label: 'AdTech', icon: <Megaphone size={14} /> },
                      ].map(s => (
                        <div key={s.label} className="flex items-center gap-2.5 font-sans text-sm text-stone-600 cursor-default">
                          <span className="text-stone-400">{s.icon}</span> {s.label}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-stone-100 mx-6"></div>

                  {/* Education - Compact */}
                  <div className="px-6 py-5" id="education">
                    <h4 className="font-sans text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-3">Education</h4>
                    <div className="space-y-3.5">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-sans text-sm font-semibold text-stone-900">MSc Business & Management</p>
                            <p className="font-sans text-xs text-stone-400 mt-0.5">Plymouth University</p>
                          </div>
                          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md whitespace-nowrap">Distinction</span>
                        </div>
                        <div className="mt-1.5 space-y-0.5">
                          <p className="font-sans text-xs text-stone-500 flex items-center gap-1"><span className="text-amber-500">★</span> Dean's List Award</p>
                          <p className="font-sans text-xs text-stone-500 flex items-center gap-1"><span className="text-amber-500">★</span> Professorate Scholarship</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-sans text-sm font-semibold text-stone-900">BSc Computer Science</p>
                            <p className="font-sans text-xs text-stone-400 mt-0.5">Plymouth University</p>
                          </div>
                          <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-800 bg-stone-100 px-2 py-0.5 rounded-md whitespace-nowrap">First</span>
                        </div>
                        <div className="mt-1.5">
                          <p className="font-sans text-xs text-stone-500 flex items-center gap-1"><span className="text-amber-500">★</span> Dean's List (2010–2012)</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tagline */}
                  <div className="px-6 pb-5">
                    <p className="font-serif italic text-stone-300 text-xs text-center">I obsess over the details that make products feel right.</p>
                  </div>
                </div>
              </div>
            </aside>

            {/* ━━━━━ RIGHT: CONTENT FEED ━━━━━ */}
            <div className="flex-1 min-w-0 space-y-8">

              {/* ── FEATURED ── */}
              <section className="reveal visible mb-8">
                <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 rounded-3xl border border-stone-800/80 shadow-xl overflow-hidden relative group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 mix-blend-overlay group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                  <div className="px-7 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                    <div>
                      <h2 className="font-sans text-[11px] font-bold uppercase tracking-widest text-emerald-500 mb-1.5 flex items-center gap-1.5">
                        <Star size={10} className="fill-current" /> Featured Work
                      </h2>
                      <p className="font-sans text-lg font-bold text-white tracking-tight leading-snug">PULSE Student Success Platform</p>
                      <p className="font-sans text-stone-400 text-sm mt-1 max-w-md">Transforming medical education with an industry-first student tracking platform.</p>
                    </div>
                    <button onClick={() => window.scrollTo({ top: document.getElementById('experience')?.offsetTop || 0, behavior: 'smooth' })} className="inline-flex items-center gap-1.5 font-sans text-xs font-bold uppercase tracking-wider text-stone-900 bg-white hover:bg-stone-100 px-4 py-2.5 rounded-xl transition-colors shrink-0">
                      View details
                    </button>
                  </div>
                </div>
              </section>

              {/* ── EXPERIENCE ── */}
              <section id="experience" ref={experience.ref} className={`reveal ${experience.isVisible ? 'visible' : ''}`}>
                <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden">
                  <div className="px-7 pt-7 pb-2">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="font-sans text-xl font-bold text-stone-900 tracking-tight flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center"><Briefcase size={15} /></div>
                        Experience
                      </h2>
                    </div>
                  </div>
                  
                  <div className={`px-7 pb-7 space-y-0 reveal-child ${experience.isVisible ? 'visible' : ''}`}>
                    
                    {/* Role 1 — Current */}
                    <div className="border-l-[3px] border-emerald-500 pl-5 pb-8 relative">
                      <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white"></div>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                        <div>
                          <h3 className="font-sans text-[16px] font-bold text-stone-900 leading-snug">Product & Technical Lead: Learning Analytics & Student Support</h3>
                          <p className="font-sans text-xs font-medium text-stone-400 uppercase tracking-widest mt-1">Plymouth University</p>
                        </div>
                        <span className="font-sans text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg self-start whitespace-nowrap uppercase tracking-wider">2025 — Present</span>
                      </div>
                      <p className="font-sans text-stone-600 text-sm leading-relaxed mb-4">
                        Leading the strategic product development and technical implementation of a wide £<span className="font-mono text-[10px] bg-stone-100 text-stone-400 px-1.5 py-0.5 rounded ml-0.5 mr-1 tracking-widest select-none cursor-help" title="Value redacted for confidentiality">REDACTED</span> programme of transformational features, enabling data-informed student success initiatives and experience platforms for student support, retention, and operational efficiency.
                      </p>
                      <div className="space-y-3">
                        <div className="flex gap-2.5 items-start">
                          <span className="text-emerald-500 mt-1.5 text-[7px]">●</span>
                          <div>
                            <h4 className="font-sans text-sm font-semibold text-stone-800">Learning Analytics for Early Intervention</h4>
                            <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">
                              Led the design and development of a data-informed learning analytics platform to identify at-risk students early in the semester. Implemented a organisational first student ambassador led call centre to enable peer-led support and signposting. Also designed and introduced the first version of a platform-wide <span className="relative inline-block px-1 italic font-medium z-10 text-stone-700">Insights<svg className="absolute -bottom-1 -left-1 -right-1 h-3/4 w-[110%] -z-10 text-purple-200/70" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,50 Q50,40 100,50" stroke="currentColor" strokeWidth="80" fill="none" /></svg></span> service and design to enable proactive calls to action.
                            </p>
                            <p className="font-sans text-xs text-emerald-600 font-semibold mt-1.5 flex items-center gap-1.5">
                              <span className="text-sm leading-none">★</span> Vice-Chancellor's Award for Supporting a Great Student Experience 'Highly Commended'
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2.5 items-start">
                          <span className="text-emerald-500 mt-1.5 text-[7px]">●</span>
                          <div>
                            <h4 className="font-sans text-sm font-semibold text-stone-800">Student Support Enquiry & Case Management</h4>
                            <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">
                              Leading the design and implementation of a fully integrated student support enquiry & case management system across the entire institution.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Role 2 — Digital Education */}
                    <div className="border-l-[3px] border-blue-500 pl-5 pb-8 relative">
                      <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-blue-500 border-2 border-white"></div>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                        <div>
                          <h3 className="font-sans text-[16px] font-bold text-stone-900 leading-snug">Digital Education Product Manager</h3>
                          <p className="font-sans text-xs font-medium text-stone-400 uppercase tracking-widest mt-1">Academic Development, Plymouth University</p>
                        </div>
                        <span className="font-sans text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg self-start whitespace-nowrap uppercase tracking-wider">2019 — 2025</span>
                      </div>
                      <p className="font-sans text-stone-600 text-sm leading-relaxed mb-4">
                        Building a first class student success platform for the Faculty of Medicine and Dentistry. Member of multiple faculty committees.
                      </p>
                      <div className="space-y-3">
                        <div className="flex gap-2.5 items-start">
                          <span className="text-blue-500 mt-1.5 text-[7px]">●</span>
                          <div>
                            <h4 className="font-sans text-sm font-semibold text-stone-800">PULSE Student Success Platform</h4>
                            <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">
                              Led the design and implementation of a fully integrated Salesforce assessment platform for Medicine and Dentistry.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2.5 items-start">
                          <span className="text-blue-500 mt-1.5 text-[7px]">●</span>
                          <div>
                            <h4 className="font-sans text-sm font-semibold text-stone-800">Content Adaptive Progress Testing</h4>
                            <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">
                              Designed and implemented a industry first feedback system to enable longitudinal personalised learning feedback to medical students against the GMC topic map. Coinciding and enabling dynamic assessment of student based on past assessment performance.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2.5 items-start">
                          <span className="text-blue-500 mt-1.5 text-[7px]">●</span>
                          <div>
                            <h4 className="font-sans text-sm font-semibold text-stone-800">On-Clinic Dental Experience Assessment</h4>
                            <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">
                              Digitised the assessment of clinical dental experience, replacing paper logs and enabling real-time progression tracking. Providing process assurance for patient safety and enabling students to work towards their longitudinal GDC requirements. Also enabled capacity management to ensure patient availability for student needs and scheduling. Used across <span className="relative inline-block px-1 italic font-medium z-10 text-stone-700">TBA clinical sites<svg className="absolute -bottom-1 -left-1 -right-1 h-3/4 w-[110%] -z-10 text-yellow-200/70" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,50 Q50,40 100,50" stroke="currentColor" strokeWidth="80" fill="none" /></svg></span> across the south-west of England, enabling over <span className="relative inline-block px-1 italic font-medium z-10 text-stone-700">TBA appointments<svg className="absolute -bottom-1 -left-1 -right-1 h-3/4 w-[110%] -z-10 text-yellow-200/70" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,50 Q50,40 100,50" stroke="currentColor" strokeWidth="80" fill="none" /></svg></span> per year in collaboration with PDSE and the #1 ranked dental school in the UK.
                            </p>
                          </div>
                        </div>

                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showDigitalEdProjects ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="space-y-3">
                            <div className="flex gap-2.5 items-start">
                              <span className="text-blue-500 mt-1.5 text-[7px]">●</span>
                              <div>
                                <h4 className="font-sans text-sm font-semibold text-stone-800">Academic Benchmarking</h4>
                                <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">
                                  Developed a comparative analytics tool allowing faculty to benchmark cohort performance against national standards.
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2.5 items-start">
                              <span className="text-blue-500 mt-1.5 text-[7px]">●</span>
                              <div>
                                <h4 className="font-sans text-sm font-semibold text-stone-800">Wave Digital Assistant</h4>
                                <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">AI chatbot for staff digital education queries in Moodle & student careers advice in the university app.</p>
                              </div>
                            </div>
                            <div className="flex gap-2.5 items-start">
                              <span className="text-blue-500 mt-1.5 text-[7px]">●</span>
                              <div>
                                <h4 className="font-sans text-sm font-semibold text-stone-800">Dynamic Clinical Assessments</h4>
                                <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">More details coming soon.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <button onClick={() => setShowDigitalEdProjects(!showDigitalEdProjects)} className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-stone-400 hover:text-blue-600 px-3 py-1.5 rounded-lg transition-colors border border-stone-200 hover:border-blue-300">
                          {showDigitalEdProjects ? (<>Less <ArrowUp size={11} /></>) : (<>More <ArrowDown size={11} /></>)}
                        </button>
                      </div>
                    </div>

                    {/* Role 3 — iotec */}
                    <div className="border-l-[3px] border-violet-500 pl-5 pb-8 relative">
                      <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-white"></div>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                        <div>
                          <h3 className="font-sans text-[16px] font-bold text-stone-900 leading-snug">Product Architect; Senior UX Designer</h3>
                          <p className="font-sans text-xs font-medium text-stone-400 uppercase tracking-widest mt-1">iotec Global</p>
                        </div>
                        <span className="font-sans text-xs font-bold text-violet-600 bg-violet-50 px-3 py-1 rounded-lg self-start whitespace-nowrap uppercase tracking-wider">2016 — 2018</span>
                      </div>
                      <p className="font-sans text-stone-600 text-sm leading-relaxed mb-4">
                        Leading UX and product design, building campaign management and reporting tools for a cutting edge AdTech platform.
                      </p>
                      <div className="space-y-3">
                        <div className="flex gap-2.5 items-start">
                          <span className="text-violet-500 mt-1.5 text-[7px]">●</span>
                          <div>
                            <h4 className="font-sans text-sm font-semibold text-stone-800">iotec Horizon Platform Interface</h4>
                            <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">
                              Led the design and implementation of a new campaign management and reporting web interface, enabling advanced configuration, setup, and performance monitoring for internal teams and professional clients, including self-service capabilities for high-value accounts. The platform was fully internationalised for major European markets to enable strategic expansion.
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2.5 items-start">
                          <span className="text-violet-500 mt-1.5 text-[7px]">●</span>
                          <div>
                            <h4 className="font-sans text-sm font-semibold text-stone-800">iotec Platform RESTful API</h4>
                            <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">
                              Led the development of a RESTful API for the iotec Horizon Platform, enabling seamless integration with external systems and applications as well as a unified platform for developing new products and features internally. A key enabling strategic functionality for the self service Horizon platform interface.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Role 4 — Freelance */}
                    <div className="border-l-[3px] border-orange-500 pl-5 pb-2 relative">
                      <div className="absolute -left-[7px] top-1.5 w-3 h-3 rounded-full bg-orange-500 border-2 border-white"></div>
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 mb-3">
                        <div>
                          <h3 className="font-sans text-[16px] font-bold text-stone-900 leading-snug">Freelance Product Design & Development</h3>
                          <p className="font-sans text-xs font-medium text-stone-400 uppercase tracking-widest mt-1">Multiple Clients</p>
                        </div>
                        <span className="font-sans text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-lg self-start whitespace-nowrap uppercase tracking-wider">2010 — Present</span>
                      </div>
                      <p className="font-sans text-stone-600 text-sm leading-relaxed mb-3">
                        Designing, building, and implementing 0 → 1 products across multiple industries.
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {['Wild Planet Trust', 'ToolFinder', 'Local Gov', 'Apollo Health'].map(c => (
                          <span key={c} className="font-sans text-xs font-medium text-stone-500 bg-stone-50 border border-stone-200/60 px-2.5 py-1 rounded-lg">{c}</span>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <div className="flex gap-2.5 items-start">
                          <span className="text-orange-500 mt-1.5 text-[7px]">●</span>
                          <div>
                            <h4 className="font-sans text-sm font-semibold text-stone-800">Local Government Digital Healthcare Initiative</h4>
                            <p className="font-sans text-stone-500 text-[13px] mt-0.5">More details coming soon.</p>
                          </div>
                        </div>
                        <div className="flex gap-2.5 items-start">
                          <span className="text-orange-500 mt-1.5 text-[7px]">●</span>
                          <div>
                            <h4 className="font-sans text-sm font-semibold text-stone-800">Bento for iOS & Android</h4>
                            <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">
                              A "Do Less" to-do list application focused on mindful productivity.
                            </p>
                            <p className="font-sans text-xs text-orange-600 font-semibold mt-1.5 flex items-center gap-1.5">
                              <span className="text-sm leading-none">★</span> Featured by Apple as a "New & Noteworthy" and a Top 5 Paid Productivity App in 30 different countries
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2.5 items-start">
                          <span className="text-orange-500 mt-1.5 text-[7px]">●</span>
                          <div>
                            <h4 className="font-sans text-sm font-semibold text-stone-800">Investigate Invertebrates</h4>
                            <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">
                              Designed an interactive companion app for Paignton Zoo that increased visitor dwell time through gamification.
                            </p>
                          </div>
                        </div>
                        
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFreelanceProjects ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <div className="flex gap-2.5 items-start pb-1">
                            <span className="text-orange-500 mt-1.5 text-[7px]">●</span>
                            <div>
                              <h4 className="font-sans text-sm font-semibold text-stone-800">BearForms</h4>
                              <p className="font-sans text-stone-500 text-[13px] mt-0.5 leading-relaxed">
                                Designed and developed an offline-first data capture application for iOS and Android.
                              </p>
                            </div>
                          </div>
                        </div>

                        <button onClick={() => setShowFreelanceProjects(!showFreelanceProjects)} className="inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-widest text-stone-400 hover:text-orange-600 px-3 py-1.5 rounded-lg transition-colors border border-stone-200 hover:border-orange-300">
                          {showFreelanceProjects ? (<>Less <ArrowUp size={11} /></>) : (<>More <ArrowDown size={11} /></>)}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── VOLUNTEERING & SPEAKING (side by side) ── */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                
                {/* Volunteering */}
                <section id="advisory" ref={volunteering.ref} className={`reveal ${volunteering.isVisible ? 'visible' : ''}`}>
                  <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden h-full">
                    <div className="px-7 pt-7 pb-2">
                      <h2 className="font-sans text-xl font-bold text-stone-900 tracking-tight flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center"><Globe size={14} /></div>
                        Volunteering & Advisory
                      </h2>
                    </div>
                    <div className="px-7 pb-7 space-y-5">
                      <div className="group flex justify-between items-start gap-3 border-b border-stone-100 pb-5 cursor-default">
                        <div>
                          <h4 className="font-sans text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">Assessment Alliance Security Group</h4>
                          <p className="font-sans text-xs text-stone-400 font-medium mt-0.5">Medical Schools Council UK</p>
                          <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-stone-300 mt-1.5 mb-1.5">2025 — Present</p>
                          <p className="font-sans text-stone-500 text-[13px] leading-relaxed">Advising on best practices for digital assessment security across UK medical schools.</p>
                        </div>
                        <img src="/msc_logo.png" alt="MSC" className="w-10 h-10 object-contain opacity-70 mix-blend-multiply flex-shrink-0" />
                      </div>
                      <div className="group flex justify-between items-start gap-3 border-b border-stone-100 pb-5 cursor-default">
                        <div>
                          <h4 className="font-sans text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">Learning Analytics Steering Group</h4>
                          <p className="font-sans text-xs text-stone-400 font-medium mt-0.5">HESPA</p>
                          <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-stone-300 mt-1.5">2025 — Present</p>
                        </div>
                        <img src="/hespa_logo.png" alt="HESPA" className="w-10 h-10 object-contain opacity-70 mix-blend-multiply flex-shrink-0" />
                      </div>
                      <div className="group flex justify-between items-start gap-3 border-b border-stone-100 pb-5 cursor-default">
                        <div>
                          <h4 className="font-sans text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">Education</h4>
                          <p className="font-sans text-xs text-stone-400 font-medium mt-0.5">Wild Planet Trust</p>
                          <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-stone-300 mt-1.5 mb-1.5">2004 — 2023</p>
                          <p className="font-sans text-stone-500 text-[13px] leading-relaxed">Supporting conservation education for public audiences and school groups.</p>
                        </div>
                        <img src="/wildplanettrust_logo.png" alt="WPT" className="w-10 h-10 object-contain opacity-70 mix-blend-multiply flex-shrink-0" />
                      </div>
                      <div className="group cursor-default">
                        <h4 className="font-sans text-sm font-bold text-stone-900 group-hover:text-emerald-700 transition-colors">Mayor's Youth Council Representative</h4>
                        <p className="font-sans text-xs text-stone-400 font-medium mt-0.5">Town Council</p>
                        <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-stone-300 mt-1.5 mb-1.5">2006 — 2009</p>
                        <p className="font-sans text-stone-500 text-[13px] leading-relaxed">Representing young people in local government decision making.</p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Speaking */}
                <section id="speaking" ref={speaking.ref} className={`reveal ${speaking.isVisible ? 'visible' : ''}`}>
                  <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden h-full">
                    <div className="px-7 pt-7 pb-2">
                      <h2 className="font-sans text-xl font-bold text-stone-900 tracking-tight flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-xl bg-stone-100 text-stone-500 flex items-center justify-center"><Mic size={14} /></div>
                        Speaking
                      </h2>
                    </div>
                    <div className="px-7 pb-7 space-y-5">
                      <div className="group border-b border-stone-100 pb-5 flex gap-4 cursor-default">
                        <div className="flex-shrink-0 w-10 pt-0.5">
                          <span className="font-sans font-bold text-sm text-stone-300 group-hover:text-stone-500 transition-colors">2024</span>
                        </div>
                        <div>
                          <h4 className="font-sans text-sm font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">EBMA Annual European Conference</h4>
                          <p className="font-sans text-xs text-stone-400 italic mt-0.5">Assessment in Medical Education</p>
                          <div className="mt-2 space-y-1">
                            <p className="font-sans text-stone-500 text-[13px] leading-relaxed"><span className="font-semibold text-stone-700">Symposium</span> — Adaptive Testing: Current & Future Perspectives</p>
                            <p className="font-sans text-stone-500 text-[13px] leading-relaxed"><span className="font-semibold text-stone-700">Presentation</span> — Content Adaptive Progress Tests at Peninsula Medical School</p>
                          </div>
                        </div>
                      </div>
                      <div className="group border-b border-stone-100 pb-5 flex gap-4 cursor-default">
                        <div className="flex-shrink-0 w-10 pt-0.5">
                          <span className="font-sans font-bold text-sm text-stone-300 group-hover:text-stone-500 transition-colors">2024</span>
                        </div>
                        <div>
                          <h4 className="font-sans text-sm font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">Salesforce UK/EMEA Education User Group</h4>
                          <p className="font-sans text-xs text-stone-400 italic mt-0.5">Student Success Platform for Medicine</p>
                          <p className="font-sans text-stone-500 text-[13px] mt-1 leading-relaxed">Showcasing our bespoke Salesforce Student Success Platform for the Faculty of Medicine.</p>
                        </div>
                      </div>
                      <div className="group border-b border-stone-100 pb-5 flex gap-4 cursor-default">
                        <div className="flex-shrink-0 w-10 pt-0.5">
                          <span className="font-sans font-bold text-sm text-stone-300 group-hover:text-stone-500 transition-colors">2022</span>
                        </div>
                        <div>
                          <h4 className="font-sans text-sm font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">Peninsula Medical School Conference</h4>
                          <p className="font-sans text-xs text-stone-400 italic mt-0.5">Visualising Adaptive Progress Testing</p>
                          <p className="font-sans text-stone-500 text-[13px] mt-1 leading-relaxed">Data visualisation techniques for complex longitudinal assessment data.</p>
                        </div>
                      </div>
                      <div className="group flex gap-4 cursor-default">
                        <div className="flex-shrink-0 w-10 pt-0.5">
                          <span className="font-sans font-bold text-sm text-stone-300 group-hover:text-stone-500 transition-colors">2012</span>
                        </div>
                        <div>
                          <h4 className="font-sans text-sm font-bold text-stone-900 leading-snug group-hover:text-stone-700 transition-colors">Learning Without Frontiers</h4>
                          <p className="font-sans text-xs text-stone-400 italic mt-0.5">London</p>
                          <p className="font-sans text-stone-500 text-[13px] mt-1 leading-relaxed">The future of mobile learning and digital engagement in education.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* ── PROJECT ARCHIVE ── */}
              <section ref={archive.ref} className={`reveal ${archive.isVisible ? 'visible' : ''}`}>
                <div className="bg-white rounded-3xl border border-stone-200/60 shadow-sm overflow-hidden">
                  <div className="px-7 pt-7 pb-4">
                    <h2 className="font-sans text-xl font-bold text-stone-400 tracking-tight">Project Archive</h2>
                  </div>
                  <div className="px-7 pb-7">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b-2 border-stone-200">
                          <th className="py-2.5 w-7"></th>
                          <th className="py-2.5 pr-4 font-sans text-[11px] uppercase tracking-widest font-bold text-stone-500 w-16">Year</th>
                          <th className="py-2.5 pr-4 font-sans text-[11px] uppercase tracking-widest font-bold text-stone-500">Project</th>
                          <th className="py-2.5 pr-4 font-sans text-[11px] uppercase tracking-widest font-bold text-stone-500 hidden md:table-cell">Category</th>
                          <th className="py-2.5 font-sans text-[11px] uppercase tracking-widest font-bold text-stone-500 hidden lg:table-cell">Client</th>
                          <th className="py-2.5 w-7"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {PROJECTS.map((project) => (
                          <tr key={project.id} className="border-b border-stone-100 archive-row cursor-pointer" onClick={() => handleProjectClick(project)}>
                            <td className="py-3 pl-1">{project.isSelected && <Star size={13} className="text-stone-400 fill-current" />}</td>
                            <td className="py-3 pr-4 font-sans text-sm text-stone-400 font-medium">{project.year}</td>
                            <td className="py-3 pr-4">
                              <span className="font-sans text-sm text-stone-900 font-semibold block">{project.title}</span>
                              <span className="font-sans text-xs text-stone-400 md:hidden mt-0.5 block">{project.category}</span>
                            </td>
                            <td className="py-3 pr-4 font-sans text-stone-400 hidden md:table-cell">
                              <span className="text-xs font-medium bg-stone-50 border border-stone-100 px-2 py-0.5 rounded-md">{project.category}</span>
                            </td>
                            <td className="py-3 font-sans text-sm text-stone-400 hidden lg:table-cell font-medium">{project.client || '—'}</td>
                            <td className="py-3 text-stone-400"><ArrowUpRight size={13} className="archive-arrow" /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* ── CTA ── */}
              <section ref={cta.ref} className={`reveal ${cta.isVisible ? 'visible' : ''}`} id="contact">
                <div className="bg-stone-900 rounded-3xl overflow-hidden shadow-sm">
                  <div className="px-10 py-14 text-center">
                    <h2 className="font-sans text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">Let's build something meaningful.</h2>
                    <p className="font-serif italic text-stone-400 text-lg mb-8">I'd love to hear what you're working on.</p>
                    <a href="mailto:robin.w.bailey@gmail.com" className="inline-block bg-white text-stone-900 font-sans font-bold tracking-wide px-10 py-4 hover:bg-stone-100 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-300 rounded-2xl text-sm">
                      Get in Touch
                    </a>
                  </div>
                </div>
              </section>

              {/* ── FOOTER ── */}
              <footer className="flex flex-col md:flex-row justify-between items-start md:items-end pt-6 pb-4">
                <div className="mb-3 md:mb-0">
                  <span className="font-sans text-stone-500 text-sm font-medium block">Robin Bailey © 2025</span>
                  <span className="font-sans text-xs text-stone-400 flex items-center gap-1 mt-0.5">Made with care in Cornwall <Waves size={11} className="text-sky-400" /></span>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <span className="font-sans text-xs text-stone-400 font-medium">{localTime} in Cornwall, UK</span>
                  <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="group font-sans text-xs uppercase tracking-widest text-stone-800 font-bold hover:text-stone-500 flex items-center gap-2">
                    Back to Top <ArrowDown size={11} className="rotate-180 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>
              </footer>

            </div>
          </div>
        </div>
      </main>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;