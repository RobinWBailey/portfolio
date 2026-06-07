import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ProjectModal from './components/ProjectModal';
import { PROJECTS } from './constants';
import { Project } from './types';
import {
  ArrowDown, ArrowUp, Linkedin, Github, Twitter, Mail,
  Star, LayoutTemplate, Cloud, Smartphone, Database, PenTool, Zap,
  BookOpen, Stethoscope, Landmark, Megaphone, Waves, ArrowUpRight, MapPin, X,
} from 'lucide-react';

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

// ── Filter system ──────────────────────────────────────────────────────────────

type FilterTag =
  | 'product' | 'design' | 'engineering' | 'data'
  | 'salesforce' | 'mobile' | 'education' | 'health'
  | 'government' | 'adtech';

interface FilterDef {
  label: string;
  active: string;     // Tailwind classes for filled/active state
  iconClass: string;  // Icon colour when inactive
  icon: React.ReactNode;
}

const FILTER_CONFIG: Record<FilterTag, FilterDef> = {
  product: { label: 'Product', active: 'bg-blue-500 border-blue-500 text-white', iconClass: 'text-blue-500', icon: <LayoutTemplate size={11} /> },
  design: { label: 'Design', active: 'bg-orange-500 border-orange-500 text-white', iconClass: 'text-orange-500', icon: <PenTool size={11} /> },
  engineering: { label: 'Engineering', active: 'bg-violet-500 border-violet-500 text-white', iconClass: 'text-violet-500', icon: <Zap size={11} /> },
  data: { label: 'Analytics', active: 'bg-amber-400 border-amber-400 text-amber-950', iconClass: 'text-amber-500', icon: <Database size={11} /> },
  salesforce: { label: 'Salesforce', active: 'bg-teal-500 border-teal-500 text-white', iconClass: 'text-teal-500', icon: <Cloud size={11} /> },
  mobile: { label: 'Mobile', active: 'bg-indigo-500 border-indigo-500 text-white', iconClass: 'text-indigo-500', icon: <Smartphone size={11} /> },
  education: { label: 'Education', active: 'bg-green-500 border-green-500 text-white', iconClass: 'text-green-500', icon: <BookOpen size={11} /> },
  health: { label: 'Health', active: 'bg-red-500 border-red-500 text-white', iconClass: 'text-red-500', icon: <Stethoscope size={11} /> },
  government: { label: 'Government', active: 'bg-sky-500 border-sky-500 text-white', iconClass: 'text-sky-500', icon: <Landmark size={11} /> },
  adtech: { label: 'AdTech', active: 'bg-yellow-400 border-yellow-400 text-yellow-950', iconClass: 'text-yellow-500', icon: <Megaphone size={11} /> },
};

const ALL_FILTERS: FilterTag[] = [
  'product', 'design', 'engineering', 'data', 'salesforce', 'mobile',
  'education', 'health', 'government', 'adtech',
];

function matchesTags(itemTags: FilterTag[], activeFilters: FilterTag[]): boolean {
  if (activeFilters.length === 0) return true;
  return activeFilters.some(f => itemTags.includes(f));
}

// ── Tagged content data ───────────────────────────────────────────────────────

const EXPERIENCE: {
  id: string;
  title: string;
  company: string;
  period: string;
  accentClasses: string; // badge color
  dotBorder: string;
  dotRing: string;
  summary: string;
  tags: FilterTag[];
  projects: { title: string; body: React.ReactNode; award?: string }[];
  expandKey?: string;
  extraProjects?: { title: string; body: string }[];
}[] = [
    {
      id: 'learning-analytics',
      title: 'Product & Technical Lead: Learning Analytics & Student Support',
      company: 'Plymouth University',
      period: '2025 — Present',
      accentClasses: 'text-emerald-600 bg-emerald-50 border-emerald-100',
      dotBorder: 'border-emerald-500',
      dotRing: 'ring-emerald-500/10',
      summary: 'Leading the strategic product development and technical implementation of a wide £\u00a0programme of transformational features, enabling data-informed student success initiatives and experience platforms for student support, retention, and operational efficiency.',
      tags: ['product', 'data', 'salesforce', 'education'],
      projects: [
        {
          title: 'Learning Analytics for Early Intervention',
          body: (
            <p className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2">
              Led the design and development of a data-informed learning analytics platform to identify at-risk students early in the semester. Implemented an organisational-first student ambassador led call centre to enable peer-led support and signposting. Also designed and introduced the first version of a platform-wide <span className="relative inline-block px-1 italic font-medium z-10 text-stone-700">Insights<svg className="absolute -bottom-1 -left-1 -right-1 h-3/4 w-[110%] -z-10 text-purple-200/70" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,50 Q50,40 100,50" stroke="currentColor" strokeWidth="80" fill="none" /></svg></span> service and design to enable proactive calls to action.
            </p>
          ),
          award: 'Vice-Chancellor\'s Award for Supporting a Great Student Experience \'Highly Commended\'',
        },
        {
          title: 'Student Support Enquiry & Case Management',
          body: <p className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2">Leading the design and implementation of a fully integrated student support enquiry & case management system across the entire institution.</p>,
        },
      ],
    },
    {
      id: 'digital-ed',
      title: 'Digital Education Product Manager',
      company: 'Academic Development, Plymouth University',
      period: '2019 — 2025',
      accentClasses: 'text-blue-600 bg-blue-50 border-blue-100',
      dotBorder: 'border-blue-500',
      dotRing: 'ring-blue-500/10',
      summary: 'Building a first class student success platform for the Faculty of Medicine and Dentistry. Member of multiple faculty committees.',
      tags: ['product', 'mobile', 'salesforce', 'education', 'health'],
      projects: [
        {
          title: 'PULSE Student Success Platform',
          body: <p className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2">Led the design and implementation of a fully integrated Salesforce assessment platform for Medicine and Dentistry.</p>,
        },
        {
          title: 'Content Adaptive Progress Testing',
          body: <p className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2">Designed and implemented an industry-first feedback system to enable longitudinal personalised learning feedback to medical students against the GMC topic map. Coinciding and enabling dynamic assessment of students based on past assessment performance.</p>,
        },
        {
          title: 'On-Clinic Dental Experience Assessment',
          body: (
            <p className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2">
              Digitised the assessment of clinical dental experience, replacing paper logs and enabling real-time progression tracking. Providing process assurance for patient safety and enabling students to work towards their longitudinal GDC requirements. Also enabled capacity management to ensure patient availability for student needs and scheduling. Used across <span className="relative inline-block px-1 italic font-medium z-10 text-stone-700">TBA clinical sites<svg className="absolute -bottom-1 -left-1 -right-1 h-3/4 w-[110%] -z-10 text-yellow-200/70" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,50 Q50,40 100,50" stroke="currentColor" strokeWidth="80" fill="none" /></svg></span> across the south-west of England.
            </p>
          ),
        },
      ],
      expandKey: 'digital-ed',
      extraProjects: [
        { title: 'Academic Benchmarking', body: 'Developed a comparative analytics tool allowing faculty to benchmark cohort performance against national standards.' },
        { title: 'Wave Digital Assistant', body: 'AI chatbot for staff digital education queries in Moodle & student careers advice in the university app.' },
        { title: 'Dynamic Clinical Assessments', body: 'More details coming soon.' },
      ],
    },
    {
      id: 'iotec',
      title: 'Product Architect; Senior UX Designer',
      company: 'iotec Global',
      period: '2016 — 2018',
      accentClasses: 'text-violet-600 bg-violet-50 border-violet-100',
      dotBorder: 'border-violet-500',
      dotRing: 'ring-violet-500/10',
      summary: 'Leading UX and product design, building campaign management and reporting tools for a cutting-edge AdTech platform.',
      tags: ['design', 'product', 'adtech'],
      projects: [
        {
          title: 'iotec Horizon Platform Interface',
          body: <p className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2">Led the design and implementation of a new campaign management and reporting web interface, enabling advanced configuration, setup, and performance monitoring for internal teams and professional clients, including self-service capabilities for high-value accounts. The platform was fully internationalised for major European markets.</p>,
        },
        {
          title: 'iotec Platform RESTful API',
          body: <p className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2">Led the development of a RESTful API for the iotec Horizon Platform, enabling seamless integration with external systems and applications as well as a unified platform for developing new products and features internally.</p>,
        },
      ],
    },
    {
      id: 'freelance',
      title: 'Freelance Product Design & Development',
      company: 'Multiple Clients',
      period: '2010 — Present',
      accentClasses: 'text-orange-600 bg-orange-50 border-orange-100',
      dotBorder: 'border-orange-500',
      dotRing: 'ring-orange-500/10',
      summary: 'Designing, building, and implementing 0 → 1 products across multiple industries.',
      tags: ['design', 'mobile', 'product', 'government', 'health'],
      projects: [
        {
          title: 'Local Government Digital Healthcare Initiative',
          body: <p className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2">More details coming soon.</p>,
        },
        {
          title: 'Bento for iOS & Android',
          body: <p className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2">A "Do Less" to-do list application focused on mindful productivity.</p>,
          award: 'Featured by Apple as a "New & Noteworthy" and a Top 5 Paid Productivity App in 30 different countries',
        },
        {
          title: 'Investigate Invertebrates',
          body: <p className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2">Designed an interactive companion app for Paignton Zoo that increased visitor dwell time through gamification.</p>,
        },
      ],
      expandKey: 'freelance',
      extraProjects: [
        { title: 'BearForms', body: 'Designed and developed an offline-first data capture application for iOS and Android.' },
      ],
    },
  ];

const VOLUNTEERING: {
  title: string;
  org: string;
  period: string;
  body?: string;
  logo?: string;
  tags: FilterTag[];
}[] = [
    { title: 'Assessment Alliance Security Group', org: 'Medical Schools Council UK', period: '2025 — Present', body: 'Advising on best practices for digital assessment security across UK medical schools.', logo: '/msc_logo.png', tags: ['health', 'education'] },
    { title: 'Learning Analytics Steering Group', org: 'HESPA', period: '2025 — Present', logo: '/hespa_logo.png', tags: ['data', 'education'] },
    { title: 'Education', org: 'Wild Planet Trust', period: '2004 — 2023', body: 'Supporting conservation education for public audiences and school groups.', logo: '/wildplanettrust_logo.png', tags: ['education'] },
    { title: "Mayor's Youth Council Representative", org: 'Town Council', period: '2006 — 2009', body: 'Representing young people in local government decision making.', tags: ['government'] },
  ];

const SPEAKING: {
  year: string;
  title: string;
  subtitle: string;
  entries: { type?: string; text: string }[];
  tags: FilterTag[];
}[] = [
    {
      year: '2024', title: 'EBMA Annual European Conference', subtitle: 'Assessment in Medical Education',
      entries: [
        { type: 'Symposium', text: 'Adaptive Testing: Current & Future Perspectives' },
        { type: 'Presentation', text: 'Content Adaptive Progress Tests at Peninsula Medical School' },
      ],
      tags: ['health', 'education'],
    },
    {
      year: '2024', title: 'Salesforce UK/EMEA Education User Group', subtitle: 'Student Success Platform for Medicine',
      entries: [{ text: 'Showcasing our bespoke Salesforce Student Success Platform for the Faculty of Medicine.' }],
      tags: ['salesforce', 'education'],
    },
    {
      year: '2022', title: 'Peninsula Medical School Conference', subtitle: 'Visualising Adaptive Progress Testing',
      entries: [{ text: 'Data visualisation techniques for complex longitudinal assessment data.' }],
      tags: ['health', 'education', 'data'],
    },
    {
      year: '2012', title: 'Learning Without Frontiers', subtitle: 'London',
      entries: [{ text: 'The future of mobile learning and digital engagement in education.' }],
      tags: ['education', 'mobile'],
    },
  ];

// Map project categories to filter tags
const CATEGORY_TAG_MAP: Record<string, FilterTag[]> = {
  'Education': ['education'],
  'AdTech': ['adtech'],
  'Mobile App': ['mobile'],
  'Mobile': ['mobile'],
  'Concept': ['design'],
  'Branding': ['design'],
  'Data': ['data'],
  'AI': ['engineering'],
  'Web': ['engineering'],
  'Government': ['government'],
};

function getProjectTags(project: Project): FilterTag[] {
  const base: FilterTag[] = CATEGORY_TAG_MAP[project.category] ?? [];
  const fromTags: FilterTag[] = [];
  const t = project.tags ?? [];
  if (t.some(x => /salesforce/i.test(x))) fromTags.push('salesforce');
  if (t.some(x => /mobile|ios|android/i.test(x))) fromTags.push('mobile');
  if (t.some(x => /data|analytics/i.test(x))) fromTags.push('data');
  if (t.some(x => /design|ux|ui/i.test(x))) fromTags.push('design');
  if (t.some(x => /product/i.test(x))) fromTags.push('product');
  const merged = Array.from(new Set([...base, ...fromTags])) as FilterTag[];
  return merged;
}

// ── Shared components ─────────────────────────────────────────────────────────

function MarqueeTrack({ children }: { children: React.ReactNode }) {
  return <div className="flex shrink-0 gap-10 animate-marquee">{children}</div>;
}

const CLIENTS: { name: string; note: string; logo?: string; icon?: React.ReactNode }[] = [
  { name: 'Plymouth University', note: '1,200+ students daily', logo: '/rectangle_logo.png' },
  { name: 'iotec Global', note: 'Scaled to 200+ clients', icon: <Zap size={14} /> },
  { name: 'Medical Schools Council', note: 'Security advisory', logo: '/msc_logo.png' },
  { name: 'Peninsula Medical School', note: 'Adaptive testing first', icon: <Stethoscope size={14} /> },
  { name: 'Peninsula Dental School', note: 'Digital clinical assessment', icon: <Stethoscope size={14} /> },
  { name: 'HESPA', note: 'Analytics steering group', logo: '/hespa_logo.png' },
  { name: 'Wild Planet Trust', note: 'Conservation education', logo: '/wildplanettrust_logo.png' },
  { name: 'Apple Featured', note: 'Top 5 in 30 countries', icon: <Smartphone size={14} /> },
];

function ClientCarousel() {
  const items = () =>
    CLIENTS.map((c) => (
      <div key={c.name} className="flex items-center gap-3 shrink-0">
        <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center overflow-hidden flex-shrink-0">
          {c.logo
            ? <img src={c.logo} alt={c.name} className="w-5 h-5 object-contain opacity-50 mix-blend-multiply" />
            : <span className="text-stone-400">{c.icon}</span>}
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
function FilterChip({ tag, active, onClick }: { tag: FilterTag; active: boolean; onClick: () => void }) {
  const cfg = FILTER_CONFIG[tag];
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

// ── App ───────────────────────────────────────────────────────────────────────

function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showExpandedFor, setShowExpandedFor] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<FilterTag[]>([]);
  const [isDetailed, setIsDetailed] = useState(false);

  const experience = useScrollReveal();
  const volunteering = useScrollReveal();
  const speaking = useScrollReveal();
  const archive = useScrollReveal();
  const cta = useScrollReveal();
  const localTime = useLocalTime();

  const toggleFilter = (tag: FilterTag) => {
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
      `}</style>

      <Navbar />

      {/* ══════ HERO ══════ */}
      <section className="relative z-10 pt-28 pb-16">
        <div className="max-w-5xl mx-auto px-6 md:px-10">

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-14">

            {/* Left: Identity */}
            <div className="flex-1 min-w-0 max-w-[720px]">

              {/* Availability */}
              <div className="inline-flex items-center gap-2 mb-10 bg-emerald-50 border border-emerald-100 rounded-full px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-sans text-[11px] font-medium text-emerald-700 uppercase tracking-[0.12em]">
                  Available for opportunities
                </span>
              </div>

              {/* Role — now the primary opening statement */}
              <p className="font-sans text-[32px] md:text-[42px] font-extrabold text-stone-900 tracking-[-0.03em] mb-6 leading-tight">
                Product Leader · Designer · Engineer
              </p>

              {/* Bio */}
              <p className="font-sans text-[20px] md:text-[24px] font-semibold text-stone-900 leading-[1.6] tracking-[-0.02em] mb-0">
                I help turn complex business challenges into clear, user-focused product solutions — designing, architecting, and implementing technical systems that deliver real impact.
              </p>
            </div>

            {/* Right: Photo */}
            <div className="flex-shrink-0 mt-2">
              <div className="w-[88px] h-[88px] rounded-xl overflow-hidden bg-stone-100 ring-1 ring-stone-200">
                <img src="/headshot.jpg" alt="Robin Bailey" className="w-full h-full object-cover" style={{ filter: 'grayscale(8%) contrast(0.97)' }} />
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
                  Showing: {activeFilters.map(t => FILTER_CONFIG[t].label).join(', ')}
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
                const isExpanded = showExpandedFor === role.expandKey;
                return (
                  <div key={role.id} className={`border-l border-stone-200 pl-8 ${isLast ? 'pb-2' : isDetailed ? 'pb-14' : 'pb-8'} relative`}>
                    <div className={`absolute -left-[4px] top-[7px] w-2 h-2 rounded-full bg-white border-2 ${role.dotBorder} ring-2 ${role.dotRing}`} />
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="font-sans text-[16px] font-medium text-stone-900 leading-snug">{role.title}</h3>
                        <p className="font-sans text-[12px] font-medium text-stone-400 uppercase tracking-[0.08em] mt-2">{role.company}</p>
                      </div>
                      <span className={`font-sans text-[11px] font-medium px-3 py-1 rounded-full self-start whitespace-nowrap uppercase tracking-[0.06em] border ${role.accentClasses}`}>{role.period}</span>
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
                            {p.body}
                            {p.award && (
                              <p className="font-sans text-[12px] text-emerald-600 font-medium mt-3 flex items-center gap-1.5">
                                <span className="leading-none">★</span> {p.award}
                              </p>
                            )}
                          </div>
                        ))}

                        {role.extraProjects && (
                          <>
                            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                              <div className="space-y-6">
                                {role.extraProjects.map(ep => (
                                  <div key={ep.title}>
                                    <h4 className="font-sans text-[15px] font-medium text-stone-900">{ep.title}</h4>
                                    <p className="font-sans text-[16px] text-stone-500 leading-[1.7] mt-2">{ep.body}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <button
                              onClick={() => setShowExpandedFor(isExpanded ? null : role.expandKey!)}
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
            <div className="flex-1">
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <h3 className="font-sans text-[16px] font-medium text-stone-900">MSc Business &amp; Management</h3>
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-stone-400 bg-stone-50 border border-stone-100 px-2 py-0.5 rounded whitespace-nowrap">Distinction</span>
              </div>
              <p className="font-sans text-[12px] text-stone-400">Plymouth University</p>
              <div className="mt-3 space-y-1.5">
                <p className="font-sans text-[13px] text-stone-500 flex items-center gap-2"><span className="text-amber-400 text-[11px]">★</span> Dean's List Award</p>
                <p className="font-sans text-[13px] text-stone-500 flex items-center gap-2"><span className="text-amber-400 text-[11px]">★</span> Professorate Scholarship</p>
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <h3 className="font-sans text-[16px] font-medium text-stone-900">BSc Computer Science</h3>
                <span className="font-sans text-[10px] font-medium uppercase tracking-[0.08em] text-stone-400 bg-stone-50 border border-stone-100 px-2 py-0.5 rounded whitespace-nowrap">First</span>
              </div>
              <p className="font-sans text-[12px] text-stone-400">Plymouth University</p>
              <div className="mt-3">
                <p className="font-sans text-[13px] text-stone-500 flex items-center gap-2"><span className="text-amber-400 text-[11px]">★</span> Dean's List (2010–2012)</p>
              </div>
            </div>
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
                Let's build something meaningful.
              </h2>
              <p className="font-sans italic text-stone-500 text-[17px] mb-12">I'd love to hear what you're working on.</p>
              <a
                href="mailto:robin.w.bailey@gmail.com"
                className="inline-block bg-white text-stone-900 font-sans font-medium tracking-[0.06em] uppercase px-12 py-4 hover:bg-stone-100 transition-all rounded-full text-[13px]"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="flex flex-col md:flex-row justify-between items-start md:items-center pt-6 pb-4 border-t border-stone-100">
          <div>
            <span className="font-sans text-[13px] text-stone-500 block">Robin Bailey © 2025</span>
            <span className="font-sans text-[12px] text-stone-400 flex items-center gap-1 mt-1">Made with care in Cornwall <Waves size={11} className="text-sky-400" /></span>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1.5 mt-4 md:mt-0">
            <span className="font-sans text-[12px] text-stone-400">{localTime} in Cornwall, UK</span>
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