import { useState, useEffect } from "react";
import Image1 from "../assets/images/2.jpeg";
import Image2 from "../assets/images/3.jpg";
import Image3 from "../assets/images/4.jpg";
import "../styles/home.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  {
    id: 1,
    src: Image1,
    title: "Excellence in Academics",
    subtitle: "Empowering minds, building futures",
    cta: "Learn More",
  },
  {
    id: 2,
    src: Image2,
    title: "Vibrant Activities",
    subtitle: "Discover your passion and talents",
    cta: "Explore",
  },
  {
    id: 3,
    src: Image3,
    title: "Strong Community",
    subtitle: "Growing together as one family",
    cta: "Join Us",
  },
];

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500);

    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const handlePrevious = () => {
    setIsAutoPlay(false);
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
    );
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  return (
    <div className="hero-container">
      <div className="hero-carousel">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`hero-slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${image.src})` }}
          >
            <div className="hero-overlay"></div>
            <div className="hero-content">
              <h1 className="hero-title">{image.title}</h1>
              <p className="hero-subtitle">{image.subtitle}</p>
              <button className="hero-cta">{image.cta}</button>
            </div>
          </div>
        ))}

        <button
          className="hero-nav hero-nav-prev"
          onClick={handlePrevious}
          aria-label="Previous slide"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          className="hero-nav hero-nav-next"
          onClick={handleNext}
          aria-label="Next slide"
        >
          <ChevronRight size={32} />
        </button>

        <div className="hero-indicators">
          {images.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
