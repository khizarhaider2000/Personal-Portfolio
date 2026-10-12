"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Command,
  ExternalLink,
  Mail,
  Search,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { portfolio, type Experience, type Project } from "../data/portfolio";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experiences" },
  { label: "Projects", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Exploring", href: "#exploring" },
  { label: "Contact", href: "#contact" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

const sectionMotion = {
  initial: "hidden",
  whileInView: "visible",
  viewport: { once: true, amount: 0.2 },
  variants: fadeUp,
};

const briefText = (text: string) => {
  const firstSentence = text.match(/^[^.!?]+[.!?]/)?.[0];
  return firstSentence ?? text;
};

const projectTitle = (title: string) => {
  const titles: Record<string, string> = {
    "Embedded Systems Lab – Alarm System & Linear Pong Game": "Embedded Systems Lab",
    "UART-Enabled Traffic Light Controller": "UART Traffic Light",
  };

  return titles[title] ?? title;
};

export default function Home() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState("#home");

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const sections = ["#about", "#experiences", "#work", "#skills", "#exploring", "#contact"]
      .map((id) => document.querySelector(id))
      .filter((section): section is Element => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(`#${visible.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.1, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <Nav onCommand={() => setPaletteOpen(true)} activeSection={activeSection} />
      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        onProjectSelect={setSelectedProject}
      />
      <Hero onCommand={() => setPaletteOpen(true)} />
      <About />
      <ExperienceSection />
      <Work onProjectSelect={setSelectedProject} />
      <Skills />
      <Exploring />
      <Contact />
      <Footer onCommand={() => setPaletteOpen(true)} />
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}

function Nav({ onCommand, activeSection }: { onCommand: () => void; activeSection: string }) {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <a className="nav-logo" href="#home" aria-label="Go to home">
        KH
      </a>
      <div className="nav-links">
        {navItems.map((item) => (
          <a
            href={item.href}
            key={item.href}
            className={activeSection === item.href ? "active" : ""}
          >
            {item.label}
          </a>
        ))}
      </div>
      <button className="command-trigger" onClick={onCommand} aria-label="Open command palette">
        <span>Search</span>
        <kbd>⌘K</kbd>
      </button>
    </nav>
  );
}

function Hero({ onCommand }: { onCommand: () => void }) {
  const heroRef = useRef<HTMLElement | null>(null);

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (
      window.matchMedia("(hover: none)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    heroRef.current?.style.setProperty("--mx", x.toFixed(3));
    heroRef.current?.style.setProperty("--my", y.toFixed(3));
  };

  return (
    <section
      id="home"
      className="hero"
      ref={heroRef}
      onPointerMove={onPointerMove}
      aria-label="Intro"
    >
      <div className="hero-grid" aria-hidden="true" />
      <motion.div
        className="hero-layout"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero-copy">
          <h1>Hi, I&apos;m Khizar.</h1>
          <p>
            Computer Engineering student interested in software development, AI, and digital systems.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#work">
              View Projects <ArrowUpRight size={18} />
            </a>
            <button className="ghost-button" onClick={onCommand}>
              <Command size={18} /> Command Palette
            </button>
          </div>
        </div>
        <HeroConsole />
      </motion.div>
    </section>
  );
}

function HeroConsole() {
  return (
    <motion.aside
      className="console-card"
      style={{ x: "calc(var(--mx, 0) * -10px)", y: "calc(var(--my, 0) * -10px)" }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 180, damping: 20 }}
      aria-label="Developer console summary"
    >
      <div className="console-topbar">
        <span />
        <span />
        <span />
        <strong>khizar.system</strong>
      </div>
      <div className="console-body">
        <p>
          <span>$</span> focus --software --ai --systems
        </p>
        <p>
          <span>stack</span> React / Python / SQL / VHDL
        </p>
        <p>
          <span>mode</span> building practical engineering tools
        </p>
      </div>
    </motion.aside>
  );
}

function About() {
  return (
    <section id="about" className="about section-pad">
      <motion.div className="section-shell about-shell" {...sectionMotion}>
        <SectionTitle title="About" />
        <div className="about-grid">
          <article className="education-block">
            <h2>{portfolio.education.school}</h2>
            <p>{portfolio.education.degree}</p>
            <small>{portfolio.education.focus}</small>
            <a href={`mailto:${portfolio.person.email}`} className="inline-contact">
              <Mail size={17} />
              Say hi
            </a>
          </article>
          <article className="about-copy">
            <p>
              I build full-stack tools, data workflows, machine learning projects, and digital
              systems.
            </p>
          </article>
        </div>
      </motion.div>
    </section>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <motion.div className="section-heading" {...sectionMotion}>
      <h2>{title}</h2>
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" className="skills section-pad">
      <div className="section-shell">
        <SectionTitle title="Skills" />
        <div className="skills-grid">
          {portfolio.skills.map((group) => (
            <article className="skill-group" key={group.label}>
              <h3>{group.label}</h3>
              <p>{group.items.join(", ")}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Exploring() {
  return (
    <section id="exploring" className="exploring section-pad">
      <div className="section-shell">
        <SectionTitle title="Currently Exploring" />
        <div className="exploring-list">
          {portfolio.currentlyExploring.map((item) => (
            <article className="exploring-row" key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work({ onProjectSelect }: { onProjectSelect: (project: Project) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const featured = portfolio.projects[0];
  const projects = portfolio.projects.slice(1);

  return (
    <section id="work" className="work section-pad">
      <div className="project-transition" aria-hidden="true" />
      <div className="section-shell work-shell">
        <SectionTitle title="Projects" />
        <div className="project-grid">
          {featured && (
            <ProjectTile
              project={featured}
              featured
              onOpen={onProjectSelect}
              hovered={hovered}
              setHovered={setHovered}
            />
          )}
          {projects.map((project, index) => (
            <ProjectTile
              key={project.title}
              project={project}
              onOpen={onProjectSelect}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectTile({
  project,
  featured = false,
  onOpen,
  hovered,
  setHovered,
}: {
  project: Project;
  featured?: boolean;
  onOpen: (project: Project) => void;
  hovered: string | null;
  setHovered: (title: string | null) => void;
}) {
  const isDimmed = hovered && hovered !== project.title;

  return (
    <motion.button
      className={`project-tile ${featured ? "featured" : ""} ${isDimmed ? "dimmed" : ""}`}
      style={{ "--accent": project.accent } as React.CSSProperties}
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHovered(project.title)}
      onMouseLeave={() => setHovered(null)}
    >
      <ProjectArt project={project} />
      <div className="project-copy">
        <h3>{projectTitle(project.title)}</h3>
        <p>{briefText(project.description)}</p>
        <div>
          {project.tags.slice(0, 3).map((tag) => (
            <small key={tag}>{tag}</small>
          ))}
        </div>
      </div>
      <ArrowUpRight className="tile-arrow" size={22} />
    </motion.button>
  );
}

function ProjectArt({ project }: { project: Project }) {
  return (
    <div className="project-art">
      <img src={project.imageSrc} alt={`${project.title} preview`} loading="lazy" />
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="project-modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close project details">
              <X />
            </button>
            <ProjectArt project={project} />
            <div className="modal-body">
              <span className="panel-label">Project Detail</span>
              <h3>{project.title}</h3>
              <p>{project.details}</p>
              <div className="modal-tags">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="modal-links">
                {project.source && (
                  <a href={project.source} target="_blank" rel="noreferrer">
                    Source <ExternalLink size={15} />
                  </a>
                )}
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer">
                    Demo <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = portfolio.experience[activeIndex];

  return (
    <section id="experiences" className="experience section-pad">
      <div className="section-shell experience-shell">
        <SectionTitle title="Experience" />
        <div className="timeline-layout">
          <div className="timeline-rail" aria-label="Experience timeline">
            {portfolio.experience.map((item, index) => (
              <TimelineButton
                item={item}
                active={activeIndex === index}
                key={`${item.role}-${item.company}`}
                onActivate={() => setActiveIndex(index)}
              />
            ))}
          </div>
          <motion.article className="timeline-detail" layout>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active.role}-${active.company}`}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.22 }}
              >
                <span className="panel-label">{active.date}</span>
                <h3>{active.role}</h3>
                <p>{active.company}</p>
                <ul>
                  {active.points.slice(0, 3).map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function TimelineButton({
  item,
  active,
  onActivate,
}: {
  item: Experience;
  active: boolean;
  onActivate: () => void;
}) {
  return (
    <motion.button
      className={`timeline-button ${active ? "active" : ""}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
      whileHover={{ x: 7 }}
    >
      <span>{item.year}</span>
      <strong>{item.role}</strong>
      <small>{item.company}</small>
    </motion.button>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact section-pad">
      <div className="section-shell contact-shell">
        <SectionTitle title="Contact" />
        <a className="email-link" href={`mailto:${portfolio.person.email}`}>
          {portfolio.person.email}
        </a>
        <div className="contact-links">
          <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={portfolio.person.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer({ onCommand }: { onCommand: () => void }) {
  return (
    <footer className="footer">
      <div className="footer-mark">
        <span>KH</span>
      </div>
      <div className="footer-status">
        <span />
        Portfolio online · {new Date().getFullYear()}
      </div>
      <div className="footer-links">
        <button onClick={onCommand}>Cmd K</button>
        <a href={portfolio.person.resume}>Resume</a>
        <a href={portfolio.person.linkedin} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a href={portfolio.person.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </footer>
  );
}

function CommandPalette({
  open,
  onClose,
  onProjectSelect,
}: {
  open: boolean;
  onClose: () => void;
  onProjectSelect: (project: Project) => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    window.setTimeout(() => inputRef.current?.focus(), 40);

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const actions = useMemo(() => {
    const navigate = (id: string) => {
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      onClose();
    };

    return [
      { label: "Go to About", detail: "Profile", keywords: "about profile education", run: () => navigate("#about") },
      { label: "Go to Experience", detail: "Timeline", keywords: "experience timeline jobs", run: () => navigate("#experiences") },
      { label: "Go to Projects", detail: "Project grid", keywords: "work projects builds", run: () => navigate("#work") },
      { label: "Go to Skills", detail: "Technical stack", keywords: "skills stack tools", run: () => navigate("#skills") },
      { label: "Go to Currently Exploring", detail: "Learning areas", keywords: "currently exploring learning", run: () => navigate("#exploring") },
      { label: "Contact Khizar", detail: portfolio.person.email, keywords: "email contact", run: () => navigate("#contact") },
      { label: "Open Resume", detail: portfolio.person.resume, keywords: "resume cv pdf", run: () => window.open(portfolio.person.resume, "_blank") },
      { label: "Open GitHub", detail: portfolio.person.github, keywords: "github code source", run: () => window.open(portfolio.person.github, "_blank") },
      ...portfolio.projects.map((project) => ({
        label: project.title,
        detail: project.tags.slice(0, 4).join(" · "),
        keywords: `${project.description} ${project.tags.join(" ")}`,
        run: () => {
          onProjectSelect(project);
          onClose();
        },
      })),
    ];
  }, [onClose, onProjectSelect]);

  const filtered = actions.filter((action) => {
    const text = `${action.label} ${action.detail} ${action.keywords}`.toLowerCase();
    return text.includes(query.toLowerCase().trim());
  });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="command-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="command-panel"
            initial={{ opacity: 0, y: -24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="command-search">
              <Search size={18} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Navigate, search projects, open resume..."
                aria-label="Search commands and projects"
              />
              <kbd>Esc</kbd>
            </div>
            <div className="command-list">
              {filtered.map((action) => (
                <button
                  key={`${action.label}-${action.detail}`}
                  onClick={action.run}
                  className="command-item"
                >
                  <span>{action.label}</span>
                  <small>{action.detail}</small>
                </button>
              ))}
              {!filtered.length && <p className="command-empty">No matches found.</p>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
