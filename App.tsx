import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
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

type ScrollGuideSection = 'hero' | 'work' | 'profile' | 'contact';

interface ScrollGuideAnchorPoint {
  x: number;
  y: number;
  activationY: number;
  section: ScrollGuideSection;
}

function ScrollGuide() {
  const markerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const marker = markerRef.current;
    const main = document.getElementById('main-content');
    if (!marker || !main) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let anchorPoints: ScrollGuideAnchorPoint[] = [];
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let activeIndex = -1;
    let animationFrame = 0;
    let lastFrameTime = 0;
    let ready = false;

    const render = (x: number, y: number) => {
      marker.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
    };

    const animate = (time: number) => {
      const elapsed = lastFrameTime ? Math.min((time - lastFrameTime) / 1000, 1 / 30) : 1 / 60;
      lastFrameTime = time;

      // A lightly under-damped spring gives the guide a small, controlled overshoot.
      const accelerationX = (targetX - currentX) * 190;
      const accelerationY = (targetY - currentY) * 190;
      const damping = Math.exp(-18 * elapsed);
      velocityX = (velocityX + accelerationX * elapsed) * damping;
      velocityY = (velocityY + accelerationY * elapsed) * damping;
      currentX += velocityX * elapsed;
      currentY += velocityY * elapsed;
      render(currentX, currentY);

      const nearTarget = Math.abs(targetX - currentX) < 0.1 && Math.abs(targetY - currentY) < 0.1;
      const nearlyStill = Math.abs(velocityX) < 0.1 && Math.abs(velocityY) < 0.1;
      if (nearTarget && nearlyStill) {
        currentX = targetX;
        currentY = targetY;
        velocityX = 0;
        velocityY = 0;
        render(currentX, currentY);
        animationFrame = 0;
        lastFrameTime = 0;
        return;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const moveTo = (point: ScrollGuideAnchorPoint, immediate = false) => {
      targetX = point.x;
      targetY = point.y;

      if (immediate || reduceMotion.matches || !ready) {
        if (animationFrame) window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
        lastFrameTime = 0;
        velocityX = 0;
        velocityY = 0;
        currentX = targetX;
        currentY = targetY;
        render(currentX, currentY);
        ready = true;
        marker.dataset.ready = 'true';
        return;
      }

      if (!animationFrame) animationFrame = window.requestAnimationFrame(animate);
    };

    const updateActiveAnchor = (immediate = false) => {
      if (!anchorPoints.length) return;

      const readingLine = window.scrollY + window.innerHeight * 0.38;
      let nextIndex = 0;

      anchorPoints.forEach((point, index) => {
        if (point.activationY <= readingLine) nextIndex = index;
      });

      // The final heading cannot always reach the reading line on short viewports.
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        nextIndex = anchorPoints.length - 1;
      }

      if (nextIndex !== activeIndex || immediate) {
        activeIndex = nextIndex;
        marker.dataset.section = anchorPoints[activeIndex].section;
        moveTo(anchorPoints[activeIndex], immediate);
      }
    };

    const measureAnchors = (immediate = false) => {
      const measuredPoints = Array.from(main.querySelectorAll<HTMLElement>('[data-scroll-guide]'))
        .map((element): ScrollGuideAnchorPoint => {
          const roleSummary = element.nextElementSibling instanceof HTMLElement
            && element.nextElementSibling.classList.contains('role-block__summary')
            ? element.nextElementSibling.querySelector<HTMLElement>('p')
            : null;
          const verticalAnchor = window.innerWidth <= 700 && roleSummary ? roleSummary : element;
          const rect = verticalAnchor.getBoundingClientRect();
          const horizontalRect = element.getBoundingClientRect();
          const lineHeight = Number.parseFloat(window.getComputedStyle(verticalAnchor).lineHeight) || rect.height;
          const horizontalOffset = Number(element.dataset.scrollGuideOffset ?? 34);
          return {
            x: Math.max(0, horizontalRect.left + window.scrollX - horizontalOffset),
            y: rect.top + window.scrollY + Math.min(lineHeight, rect.height) / 2 - marker.offsetHeight / 2,
            activationY: 0,
            section: (element.dataset.scrollGuideSection ?? 'hero') as ScrollGuideSection,
          };
        })
        .sort((a, b) => Math.abs(a.y - b.y) < 4 ? a.x - b.x : a.y - b.y);

      let previousActivationY = Number.NEGATIVE_INFINITY;
      anchorPoints = measuredPoints.map((point) => {
        const activationY = Math.max(point.y, previousActivationY + 96);
        previousActivationY = activationY;
        return { ...point, activationY };
      });

      const previousIndex = activeIndex;
      updateActiveAnchor(immediate);
      if (!immediate && previousIndex === activeIndex && activeIndex >= 0) {
        moveTo(anchorPoints[activeIndex]);
      }
    };

    const onScroll = () => updateActiveAnchor();
    const onResize = () => measureAnchors(true);
    const onMotionPreferenceChange = () => {
      if (activeIndex >= 0) moveTo(anchorPoints[activeIndex], reduceMotion.matches);
    };
    const resizeObserver = new ResizeObserver(() => measureAnchors());

    measureAnchors(true);
    resizeObserver.observe(main);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    reduceMotion.addEventListener('change', onMotionPreferenceChange);

    return () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      reduceMotion.removeEventListener('change', onMotionPreferenceChange);
    };
  }, []);

  return (
    <div ref={markerRef} className="scroll-guide" aria-hidden="true">
      <span className="scroll-guide__orb" />
    </div>
  );
}

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

function SectionHeading({
  id,
  eyebrow,
  title,
  detail,
  guideSection,
}: {
  id: string;
  eyebrow: string;
  title: string;
  detail?: string;
  guideSection: ScrollGuideSection;
}) {
  return (
    <header className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} data-scroll-guide data-scroll-guide-section={guideSection}>{title}</h2>
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
  const collapsedClient = project.roleId === 'freelance'
    && project.client
    && !['side project', 'concept'].includes(project.client.trim().toLowerCase())
    ? project.client
    : undefined;

  return (
    <article id={`project-${project.key}`} className={`project-row${open ? ' is-open' : ''}`}>
      <button type="button" className="project-row__trigger" onClick={onToggle} aria-expanded={open} aria-controls={detailId}>
        <span className="project-row__action" aria-hidden="true">
          <Plus size={16} />
        </span>
        <span className="project-row__title">
          <strong>{project.title}</strong>
          {collapsedClient && (
            <span className="project-row__client">
              <span>Client</span>
              {collapsedClient}
            </span>
          )}
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
      <ScrollGuide />

      <main id="main-content">
        {/* ── Hero ──────────────────────────────────────────── */}
        <section id="top" className="hero" aria-labelledby="hero-title">
          <h1 id="hero-title" data-scroll-guide data-scroll-guide-section="hero">
            <span className="hero__name">Robin Bailey</span> is a product leader, designer and engineer turning complex challenges into clear, useful digital products.
          </h1>
          <p className="hero__intro">
            His work spans strategy, research, product design, architecture and implementation, with a current focus on student success, learning analytics, CRM, Salesforce and mobile products. His experience covers higher education, health and medical, local government and AdTech.
          </p>
          <div className="hero__meta">
            {SITE.availability.active && <span><span className="availability-dot" />{SITE.availability.label}</span>}
            <span><MapPin size={11} />{SITE.location}</span>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </div>
        </section>

        {/* ── Work (two-column experience) ────────────────── */}
        <section id="experience" className="content-section work" aria-labelledby="work-title">
          <SectionHeading
            id="work-title"
            eyebrow="Work"
            title="Experience and projects."
            guideSection="work"
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
                        <div
                          className="role-block__header"
                          data-scroll-guide
                          data-scroll-guide-section="work"
                          data-scroll-guide-offset="58"
                        >
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
            id="profile-title"
            eyebrow="Profile"
            title="The wider practice."
            detail="Education, speaking, advisory work and long-running collaborations."
            guideSection="profile"
          />

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
              <h3 id="education-heading" data-scroll-guide data-scroll-guide-section="profile">Education</h3>
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
              <h3 id="speaking-heading" data-scroll-guide data-scroll-guide-section="profile">Speaking</h3>
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
              <h3 id="volunteering-heading" data-scroll-guide data-scroll-guide-section="profile">Advisory & volunteering</h3>
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
          <h2 id="contact-title" data-scroll-guide data-scroll-guide-section="contact">{SITE.cta.heading}</h2>
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
