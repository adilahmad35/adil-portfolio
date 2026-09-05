import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import projects from "./data/projects";

import "./ProjectPage.css";

function ProjectPage() {
  const { id } = useParams();

  const project = projects.find((project) => project.id === id);

  const [selectedImage, setSelectedImage] = useState(null);

  if (!project) {
    return (
      <div className="not-found">

        <h1>Project not found.</h1>

        <Link to="/">
          ← Back Home
        </Link>

      </div>
    );
  }


  const openImage = (index) => {
    setSelectedImage(index);
  };


  const closeImage = () => {
    setSelectedImage(null);
  };


  const nextImage = () => {

    setSelectedImage((current) =>
      current === project.images.length - 1
        ? 0
        : current + 1
    );

  };


  const previousImage = () => {

    setSelectedImage((current) =>
      current === 0
        ? project.images.length - 1
        : current - 1
    );

  };


  return (
    <div className="project-page">

      {/* NAVIGATION */}

      <nav className="project-nav">

        <Link to="/" className="back-btn">
          ← Back to Portfolio
        </Link>

        <span>
          {project.category}
        </span>

      </nav>


      <main>


        {/* PROJECT HERO */}

        <section className="project-hero">

          <div className="project-hero-content">

            <p className="project-category">
              {project.category}
            </p>

            <h1>
              {project.title}
            </h1>

            <p className="project-description">
              {project.description}
            </p>


            <div className="project-tools">

              {project.tools.map((tool) => (

                <span key={tool}>
                  {tool}
                </span>

              ))}

            </div>

          </div>


          <div
            className="project-main-image clickable-image"
            onClick={() => openImage(0)}
          >

            <img
              src={project.image}
              alt={project.title}
            />

          </div>

        </section>


        {/* FEATURES */}

        <section className="features-section">

          <p className="section-label">
            KEY FEATURES
          </p>

          <h2>
            What it does.
          </h2>


          <div className="features-grid">

            {project.features.map((feature, index) => (

              <div
                className="feature"
                key={feature}
              >

                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>
                  {feature}
                </p>

              </div>

            ))}

          </div>

        </section>


        {/* SCREENSHOTS */}

        <section className="screenshots-section">

          <p className="section-label">
            PROJECT GALLERY
          </p>

          <h2>
            Inside the project.
          </h2>


          <div className="screenshots-grid">

            {project.images.map((image, index) => (

              <div
                className="screenshot-card clickable-image"
                key={image}
                onClick={() => openImage(index)}
              >

                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                />

                <span>
                  SCREEN {String(index + 1).padStart(2, "0")}
                </span>

              </div>

            ))}

          </div>

        </section>

      </main>


      {/* FULLSCREEN IMAGE VIEWER */}

      {selectedImage !== null && (

        <div className="image-modal">

          <button
            className="modal-close"
            onClick={closeImage}
          >
            ✕
          </button>


          {project.images.length > 1 && (

            <button
              className="modal-prev"
              onClick={previousImage}
            >
              ←
            </button>

          )}


          <div className="modal-image-container">

            <img
              src={project.images[selectedImage]}
              alt={`${project.title} preview`}
            />

            <p>
              {selectedImage + 1} / {project.images.length}
            </p>

          </div>


          {project.images.length > 1 && (

            <button
              className="modal-next"
              onClick={nextImage}
            >
              →
            </button>

          )}

        </div>

      )}

    </div>
  );
}

export default ProjectPage;