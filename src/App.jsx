import { useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import ProjectPage from "./ProjectPage";
import "./App.css";

const projects = [
  {
    category: "UI/UX DESIGN",
    projects: [
      {
        id: "hero-mania",
        title: "Hero Mania",
        description:
          "An interactive anime character experience designed and prototyped in Figma.",
        image: "/images/hero-mania.png",
        tools: ["Figma", "UI Design", "Prototyping"],
      },
    ],
  },
  {
    category: "MOBILE APPLICATIONS",
    projects: [
      {
        id: "ibnzohr-mobile",
        title: "IBNZOHR Inventory Manager",
        description:
          "A mobile application designed to manage medical inventory and streamline stock tracking.",
        image: "/images/ibnzohr-mobile.png",
        tools: ["Android Studio"],
      },
    ],
  },
  {
    category: "DESKTOP APPLICATIONS",
    projects: [
      {
        id: "ibnzohr-desktop",
        title: "IBNZOHR Desktop Manager",
        description:
          "A desktop version of the inventory management system for easier monitoring and management.",
        image: "/images/ibnzohr-desktop.png",
        tools: ["Desktop Application"],
      },
      {
        id: "phone-file-manager",
        title: "Phone File Manager",
        description:
          "A desktop application that helps users view and manage files from a connected Android phone.",
        image: "/images/phone-file-manager.png",
        tools: ["Python", "PySide6", "ADB"],
      },
    ],
  },
];

/* AUTOMATICALLY SCROLL TO TOP WHEN CHANGING PAGES */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectPage />} />
      </Routes>
    </>
  );
}

function Home() {
  return (
    <div className="portfolio">
      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="logo">
          ADIL<span>.</span>
        </div>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">PORTFOLIO — 2026</p>

            <h1>
              Creative ideas.
              <br />
              <span>Built into reality.</span>
            </h1>

            <p className="hero-description">
              I'm <strong>Adil Ahmad</strong>, a Creative Developer and UI/UX
              Designer creating digital experiences, applications, and
              interfaces with creativity and AI-assisted workflows.
            </p>

            <a href="#projects" className="primary-btn">
              Explore My Work ↓
            </a>
          </div>

          <div className="hero-image-wrapper">
            <div className="image-glow"></div>
            <img src="/images/adil.jpg" alt="Adil Ahmad" />
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="about">
          <p className="section-label">01 — ABOUT ME</p>

          <h2>
            I enjoy turning <span>ideas</span> into things people can see,
            use, and experience.
          </h2>

          <p>
            My work explores UI/UX design, mobile applications, desktop
            software, and creative digital projects. I use modern tools and
            AI-assisted workflows to transform concepts into working
            experiences.
          </p>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="projects-section">
          <div className="projects-header">
            <div>
              <p className="section-label">02 — SELECTED WORK</p>
              <h2>Projects by category.</h2>
            </div>

            <p>
              A collection of applications, interfaces, and experiments I've
              created.
            </p>
          </div>

          {projects.map((category) => (
            <div className="category" key={category.category}>
              <h3>{category.category}</h3>

              <div className="project-grid">
                {category.projects.map((project) => (
                  <article className="project-card" key={project.id}>
                    <div className="project-image">
                      <img src={project.image} alt={project.title} />
                    </div>

                    <div className="project-info">
                      <h4>{project.title}</h4>

                      <p>{project.description}</p>

                      <div className="tools">
                        {project.tools.map((tool) => (
                          <span key={tool}>{tool}</span>
                        ))}
                      </div>

                      <Link
                        to={`/project/${project.id}`}
                        className="view-btn"
                      >
                        View Project <span>↗</span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* CONTACT */}

<section id="contact" className="contact">

  <p className="section-label">03 — CONTACT</p>

  <h2>Let's work together.</h2>

  <p>
    Have an idea, project, or opportunity in mind? I'd love to hear
    about it.
  </p>

  <div className="contact-links">

    <a
      href="mailto:adilahmad121001@gmail.com"
      className="contact-btn primary-contact"
    >
      Email Me ↗
    </a>

    <a
      href="https://www.linkedin.com/in/adil-ahmad-b25558430"
      target="_blank"
      rel="noopener noreferrer"
      className="contact-btn"
    >
      LinkedIn ↗
    </a>

  </div>

</section>
      </main>

      {/* FOOTER */}
      <footer>
        <p>© 2026 Adil Ahmad</p>
        <p>Creative Developer | UI/UX Designer</p>
      </footer>
    </div>
  );
}

export default App;