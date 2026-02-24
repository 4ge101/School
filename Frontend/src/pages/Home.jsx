import { useState, useEffect } from "react";
import Image1 from "../assets/images/2.jpeg";
import Image2 from "../assets/images/3.jpg";
import Image3 from "../assets/images/4.jpg";
import "../styles/home.css";
// import Footer from "../components/Footer";
import {
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
  BookOpen,
  Building2,
  Sparkles,
  Target,
  Heart,
  Lightbulb,
  Eye,
  Compass,
  Flag,
  TrendingUp,
  GraduationCap,
  Star,
  Laptop,
  TreePine,
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
  { id: 1, icon: Users, value: "2500+", label: "Students" },
  { id: 2, icon: Award, value: "30+", label: "Years of Excellence" },
  { id: 3, icon: BookOpen, value: "Class 2-12", label: "Grade Levels" },
  { id: 4, icon: Building2, value: "1990", label: "Established" },
];

const features = [
  {
    id: 1,
    icon: Sparkles,
    title: "Quality Education",
    description:
      "Providing strong academic foundation with modern teaching methods.",
  },
  {
    id: 2,
    icon: Target,
    title: "Experienced Teachers",
    description:
      "Dedicated and skilled faculty members committed to student growth.",
  },
  {
    id: 3,
    icon: Heart,
    title: "Inclusive Environment",
    description: "Equal opportunity for all students regardless of background.",
  },
  {
    id: 4,
    icon: Lightbulb,
    title: "Modern Learning",
    description:
      "Blending traditional values with innovative teaching approaches.",
  },
];

const visionPoints = [
  "To be a leading institution that nurtures well-rounded individuals equipped for the challenges of the modern world.",
  "To foster a culture of lifelong learning, critical thinking, and ethical values among our students.",
  "To create graduates who are confident, responsible, and ready to contribute meaningfully to society.",
];

const missionPoints = [
  "Deliver high-quality, inclusive education accessible to all students regardless of their socioeconomic background.",
  "Cultivate a safe, respectful, and stimulating learning environment that encourages curiosity and creativity.",
  "Strengthen partnerships between teachers, parents, and the community to support every student's holistic development.",
  "Uphold academic excellence while instilling discipline, cultural values, and a sense of civic responsibility.",
];

const historyEvents = [
  {
    year: "1990",
    icon: Flag,
    title: "School Founded",
    description:
      "Satyanarayan School was established as a government institution with a mission to provide quality education to the local community. It began with a handful of classrooms and a dedicated team of founding teachers.",
  },
  {
    year: "1995",
    icon: TrendingUp,
    title: "Rapid Growth",
    description:
      "Within five years, student enrollment grew significantly. New classrooms were constructed and additional teaching staff were appointed to meet the rising demand for education in the region.",
  },
  {
    year: "2000",
    icon: GraduationCap,
    title: "Higher Secondary Introduced",
    description:
      "The school expanded its academic program by introducing Grade 11 and 12, enabling students to pursue higher secondary education without leaving their community.",
  },
  {
    year: "2005",
    icon: Star,
    title: "Academic Excellence Award",
    description:
      "Satyanarayan School received recognition from the district education board for outstanding academic performance and high student pass rates in national examinations.",
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
      {/* ── Carousel ── */}
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

      {/* ── Stats ── */}
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

      {/* ── About ── */}
      <div className="about-container">
        <div className="about-left">
          <div className="about-title">
            <h1>About Us</h1>
            <div className="title-accent"></div>
          </div>
          <div className="about-paragraph">
            <p>
              Satyanarayan School, established in 1990, is a respected
              government educational institution committed to providing quality
              education to students from diverse backgrounds. Since its
              foundation, the school has played an important role in shaping
              young minds and contributing to the academic and moral development
              of the community.
            </p>
            <p>
              As a government school, Satyanarayan School focuses on accessible
              and inclusive education for all. The institution is divided into
              two academic streams: Nepali Medium and English Medium. This
              dual-medium system allows students to learn in the language that
              best supports their academic growth and future goals.
            </p>
            <p>
              The school strives to maintain a balanced approach to education by
              combining strong academic foundations with character development,
              discipline, and community values. For over three decades,
              Satyanarayan School has remained dedicated to nurturing
              responsible, knowledgeable, and confident individuals prepared to
              contribute positively to society.
            </p>
          </div>
        </div>
        <div className="about-right">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.id} className="about-card">
                <div className="about-card-icon">
                  <IconComponent size={28} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Vision & Mission ── */}
      <div className="vm-section">
        <div className="vm-header">
          <h2>Our Vision &amp; Mission</h2>
          <p className="vm-header-sub">
            Guided by purpose, driven by passion — shaping futures since 1990.
          </p>
          <div className="vm-header-accent"></div>
        </div>
        <div className="vm-grid">
          <div className="vm-card">
            <div className="vm-card-top">
              <div className="vm-icon-wrap">
                <Eye size={32} />
              </div>
              <h3>Our Vision</h3>
            </div>
            <p className="vm-card-lead">
              To inspire every student to reach their fullest potential and
              become a responsible citizen of tomorrow.
            </p>
            <ul className="vm-points">
              {visionPoints.map((point, i) => (
                <li key={i}>
                  <span className="vm-bullet"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="vm-card">
            <div className="vm-card-top">
              <div className="vm-icon-wrap">
                <Compass size={32} />
              </div>
              <h3>Our Mission</h3>
            </div>
            <p className="vm-card-lead">
              To provide a nurturing and inclusive environment where quality
              education transforms lives and builds strong communities.
            </p>
            <ul className="vm-points">
              {missionPoints.map((point, i) => (
                <li key={i}>
                  <span className="vm-bullet"></span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── School History Timeline ── */}
      <div className="history-section">
        <div className="history-header">
          <h2>Our History</h2>
          <p className="history-header-sub">
            Three decades of shaping minds and building futures.
          </p>
          <div className="history-header-accent"></div>
        </div>

        <div className="timeline">
          {historyEvents.map((event, index) => {
            const IconComponent = event.icon;
            return (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div className="timeline-icon">
                      <IconComponent size={18} />
                    </div>
                    <span className="timeline-year">{event.year}</span>
                  </div>
                  <h3>{event.title}</h3>
                  <p>{event.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default Home;
