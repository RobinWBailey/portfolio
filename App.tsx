import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  MapPin,
  Plus,
  Sparkles,
} from 'lucide-react';
import {
  Client,
  Education as EducationType,
  ExperienceProject,
  ExperienceRole,
  SiteConfig,
  Speaking as SpeakingType,
  Volunteering as VolunteeringType,
} from './types';

import clientsData from './content/clients.json';
import educationData from './content/education.json';
import experienceData from './content/experience.json';
import siteConfig from './content/site.json';
import speakingData from './content/speaking.json';
import volunteeringData from './content/volunteering.json';

const SITE = siteConfig as SiteConfig;
const EXPERIENCE = experienceData as ExperienceRole[];
const EDUCATION = educationData as EducationType[];
const VOLUNTEERING = volunteeringData as VolunteeringType[];
const SPEAKING = speakingData as SpeakingType[];
const CLIENTS = clientsData as Client[];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function yearValue(year?: string) {
  const match = year?.match(/\d{4}/);
  return match ? Number(match[0]) : 0;
}

function SectionHeading({ eyebrow, title, detail }: { eyebrow: string; title: string; detail?: string }) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {detail && <p className="section-heading__detail">{detail}</p>}
    </header>
  );
}

function HtmlText({ html }: { html: string }) {
  return <p dangerouslySetInnerHTML={{ __html: html }} />;
}

interface IndexedProject extends ExperienceProject {
  key: string;
  roleId: string;
  roleCompany: string;
}

function ProjectDisclosure({
  project,
  open,
  onToggle,
}: {
  key?: React.Key;
  project: IndexedProject;
  open: boolean;
  onToggle: () => void;
}) {
  const detailId = `project-detail-${project.key}`;
  const realImages = (project.images ?? []).filter((image) => !image.includes('placehold.co'));
  const hasBodyCopy = project.body.trim().toUpperCase() !== 'TBA';
  const displayAward = project.award?.trim().toUpperCase() !== 'TBA' ? project.award : undefined;
  const displayTags = (project.tags ?? []).filter((tag) => tag.trim().toUpperCase() !== 'TBA');

  return (
    <article id={`project-${project.key}`} className={`project-row${open ? ' is-open' : ''}`}>
      <button type="button" className="project-row__trigger" onClick={onToggle} aria-expanded={open} aria-controls={detailId}>
        <span className="project-row__action" aria-hidden="true">
          <Plus size={16} />
        </span>
        <span className="project-row__title">
          <strong>{project.title}</strong>
          {project.summary?.trim().toUpperCase() !== 'TBA' && <span>{project.summary}</span>}
        </span>
        <span className="project-row__meta">
          <span>{project.year ?? '—'}</span>
        </span>
      </button>

      <div id={detailId} className="project-detail" aria-hidden={!open}>
        <div className="project-detail__inner">
          <div className="project-detail__aside">
            {project.client && <p><span>Client</span>{project.client}</p>}
            {project.role && <p><span>Role</span>{project.role}</p>}
            {displayTags.length > 0 && (
              <div className="tag-list" aria-label="Project skills">
                {displayTags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            )}
          </div>
          <div className="project-detail__body">
            {hasBodyCopy && <HtmlText html={project.body} />}
            {displayAward && (
              <p className="project-award"><Sparkles size={15} />{displayAward}</p>
            )}
            {realImages.length > 0 && (
              <div className="project-images">
                {realImages.map((image, index) => (
                  <img key={image} src={image} alt={`${project.title}, view ${index + 1}`} />
                ))}
              </div>
            )}
            {project.link && project.link !== '#' && (
              <a className="text-link" href={project.link} target="_blank" rel="noreferrer">
                Visit project <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function App() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());

  const indexedProjects = useMemo<IndexedProject[]>(() => (
    EXPERIENCE.flatMap((role) => (
      [...role.projects, ...(role.extraProjects ?? [])].map((project) => ({
        ...project,
        key: slugify(`${role.id}-${project.title}`),
        roleId: role.id,
        roleCompany: role.company,
      }))
    ))
  ), []);

  const projectLookup = useMemo(() => new Map(indexedProjects.map((project) => [`${project.roleId}--${project.title}`, project])), [indexedProjects]);

  const revealProject = (project: IndexedProject, updateHash = true) => {
    setExpandedProjects((current) => new Set(current).add(project.key));
    if (updateHash) window.history.replaceState(null, '', `#project-${project.key}`);

    window.setTimeout(() => {
      const target = document.getElementById(`project-${project.key}`);
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      target?.querySelector<HTMLButtonElement>('.project-row__trigger')?.focus({ preventScroll: true });
    }, 40);
  };

  useEffect(() => {
    const revealFromHash = () => {
      const prefix = '#project-';
      if (!window.location.hash.startsWith(prefix)) return;
      const project = indexedProjects.find((item) => item.key === window.location.hash.slice(prefix.length));
      if (project) revealProject(project, false);
    };

    revealFromHash();
    window.addEventListener('hashchange', revealFromHash);
    return () => window.removeEventListener('hashchange', revealFromHash);
  }, [indexedProjects]);

  const toggleProject = (key: string) => {
    setExpandedProjects((current) => {
      const next = new Set(current);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <main id="main-content">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section id="top" className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title">
            <span className="hero__name">Robin Bailey</span> is a product leader, designer and engineer turning complex services into clear, useful digital products.
          </h1>
          <p className="hero__intro">
            My work spans student success platforms, learning analytics, Salesforce architecture, product design and mobile products — from strategy and research through to architecture and implementation.
          </p>
          <div className="hero__meta">
            <a href="#experience">Work <ArrowDown size={12} /></a>
            {SITE.availability.active && <span><span className="availability-dot" />{SITE.availability.label}</span>}
            <span><MapPin size={11} />{SITE.location}</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
        </section>

        {/* ── Work (two-column experience) ────────────────── */}
        <section id="experience" className="content-section work" aria-labelledby="work-title">
          <SectionHeading
            eyebrow="Work"
            title="Experience and projects."
          />

          <div className="work-grid">
            {[EXPERIENCE.slice(0, 2), EXPERIENCE.slice(2)].map((group, gi) => (
              <div key={gi} className="work-grid__col">
                <div className="role-list">
                  {group.map((role) => {
                    const roleProjects = [...role.projects, ...(role.extraProjects ?? [])]
                      .map((project) => projectLookup.get(`${role.id}--${project.title}`))
                      .filter(Boolean) as IndexedProject[];
                    return (
                      <article key={role.id} className="role-block">
                        <div className="role-block__header">
                          {role.logo && (
                            <span className="role-block__logo" aria-hidden="true">
                              <img src={role.logo} alt="" />
                            </span>
                          )}
                          <div className="role-block__identity">
                            <span className="role-block__meta">{role.period}</span>
                            <strong>{role.title}</strong>
                            <span className="role-block__company">{role.company}</span>
                          </div>
                        </div>
                        {role.summary && (
                          <div className="role-block__summary">
                            <p>{role.summary}</p>
                          </div>
                        )}
                        <div className="project-list">
                          {roleProjects.map((project) => (
                            <ProjectDisclosure
                              key={project.key}
                              project={project}
                              open={expandedProjects.has(project.key)}
                              onToggle={() => toggleProject(project.key)}
                            />
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Profile ───────────────────────────────────────── */}
        <section id="profile" className="content-section profile" aria-labelledby="profile-title">
          <SectionHeading
            eyebrow="Profile"
            title="The wider practice."
            detail="Education, speaking, advisory work and long-running collaborations."
          />

          <div className="profile-intro">
            <div className="profile-photo">
              <img src={SITE.headshot} alt="Robin Bailey" />
            </div>
            <div className="profile-intro__text">
              <p>{SITE.bio}.</p>
              <div className="profile-intro__meta">
                <span><MapPin size={13} />{SITE.locationTagline}</span>
                <span>{EXPERIENCE[0].period}</span>
              </div>
            </div>
          </div>

          <div className="client-index">
            <p className="eyebrow">Selected organisations and products</p>
            <div className="client-grid">
              {CLIENTS.map((client) => (
                <div key={client.name} className="client-item">
                  <strong>{client.name}</strong>
                  <span>— {client.note}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-columns">
            <section aria-labelledby="education-heading">
              <h3 id="education-heading">Education</h3>
              <div className="profile-list">
                {EDUCATION.map((item) => (
                  <article key={item.degree}>
                    <p className="profile-list__meta">{item.institution}</p>
                    <h4>{item.degree}</h4>
                    <p>{item.classification}</p>
                    {item.awards.map((award) => <span key={award}>{award}</span>)}
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="speaking-heading">
              <h3 id="speaking-heading">Speaking</h3>
              <div className="profile-list">
                {SPEAKING.map((item) => (
                  <article key={`${item.year}-${item.title}`}>
                    <p className="profile-list__meta">{item.year}</p>
                    <h4>{item.title}</h4>
                    <p>{item.subtitle}</p>
                    {item.entries.map((entry) => <span key={entry.text}>{entry.type ? `${entry.type}: ` : ''}{entry.text}</span>)}
                  </article>
                ))}
              </div>
            </section>

            <section aria-labelledby="volunteering-heading">
              <h3 id="volunteering-heading">Advisory & volunteering</h3>
              <div className="profile-list">
                {VOLUNTEERING.map((item) => (
                  <article key={`${item.org}-${item.title}`}>
                    <p className="profile-list__meta">{item.period}</p>
                    <h4>{item.title}</h4>
                    <p>{item.org}</p>
                    {item.body && <span>{item.body}</span>}
                  </article>
                ))}
              </div>
            </section>
          </div>
        </section>

        {/* ── Contact ───────────────────────────────────────── */}
        <section className="contact-section" aria-labelledby="contact-title">
          <p className="eyebrow">Available for thoughtful work</p>
          <h2 id="contact-title">{SITE.cta.heading}</h2>
          <div className="contact-section__action">
            <p>{SITE.cta.subtext}</p>
            <a href={`mailto:${SITE.email}`}>{SITE.cta.buttonLabel} — {SITE.email} <ArrowUpRight size={14} /></a>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="site-footer">
        <div>
          <strong>{SITE.name}</strong>
          <span>{SITE.tagline}</span>
        </div>
        <div className="footer-socials">
          {SITE.social.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noreferrer">
              {social.label}
            </a>
          ))}
          <a href={`mailto:${SITE.email}`}>Email</a>
        </div>
        <a href="#top">Back to top <ArrowDown size={13} className="back-to-top-icon" /></a>
      </footer>
    </div>
  );
}

export default App;
