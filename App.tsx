import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ProjectModal from './components/ProjectModal';
import {
  Project, ExperienceRole, Education as EducationType, Volunteering as VolunteeringType,
  Speaking as SpeakingType, Client, FilterTagDef, FiltersConfig, SiteConfig,
} from './types';
import {
  ArrowDown, ArrowUp, Linkedin, Github, Twitter, Mail,
  Star, LayoutTemplate, Cloud, Smartphone, Database, PenTool, Zap,
  BookOpen, Stethoscope, Landmark, Megaphone, Waves, ArrowUpRight, MapPin, X,
} from 'lucide-react';

// ── JSON content imports ─────────────────────────────────────────────────────

import siteConfig from './content/site.json';
import experienceData from './content/experience.json';
import educationData from './content/education.json';
import volunteeringData from './content/volunteering.json';
import speakingData from './content/speaking.json';
import clientsData from './content/clients.json';
import projectsData from './content/projects.json';
import filtersData from './content/filters.json';

const SITE = siteConfig as SiteConfig;
const EXPERIENCE = experienceData as ExperienceRole[];
const EDUCATION = educationData as EducationType[];
const VOLUNTEERING = volunteeringData as VolunteeringType[];
const SPEAKING = speakingData as SpeakingType[];
const CLIENTS = clientsData as Client[];
const PROJECTS = projectsData as Project[];
const FILTERS = filtersData as FiltersConfig;

// ── Lookup maps ──────────────────────────────────────────────────────────────

/** Resolve icon string keys from JSON to Lucide React components */
const ICON_MAP: Record<string, React.ReactNode> = {
  'layout-template': <LayoutTemplate size={11} />,
  'pen-tool': <PenTool size={11} />,
  'zap': <Zap size={11} />,
  'database': <Database size={11} />,
  'cloud': <Cloud size={11} />,
  'smartphone': <Smartphone size={11} />,
  'book-open': <BookOpen size={11} />,
  'stethoscope': <Stethoscope size={11} />,
  'landmark': <Landmark size={11} />,
  'megaphone': <Megaphone size={11} />,
};

/** Larger icons for the client carousel */
const ICON_MAP_LG: Record<string, React.ReactNode> = {
  'zap': <Zap size={14} />,
  'stethoscope': <Stethoscope size={14} />,
  'smartphone': <Smartphone size={14} />,
};

/** Derive Tailwind class sets from a colour name */
function colorClasses(color: string): { active: string; iconClass: string } {
  const map: Record<string, { active: string; iconClass: string }> = {
    blue:    { active: 'bg-blue-500 border-blue-500 text-white', iconClass: 'text-blue-500' },
    orange:  { active: 'bg-orange-500 border-orange-500 text-white', iconClass: 'text-orange-500' },
    violet:  { active: 'bg-violet-500 border-violet-500 text-white', iconClass: 'text-violet-500' },
    amber:   { active: 'bg-amber-400 border-amber-400 text-amber-950', iconClass: 'text-amber-500' },
    teal:    { active: 'bg-teal-500 border-teal-500 text-white', iconClass: 'text-teal-500' },
    indigo:  { active: 'bg-indigo-500 border-indigo-500 text-white', iconClass: 'text-indigo-500' },
    green:   { active: 'bg-green-500 border-green-500 text-white', iconClass: 'text-green-500' },
    red:     { active: 'bg-red-500 border-red-500 text-white', iconClass: 'text-red-500' },
    sky:     { active: 'bg-sky-500 border-sky-500 text-white', iconClass: 'text-sky-500' },
    yellow:  { active: 'bg-yellow-400 border-yellow-400 text-yellow-950', iconClass: 'text-yellow-500' },
  };
  return map[color] ?? { active: 'bg-stone-500 border-stone-500 text-white', iconClass: 'text-stone-500' };
}

/** Derive experience accent Tailwind classes from a colour name */
function accentClasses(color: string): { accentClasses: string; dotBorder: string; dotRing: string } {
  const map: Record<string, { accentClasses: string; dotBorder: string; dotRing: string }> = {
    emerald: { accentClasses: 'text-emerald-600 bg-emerald-50 border-emerald-100', dotBorder: 'border-emerald-500', dotRing: 'ring-emerald-500/10' },
    blue:    { accentClasses: 'text-blue-600 bg-blue-50 border-blue-100', dotBorder: 'border-blue-500', dotRing: 'ring-blue-500/10' },
    violet:  { accentClasses: 'text-violet-600 bg-violet-50 border-violet-100', dotBorder: 'border-violet-500', dotRing: 'ring-violet-500/10' },
    orange:  { accentClasses: 'text-orange-600 bg-orange-50 border-orange-100', dotBorder: 'border-orange-500', dotRing: 'ring-orange-500/10' },
    red:     { accentClasses: 'text-red-600 bg-red-50 border-red-100', dotBorder: 'border-red-500', dotRing: 'ring-red-500/10' },
    teal:    { accentClasses: 'text-teal-600 bg-teal-50 border-teal-100', dotBorder: 'border-teal-500', dotRing: 'ring-teal-500/10' },
    indigo:  { accentClasses: 'text-indigo-600 bg-indigo-50 border-indigo-100', dotBorder: 'border-indigo-500', dotRing: 'ring-indigo-500/10' },
    green:   { accentClasses: 'text-green-600 bg-green-50 border-green-100', dotBorder: 'border-green-500', dotRing: 'ring-green-500/10' },
    amber:   { accentClasses: 'text-amber-600 bg-amber-50 border-amber-100', dotBorder: 'border-amber-500', dotRing: 'ring-amber-500/10' },
    sky:     { accentClasses: 'text-sky-600 bg-sky-50 border-sky-100', dotBorder: 'border-sky-500', dotRing: 'ring-sky-500/10' },
    yellow:  { accentClasses: 'text-yellow-600 bg-yellow-50 border-yellow-100', dotBorder: 'border-yellow-500', dotRing: 'ring-yellow-500/10' },
  };
  return map[color] ?? { accentClasses: 'text-stone-600 bg-stone-50 border-stone-100', dotBorder: 'border-stone-500', dotRing: 'ring-stone-500/10' };
}

// ── Build filter config from JSON ────────────────────────────────────────────

type FilterTag = string;

interface FilterDef {
  label: string;
  active: string;
  iconClass: string;
  icon: React.ReactNode;
}

const FILTER_CONFIG: Record<string, FilterDef> = {};
for (const tag of FILTERS.tags) {
  const cc = colorClasses(tag.color);
  FILTER_CONFIG[tag.id] = {
    label: tag.label,
    active: cc.active,
    iconClass: cc.iconClass,
    icon: ICON_MAP[tag.icon] ?? <Star size={11} />,
  };
}

const ALL_FILTERS: string[] = FILTERS.tagOrder;

// ── Hooks ────────────────────────────────────────────────────────────────────

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.06 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

function useLocalTime() {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);
  return time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/London' });
}

// ── Filter helpers ───────────────────────────────────────────────────────────

function matchesTags(itemTags: string[], activeFilters: string[]): boolean {
  if (activeFilters.length === 0) return true;
  return activeFilters.some(f => itemTags.includes(f));
}

function getProjectTags(project: Project): string[] {
  const base: string[] = FILTERS.categoryTagMap[project.category] ?? [];
  const fromTags: string[] = [];
  const t = project.tags ?? [];
  if (t.some(x => /salesforce/i.test(x))) fromTags.push('salesforce');
  if (t.some(x => /mobile|ios|android/i.test(x))) fromTags.push('mobile');
  if (t.some(x => /data|analytics/i.test(x))) fromTags.push('data');
  if (t.some(x => /design|ux|ui/i.test(x))) fromTags.push('design');
  if (t.some(x => /product/i.test(x))) fromTags.push('product');
  const merged = Array.from(new Set([...base, ...fromTags]));
  return merged;
}

// ── Shared components ─────────────────────────────────────────────────────────

function MarqueeTrack({ children }: { children: React.ReactNode }) {
  return <div className="flex shrink-0 gap-10 animate-marquee">{children}</div>;
}

function ClientCarousel() {
  const items = () =>
    CLIENTS.map((c) => (
      <div key={c.name} className="flex items-center gap-3 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {c.logo
            ? <img src={c.logo} alt={c.name} className="w-5 h-5 object-contain opacity-50 mix-blend-multiply" />
            : <span className="text-stone-400">{c.icon ? ICON_MAP_LG[c.icon] ?? <Star size={14} /> : <Star size={14} />}</span>}
        </div>
        <div>
          <p className="font-sans text-[13px] font-medium text-stone-700 whitespace-nowrap leading-none">{c.name}</p>
          <p className="font-sans text-[12px] text-stone-400 whitespace-nowrap mt-0.5">{c.note}</p>
        </div>
      </div>
    ));

  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1 bg-stone-100" />
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.10em] text-stone-400">Trusted by</span>
        <div className="h-px flex-1 bg-stone-100" />
      </div>
      <div className="relative overflow-hidden mask-marquee">
        <div className="flex w-max gap-10">
          <MarqueeTrack>{items()}</MarqueeTrack>
          <MarqueeTrack>{items()}</MarqueeTrack>
        </div>
      </div>
    </div>
  );
}

/** Small uppercase section category label */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[11px] font-medium uppercase tracking-[0.10em] text-stone-400 mb-2 leading-none">
      {children}
    </p>
  );
}

/** Section heading with label above */
function SectionHeading({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <Label>{label}</Label>
      <h2 className="font-heading text-[24px] font-medium tracking-[-0.012em] text-stone-900 leading-none mt-1">{children}</h2>
    </div>
  );
}

/** Filter chip button */
function FilterChip({ tag, active, onClick }: { tag: string; active: boolean; onClick: () => void }) {
  const cfg = FILTER_CONFIG[tag];
  if (!cfg) return null;
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-150 select-none ${active
        ? cfg.active
        : 'bg-white border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-stone-50'
        }`}
    >
      <span className={`flex-shrink-0 transition-colors ${active ? 'opacity-70' : cfg.iconClass}`}>
        {cfg.icon}
      </span>
      {cfg.label}
    </button>
  );
}

/** Render an HTML string safely (for body fields that contain basic HTML) */
function HtmlText({ html, className }: { html: string; className?: string }) {
  return <p className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExpandedFor, setShowExpandedFor] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isDetailed, setIsDetailed] = useState(false);

  const experience = useScrollReveal();
  const volunteering = useScrollReveal();
  const speaking = useScrollReveal();
  const archive = useScrollReveal();
  const cta = useScrollReveal();
  const localTime = useLocalTime();

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Derived filtered data
  const filteredExperience = EXPERIENCE.filter(r => matchesTags(r.tags, activeFilters));
  const filteredVolunteering = VOLUNTEERING.filter(v => matchesTags(v.tags, activeFilters));
  const filteredSpeaking = SPEAKING.filter(s => matchesTags(s.tags, activeFilters));
  const filteredProjects = PROJECTS.filter(p => matchesTags(getProjectTags(p), activeFilters));

  const hasFilters = activeFilters.length > 0;

  return (
    <div className="min-h-screen bg-white relative">

      {/* Grain */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.016]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat', backgroundSize: '256px 256px',
        }}
      />

      <style>{`
        .reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .reveal-child > * { opacity: 0; transform: translateY(10px); transition: opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .reveal-child.visible > *:nth-child(1) { transition-delay: 0ms; opacity: 1; transform: translateY(0); }
        .reveal-child.visible > *:nth-child(2) { transition-delay: 80ms; opacity: 1; transform: translateY(0); }
        .reveal-child.visible > *:nth-child(3) { transition-delay: 160ms; opacity: 1; transform: translateY(0); }
        .reveal-child.visible > *:nth-child(4) { transition-delay: 240ms; opacity: 1; transform: translateY(0); }
        .reveal-child.visible > *:nth-child(5) { transition-delay: 320ms; opacity: 1; transform: translateY(0); }
        .archive-row { transition: background-color 0.12s ease; border-radius: 6px; }
        .archive-row:hover { background-color: #f9fafb; }
        .archive-row:hover .archive-arrow { transform: translateX(3px) translateY(-3px); opacity: 1; }
        .archive-arrow { opacity: 0; transition: transform 0.2s cubic-bezier(0.16,1,0.3,1), opacity 0.2s ease; }
        .filter-chip-enter { animation: chipIn 0.15s ease-out; }
        @keyframes chipIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        .highlight { position: relative; display: inline-block; padding: 0 4px; font-style: italic; font-weight: 500; z-index: 10; color: #44403c; }
        .highlight::after { content: ''; position: absolute; bottom: -2px; left: -2px; right: -2px; height: 75%; width: 110%; z-index: -1; }
        .highlight-purple::after { background: rgb(233 213 255 / 0.7); border-radius: 2px; }
        .highlight-yellow::after { background: rgb(254 249 195 / 0.7); border-radius: 2px; }
      `}</style>

      <Navbar />

      {/* ══════ HERO ══════ */}
      <section className="relative z-10 pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-14">

            {/* Left: Identity */}
            <div className="flex-1 min-w-0 max-w-[720px]">

              {/* Availability */}
              {SITE.availability.active && (
                <div className="inline-flex items-center gap-2 mb-10 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="font-sans text-[11px] font-medium text-emerald-700 uppercase tracking-[0.12em]">
                    {SITE.availability.label}
                  </span>
                </div>
              )}

              {/* Role — now the primary opening statement */}
              <p className="font-sans text-[32px] md:text-[42px] font-extrabold text-stone-900 tracking-[-0.03em] mb-6 leading-tight">
                {SITE.tagline}
              </p>

              {/* Bio */}
              <p className="font-sans text-[20px] md:text-[24px] font-semibold text-stone-900 leading-[1.6] tracking-[-0.02em] mb-0">
                {SITE.bio}
              </p>
            </div>

            {/* Right: Photo */}
            <div className="flex-shrink-0 mt-2">
              <div className="w-[88px] h-[88px] rounded-xl overflow-hidden bg-stone-100 ring-1 ring-stone-200">
                <img src={SITE.headshot} alt={SITE.name} className="w-full h-full object-cover" style={{ filter: 'grayscale(8%) contrast(0.97)' }} />
              </div>
            </div>
          </div>

          {/* ── Trusted by ── */}
          <div className="mt-14 pt-10 border-t border-stone-100">
            <ClientCarousel />
          </div>

          {/* ── Filter strip (Moved to main) ── */}
        </div>
      </section>

      {/* ══════ MAIN CONTENT ══════ */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pb-24 space-y-20">

        {/* ── Filter strip ── */}
        <div className="sticky top-[70px] z-40 bg-white/95 backdrop-blur-md pt-6 pb-6 border-b border-stone-200 mb-10 -mx-6 px-6 md:-mx-10 md:px-10 transition-all shadow-sm">
          <div className="flex items-start gap-6">

            {/* Left col: View toggle */}
            <div className="flex-shrink-0">
              <Label>View</Label>
              <div className="inline-flex items-center bg-stone-200 rounded-full p-1 gap-1 mt-2">
                <button
                  onClick={() => setIsDetailed(false)}
                  className={`px-5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 ${!isDetailed
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                    }`}
                >
                  Condensed
                </button>
                <button
                  onClick={() => setIsDetailed(true)}
                  className={`px-5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 ${isDetailed
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-500 hover:text-stone-800'
                    }`}
                >
                  Detailed
                </button>
              </div>
            </div>

            {/* Vertical divider */}
            <div className="w-px self-stretch bg-stone-200 flex-shrink-0" />

            {/* Right col: Filter chips */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <Label>Filter by skill or sector</Label>
                {hasFilters && (
                  <button
                    onClick={() => setActiveFilters([])}
                    className="inline-flex items-center gap-1 font-sans text-[10px] font-medium text-stone-400 hover:text-stone-700 transition-colors uppercase tracking-[0.08em] -mt-0.5"
                  >
                    <X size={10} /> Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {ALL_FILTERS.map(tag => (
                  <FilterChip
                    key={tag}
                    tag={tag}
                    active={activeFilters.includes(tag)}
                    onClick={() => toggleFilter(tag)}
                  />
                ))}
              </div>
              {hasFilters && (
                <p className="font-sans text-[11px] text-stone-400 mt-3">
                  Showing: {activeFilters.map(t => FILTER_CONFIG[t]?.label ?? t).join(', ')}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* ── Experience ── */}
        <section id="experience" ref={experience.ref} className={`reveal ${experience.isVisible ? 'visible' : ''}`}>

          <SectionHeading label="Work">Experience</SectionHeading>

          {filteredExperience.length === 0 ? (
            <p className="font-sans text-[15px] text-stone-400 italic">No experience entries match the selected filters.</p>
          ) : (
            <div className={`space-y-0 reveal-child ${experience.isVisible ? 'visible' : ''}`}>
              {filteredExperience.map((role, idx) => {
                const isLast = idx === filteredExperience.length - 1;
                const expandKey = role.extraProjects && role.extraProjects.length > 0 ? role.id : undefined;
                const isExpanded = showExpandedFor === expandKey;
                const accent = accentClasses(role.accentColor);
                return (
                  <div key={role.id} className={`border-l border-stone-200 pl-8 ${isLast ? 'pb-2' : isDetailed ? 'pb-14' : 'pb-8'} relative`}>
                    <div className={`absolute -left-[4px] top-[7px] w-2 h-2 rounded-full bg-white border-2 ${accent.dotBorder} ring-2 ${accent.dotRing}`} />
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-sans text-[16px] font-medium text-stone-900 leading-snug">{role.title}</h3>
                        <p className="font-sans text-[12px] font-medium text-stone-400 uppercase tracking-[0.08em] mt-2">{role.company}</p>
                      </div>
                      <span className={`font-sans text-[11px] font-medium px-3 py-1 rounded-full self-start whitespace-nowrap uppercase tracking-[0.06em] border ${accent.accentClasses}`}>{role.period}</span>
                    </div>
                    <p className={`font-sans text-[16px] text-stone-600 leading-[1.7] max-w-2xl ${isDetailed ? 'mb-0' : 'mb-0'}`}>{role.summary}</p>

                    {/* Condensed: project titles as a child list */}
                    {!isDetailed && (
                      <div className="mt-5 pl-4 border-l-2 border-stone-100 space-y-2">
                        {[...role.projects, ...(role.extraProjects ?? [])].map(p => (
                          <p key={p.title} className="font-sans text-[13px] text-stone-400 leading-snug">
                            {p.title}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Detailed: full project blocks, visually nested */}
                    {isDetailed && (
                      <div className="mt-8 pl-5 border-l-2 border-stone-100 space-y-7">
                        {role.projects.map(p => (
                          <div key={p.title}>
                            <h4 className="font-sans text-[15px] font-medium text-stone-900">{p.title}</h4>
                            <HtmlText html={p.body} className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2" />
                            {p.award && (
                              <p className="font-sans text-[12px] text-emerald-600 font-medium mt-3 flex items-center gap-1.5">
                                <span className="leading-none">★</span> {p.award}
                              </p>
                            )}
                          </div>
                        ))}

                        {expandKey && role.extraProjects && role.extraProjects.length > 0 && (
                          <>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="space-y-6">
                                {role.extraProjects.map(ep => (
                                  <div key={ep.title}>
                                    <h4 className="font-sans text-[15px] font-medium text-stone-900">{ep.title}</h4>
                                    <HtmlText html={ep.body} className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2" />
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => setShowExpandedFor(isExpanded ? null : expandKey)}
                              className="inline-flex items-center gap-1.5 font-sans text-[12px] font-medium uppercase tracking-[0.08em] text-stone-400 hover:text-stone-700 px-4 py-2 rounded-full transition-colors border border-stone-200 hover:border-stone-300 bg-white"
                            >
                              {isExpanded ? (<>Less <ArrowUp size={11} /></>) : (<>More <ArrowDown size={11} /></>)}
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Education ── */}
        <section id="education">
          <SectionHeading label="Background">Education</SectionHeading>
          <div className="flex flex-col sm:flex-row gap-10">
            {EDUCATION.map(edu => (
              <div key={edu.degree} className="flex-1">
                <div className="flex items-baseline gap-3 flex-wrap mb-1">
                  <h3 className="font-sans text-[16px] font-medium text-stone-900">{edu.degree}</h3>
                  <span className="font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-stone-400 bg-stone-50 border border-stone-100 px-2 py-0.5 rounded whitespace-nowrap">{edu.classification}</span>
                </div>
                <p className="font-sans text-[12px] text-stone-400">{edu.institution}</p>
                {edu.awards.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {edu.awards.map(award => (
                      <p key={award} className="font-sans text-[13px] text-stone-500 flex items-center gap-2">
                        <span className="text-amber-400 text-[11px]">★</span> {award}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── Volunteering & Speaking ── */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16">

          {/* Volunteering */}
          <section id="advisory" ref={volunteering.ref} className={`reveal ${volunteering.isVisible ? 'visible' : ''}`}>
            <SectionHeading label="Community">Volunteering & Advisory</SectionHeading>
            {filteredVolunteering.length === 0 ? (
              <p className="font-sans text-[15px] text-stone-400 italic">None match the selected filters.</p>
            ) : (
              <div className="space-y-7">
                {filteredVolunteering.map((v, idx) => (
                  <div key={v.title} className={`group flex justify-between items-start gap-4 ${idx < filteredVolunteering.length - 1 ? 'border-b border-stone-100 pb-7' : ''}`}>
                    <div>
                      <h4 className="font-sans text-[15px] font-medium text-stone-900 group-hover:text-emerald-700 transition-colors">{v.title}</h4>
                      <p className="font-sans text-[12px] text-stone-400 mt-1">{v.org}</p>
                      <p className="font-sans text-[11px] font-medium uppercase tracking-[0.08em] text-stone-400 mt-2">{v.period}</p>
                      {v.body && <p className="font-sans text-[15px] text-stone-500 leading-[1.75] mt-2">{v.body}</p>}
                    </div>
                    {v.logo && <img src={v.logo} alt={v.org} className="w-8 h-8 object-contain opacity-40 mix-blend-multiply flex-shrink-0 mt-0.5" />}
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Speaking */}
          <section id="speaking" ref={speaking.ref} className={`reveal ${speaking.isVisible ? 'visible' : ''}`}>
            <SectionHeading label="Public">Speaking</SectionHeading>
            {filteredSpeaking.length === 0 ? (
              <p className="font-sans text-[15px] text-stone-400 italic">None match the selected filters.</p>
            ) : (
              <div className="space-y-7">
                {filteredSpeaking.map((s, idx) => (
                  <div key={s.title} className={`group ${idx < filteredSpeaking.length - 1 ? 'border-b border-stone-100 pb-7' : ''} flex gap-5`}>
                    <div className="flex-shrink-0 w-9 pt-0.5">
                      <span className="font-sans text-[13px] font-medium text-stone-400 group-hover:text-stone-600 transition-colors">{s.year}</span>
                    </div>
                    <div>
                      <h4 className="font-sans text-[15px] font-medium text-stone-900">{s.title}</h4>
                      <p className="font-sans text-[12px] text-stone-400 italic mt-1">{s.subtitle}</p>
                      <div className="mt-3 space-y-2">
                        {s.entries.map(e => (
                          <p key={e.text} className="font-sans text-[15px] text-stone-500">
                            {e.type && <span className="font-medium text-stone-700">{e.type}</span>}
                            {e.type ? ` — ${e.text}` : e.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

        </div>

        {/* ── Project Archive ── */}
        <section ref={archive.ref} className={`reveal ${archive.isVisible ? 'visible' : ''}`}>
          <SectionHeading label="All work">Project Archive</SectionHeading>
          {filteredProjects.length === 0 ? (
            <p className="font-sans text-[15px] text-stone-400 italic">No projects match the selected filters.</p>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200">
                  <th className="py-3.5 w-5" />
                  <th className="py-3.5 pr-6 font-sans text-[11px] uppercase tracking-[0.12em] font-medium text-stone-400 w-16">Year</th>
                  <th className="py-3.5 pr-6 font-sans text-[11px] uppercase tracking-[0.12em] font-medium text-stone-400">Project</th>
                  <th className="py-3.5 pr-6 font-sans text-[11px] uppercase tracking-[0.12em] font-medium text-stone-400 hidden md:table-cell">Category</th>
                  <th className="py-3.5 font-sans text-[11px] uppercase tracking-[0.12em] font-medium text-stone-400 hidden lg:table-cell">Client</th>
                  <th className="py-3.5 w-5" />
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-stone-100 archive-row cursor-pointer" onClick={() => handleProjectClick(project)}>
                    <td className="py-4 pl-1">{project.isSelected && <Star size={11} className="text-stone-400 fill-current" />}</td>
                    <td className="py-4 pr-6 font-sans text-[13px] text-stone-400 font-medium">{project.year}</td>
                    <td className="py-4 pr-6">
                      <span className="font-sans text-[15px] text-stone-900 font-medium block">{project.title}</span>
                      <span className="font-sans text-[12px] text-stone-400 md:hidden mt-0.5 block">{project.category}</span>
                    </td>
                    <td className="py-4 pr-6 hidden md:table-cell">
                      <span className="font-sans text-[12px] font-medium text-stone-500 bg-stone-50 border border-stone-100 px-2.5 py-1 rounded">{project.category}</span>
                    </td>
                    <td className="py-4 font-sans text-[13px] text-stone-500 hidden lg:table-cell">{project.client || '—'}</td>
                    <td className="py-4 text-stone-400"><ArrowUpRight size={13} className="archive-arrow" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* ── CTA ── */}
        <section ref={cta.ref} className={`reveal ${cta.isVisible ? 'visible' : ''}`} id="contact">
          <div className="bg-stone-900 rounded-3xl overflow-hidden">
            <div className="px-12 py-24 text-center">
              <h2 className="font-heading text-[36px] md:text-[46px] font-medium text-white mb-4 tracking-[-0.022em] leading-tight">
                {SITE.cta.heading}
              </h2>
              <p className="font-sans italic text-stone-500 text-[17px] mb-12">{SITE.cta.subtext}</p>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-block bg-white text-stone-900 font-sans font-medium tracking-[0.06em] uppercase px-12 py-4 hover:bg-stone-100 transition-all rounded-full text-[13px]"
              >
                {SITE.cta.buttonLabel}
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 pb-4 border-t border-stone-100">
          <div>
            <span className="font-sans text-[13px] text-stone-500 block">{SITE.name} © {SITE.copyrightYear}</span>
            <span className="font-sans text-[12px] text-stone-400 flex items-center gap-1 mt-1">{SITE.locationTagline} <Waves size={11} className="text-sky-400" /></span>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1.5 mt-4 md:mt-0">
            <span className="font-sans text-[12px] text-stone-400">{localTime} in {SITE.location}</span>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="group font-sans text-[11px] uppercase tracking-[0.12em] text-stone-500 font-medium hover:text-stone-800 flex items-center gap-2 transition-colors"
            >
              Back to Top <ArrowDown size={11} className="rotate-180 group-hover:-translate-y-1 transition-transform" />
            </a>
          </div>
        </footer>

      </main>

      <ProjectModal project={selectedProject} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;