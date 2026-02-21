import { useState, useEffect } from "react";
import Image1 from "../assets/images/2.jpeg";
import Image2 from "../assets/images/3.jpg";
import Image3 from "../assets/images/4.jpg";
import "../styles/home.css";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  BookOpen,
  Building2,
} from "lucide-react";

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

const stats = [
  {
    id: 1,
    icon: Users,
    value: "2500+",
    label: "Students",
  },
  {
    id: 2,
    icon: Award,
    value: "30+",
    label: "Years of Excellence",
  },
  {
    id: 3,
    icon: BookOpen,
    value: "Class 2-12",
    label: "Grade Levels",
  },
  {
    id: 4,
    icon: Building2,
    value: "1990",
    label: "Established",
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

      <div className="stats-section">
        <div className="stats-grid">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div key={stat.id} className="stat-card">
                <div className="stat-icon">
                  <IconComponent size={40} />
                </div>
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="about-container">
        <div className="about-title">
          <h1>ABOUT US</h1>
        </div>
        <div className="about-paragraph">
          <p>
            Satyanarayan was established in 1990. By Nepal Goverment it it is an
            goverment school
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
