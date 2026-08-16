// ── Project (archive table + modal) ──────────────────────────────────────────



// ── Site config ──────────────────────────────────────────────────────────────

export interface SocialLink {
  label: string;
  url: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  logo: string;
  headshot: string;
  tagline: string;
  bio: string;
  availability: { active: boolean; label: string };
  email: string;
  location: string;
  locationTagline: string;
  copyrightYear: string;
  cta: { heading: string; subtext: string; buttonLabel: string };
  social: SocialLink[];
}

// ── Experience ───────────────────────────────────────────────────────────────

export interface ExperienceProject {
  title: string;
  body: string;
  award?: string;
  client?: string;
  role?: string;
  category?: string;
  year?: string;
  tags?: string[];
  images?: string[];
  link?: string;
  summary?: string;
  isSelected?: boolean;
}

export interface ExperienceRole {
  id: string;
  title: string;
  company: string;
  period: string;
  accentColor: string;
  summary: string;
  tags: string[];
  logo?: string;
  projects: ExperienceProject[];
  extraProjects?: ExperienceProject[];
}

// ── Education ────────────────────────────────────────────────────────────────

export interface Education {
  degree: string;
  classification: string;
  institution: string;
  awards: string[];
}

// ── Volunteering ─────────────────────────────────────────────────────────────

export interface Volunteering {
  title: string;
  org: string;
  period: string;
  body?: string;
  logo?: string;
  tags: string[];
}

// ── Speaking ─────────────────────────────────────────────────────────────────

export interface SpeakingEntry {
  type?: string;
  text: string;
}

export interface Speaking {
  year: string;
  title: string;
  subtitle: string;
  entries: SpeakingEntry[];
  tags: string[];
}

// ── Clients ──────────────────────────────────────────────────────────────────

export interface Client {
  name: string;
  note: string;
  logo?: string;
  icon?: string;
  highlight?: { color: string; icon: string };
}

// ── Filters ──────────────────────────────────────────────────────────────────

export interface FilterTagDef {
  id: string;
  label: string;
  color: string;
  icon: string;
}

export interface FiltersConfig {
  tags: FilterTagDef[];
  tagOrder: string[];
  categoryTagMap: Record<string, string[]>;
}

// ── Nav (kept for compatibility) ─────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}