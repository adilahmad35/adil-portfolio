import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import projects from "./data/projects";

import "./ProjectPage.css";

function ProjectPage() {
  const { id } = useParams();

  const project = projects.find((project) => project.id === id);

  const [selectedImage, setSelectedImage] = useState(null);

  // Always open project pages from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Prevent background scrolling when image modal is open
  useEffect(() => {
    if (selectedImage !== null) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

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

  // Create one complete list of images
  const allImages = [
    project.image,
    ...(project.images || []).filter(
      (image) => image !== project.image
    ),
  ];

  const openImage = (index) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((current) => {
      if (current === allImages.length - 1) {
        return 0;
      }

      return current + 1;
    });
  };

  const previousImage = () => {
    setSelectedImage((current) => {
      if (current === 0) {
        return allImages.length - 1;
      }

      return current - 1;
    });
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


          {/* MAIN IMAGE */}

          <div
            className="project-main-image clickable-image"
            onClick={() => openImage(0)}
          >

            <img
              src={project.image}
              alt={project.title}
            />

            <div className="image-overlay">
              Click to view
            </div>

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


        {/* PROJECT GALLERY */}

        {project.images && project.images.length > 0 && (

          <section className="screenshots-section">

            <p className="section-label">
              PROJECT GALLERY
            </p>

            <h2>
              Inside the project.
            </h2>


            <div className="screenshots-grid">

              {project.images.map((image, index) => {

                const actualIndex = allImages.indexOf(image);

                return (

                  <div
                    className="screenshot-card clickable-image"
                    key={`${image}-${index}`}
                    onClick={() => openImage(actualIndex)}
                  >

                    <img
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                    />

                    <span>
                      SCREEN {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="image-overlay">
                      Click to view
                    </div>

                  </div>

                );
              })}

            </div>

          </section>

        )}

      </main>


      {/* FULLSCREEN IMAGE VIEWER */}

      {selectedImage !== null && (

        <div
          className="image-modal"
          onClick={closeImage}
        >

          <button
            className="modal-close"
            onClick={closeImage}
            aria-label="Close image"
          >
            ✕
          </button>


          {allImages.length > 1 && (

            <button
              className="modal-prev"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
              aria-label="Previous image"
            >
              ←
            </button>

          )}


          <div
            className="modal-image-container"
            onClick={(event) => event.stopPropagation()}
          >

            <img
              src={allImages[selectedImage]}
              alt={`${project.title} preview`}
            />

            <p>
              {selectedImage + 1} / {allImages.length}
            </p>

          </div>


          {allImages.length > 1 && (

            <button
              className="modal-next"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
              aria-label="Next image"
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