"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Mail, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { portfolio, type Project, type Recommendation } from "../data/portfolio";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experiences" },
  { label: "Contact", href: "#contact" },
];

const heroColors = ["#9cc6c3", "#f06956", "#141414", "#e5e5e5", "#ffe68c"];

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Work />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <nav className="site-nav" aria-label="Primary navigation">
      {navItems.map((item, index) => (
        <span className="nav-part" key={item.href}>
          <a href={item.href}>{item.label}</a>
          {index < navItems.length - 1 && <span>/</span>}
        </span>
      ))}
    </nav>
  );
}

function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % heroColors.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  const displayName = portfolio.person.shortName.toUpperCase();

  return (
    <section
      id="home"
      className="hero"
      style={{ backgroundColor: heroColors[active] }}
      aria-label="Intro"
    >
      <motion.div
        className="hero-inner"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
      >
        <h1>
          <span>Hi, I&apos;m</span>
          <span>{displayName}</span>
        </h1>
        <p>{portfolio.person.headline}</p>
        <motion.a
          className="outline-button"
          href="#about"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          Learn More
        </motion.a>
        <div className="hero-dots" aria-label="Hero color slides">
          {heroColors.map((color, index) => (
            <button
              key={color}
              className={active === index ? "active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Show hero color ${index + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="about section-pad">
      <motion.div
        className="section-shell"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.18 }}
        transition={{ staggerChildren: 0.08 }}
      >
        <motion.h2 variants={fadeUp} className="section-title white">
          About Me
        </motion.h2>
        <div className="about-grid">
          <div className="about-left">
            <motion.article variants={fadeUp} className="education-card light-card">
              <strong>{portfolio.education.school}</strong>
              <div>
                <h3>{portfolio.education.degree}</h3>
                <p>{portfolio.education.focus}</p>
              </div>
            </motion.article>
            <motion.article variants={fadeUp} className="light-card stacked-card">
              <h3>02. Currently Exploring</h3>
              <ul className="exploring-list">
                {portfolio.currentlyExploring.map((item) => (
                  <li key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
            <motion.a
              variants={fadeUp}
              className="light-card email-card"
              href={`mailto:${portfolio.person.email}`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Mail size={23} />
              <span>Say Hi - Copy Email</span>
            </motion.a>
          </div>
          <motion.article variants={fadeUp} className="tech-card">
            <h3>Tech Stack</h3>
            {portfolio.skills.map((group) => (
              <div className="skill-group" key={group.label}>
                <h4>{group.label}</h4>
                <div className="pills">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </motion.article>
        </div>
      </motion.div>
    </section>
  );
}

function Work() {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  const scroll = (direction: -1 | 1) => {
    rowRef.current?.scrollBy({ left: direction * 600, behavior: "smooth" });
  };

  return (
    <section id="work" className="work section-pad">
      <PixelCanvas />
      <div className="section-shell work-shell">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title black">My Work</h2>
          <p className="section-subtitle">This is what I&apos;ve worked on throughout my career.</p>
        </motion.div>
        <div className="carousel-frame">
          <button className="carousel-arrow left" onClick={() => scroll(-1)} aria-label="Scroll projects left">
            <ChevronLeft />
          </button>
          <button className="carousel-arrow right" onClick={() => scroll(1)} aria-label="Scroll projects right">
            <ChevronRight />
          </button>
          <div className="work-row" ref={rowRef}>
            {portfolio.projects.map((project, index) => (
              <motion.button
                key={project.title}
                className="project-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
                onClick={() => setSelected(project)}
              >
                <ProjectArt project={project} />
                <div className="project-overlay">
                  <h3>{project.title}</h3>
                  <p>{project.status ?? project.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function ProjectArt({ project }: { project: Project }) {
  return (
    <div className="project-art" style={{ "--accent": project.accent } as React.CSSProperties}>
      <div className="pixel-window">
        <span />
        <span />
        <span />
      </div>
      <div className="pixel-desk" />
      <div className="pixel-chart">
        <i />
        <i />
        <i />
      </div>
      <div className="pixel-badge">{project.title.slice(0, 2)}</div>
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
            initial={{ opacity: 0, scale: 0.92, y: 22 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 22 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close project details">
              <X />
            </button>
            <ProjectArt project={project} />
            <div className="modal-body">
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

function Experience() {
  return (
    <section id="experiences" className="experience section-pad">
      <ExperienceCanvas />
      <div className="section-shell experience-shell">
        <motion.h2
          className="section-title black"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          Work Experience
        </motion.h2>
        <div className="timeline">
          {portfolio.experience.map((item, index) => (
            <motion.article
              className={`timeline-item ${index % 2 ? "right" : "left"}`}
              key={`${item.role}-${item.company}`}
              initial={{ opacity: 0, y: 42 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6 }}
            >
              <div className="year-pill">{item.year}</div>
              <div className="experience-card" tabIndex={0}>
                <div className="logo-mark">{item.logoText}</div>
                <h3>{item.role}</h3>
                <p>{item.company}</p>
                <time>{item.date}</time>
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [selected, setSelected] = useState<Recommendation | null>(null);

  const scroll = (direction: -1 | 1) => {
    rowRef.current?.scrollBy({ left: direction * 400, behavior: "smooth" });
  };

  return (
    <section id="contact" className="contact">
      <motion.div
        className="contact-header"
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title white">My Recommendations</h2>
        <p>Curated tools, resources, and ideas I love. Want personalized notes?</p>
        <motion.a
          href={`mailto:${portfolio.person.email}`}
          className="red-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contact Me
        </motion.a>
      </motion.div>
      <div className="recommendation-frame">
        <button className="recommend-arrow left" onClick={() => scroll(-1)} aria-label="Scroll recommendations left">
          <ChevronLeft />
        </button>
        <button className="recommend-arrow right" onClick={() => scroll(1)} aria-label="Scroll recommendations right">
          <ChevronRight />
        </button>
        <div className="recommendation-row" ref={rowRef}>
          {portfolio.recommendations.map((item, index) => (
            <motion.button
              className="poster-card"
              key={item.title}
              onClick={() => setSelected(item)}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              style={{ "--accent": item.accent } as React.CSSProperties}
            >
              <span>{item.title}</span>
              <strong>{item.meta}</strong>
              <div>
                <b>{item.title}</b>
                <small>{item.meta}</small>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
      <RecommendationModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function RecommendationModal({
  item,
  onClose,
}: {
  item: Recommendation | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.article
            className="recommend-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close recommendation">
              <X />
            </button>
            <h3>{item.title}</h3>
            <p>{item.meta}</p>
            <span>{item.description}</span>
            <a href={`mailto:${portfolio.person.email}`}>Get More Notes</a>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} {portfolio.person.name}. All rights reserved.</p>
      <div>
        <a href={portfolio.person.github}>GitHub</a>
        <a href={portfolio.person.linkedin}>LinkedIn</a>
        <a href={portfolio.person.twitter}>Twitter</a>
      </div>
    </footer>
  );
}

function PixelCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const cell = 20;
    const colors = ["#ff9ea3", "#7bd6d2", "#ffe68c", "#b9e9e4", "#f6b6c9"];
    let frame = 0;
    let animation = 0;

    const shapes = Array.from({ length: 16 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 12 + Math.random() * 22,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      color: colors[Math.floor(Math.random() * colors.length)],
      kind: Math.floor(Math.random() * 3),
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const drawGrid = () => {
      context.strokeStyle = "rgba(0, 0, 0, 0.045)";
      context.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += cell) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();
      }
      for (let y = 0; y < canvas.height; y += cell) {
        context.beginPath();
        context.moveTo(0, y);
        context.lineTo(canvas.width, y);
        context.stroke();
      }
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();
      shapes.forEach((shape) => {
        const x = Math.floor((shape.x * canvas.width + frame * shape.dx + canvas.width) % canvas.width / cell) * cell;
        const y = Math.floor((shape.y * canvas.height + frame * shape.dy + canvas.height) % canvas.height / cell) * cell;
        context.save();
        context.globalAlpha = 0.48;
        context.fillStyle = shape.color;
        if (shape.kind === 0) {
          context.fillRect(x, y, shape.size, shape.size);
        } else if (shape.kind === 1) {
          context.beginPath();
          context.arc(x + shape.size / 2, y + shape.size / 2, shape.size / 2, 0, Math.PI * 2);
          context.fill();
        } else {
          context.beginPath();
          context.moveTo(x + shape.size / 2, y);
          context.lineTo(x + shape.size, y + shape.size / 2);
          context.lineTo(x + shape.size / 2, y + shape.size);
          context.lineTo(x, y + shape.size / 2);
          context.closePath();
          context.fill();
        }
        context.restore();
      });
      frame += 1;
      animation = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animation);
    };
  }, []);

  return <canvas className="pixel-canvas" ref={ref} aria-hidden="true" />;
}

function ExperienceCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    let animation = 0;
    let t = 0;
    const dots = Array.from({ length: 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 2 + Math.random() * 3,
      phase: Math.random() * 100,
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      const glow = context.createRadialGradient(
        canvas.width * 0.65,
        canvas.height * 0.48,
        10,
        canvas.width * 0.65,
        canvas.height * 0.48,
        canvas.width * 0.35,
      );
      glow.addColorStop(0, "rgba(183, 231, 229, 0.25)");
      glow.addColorStop(0.5, "rgba(255, 235, 197, 0.17)");
      glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "rgba(0, 0, 0, 0.12)";
      dots.forEach((dot, index) => {
        const x = dot.x * canvas.width + Math.sin((t + dot.phase) / 70) * 12;
        const y = dot.y * canvas.height + Math.cos((t + dot.phase) / 85) * 8;
        context.globalAlpha = 0.35;
        context.beginPath();
        context.arc(x, y, dot.r, 0, Math.PI * 2);
        context.fill();
        if (index % 4 === 0) {
          context.globalAlpha = 0.08;
          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(x + 125, y - 18);
          context.stroke();
        }
      });
      context.globalAlpha = 1;
      t += 1;
      animation = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animation);
    };
  }, []);

  return <canvas className="experience-canvas" ref={ref} aria-hidden="true" />;
}
