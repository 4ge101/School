import { Sparkles, Target, Heart, Lightbulb } from "lucide-react";
import PrincipalMessage from "../pages/Principalmessage";
import Facilities from "../pages/Facilities";
import Footer from "../components/Footer";

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

function About() {
  return (
    <>
      <div className="hero">
        <div className="hero-badge">✦ KNOW ABOUT US ✦</div>
        <h1 className="hero-title2">
	  ABOU US	
        </h1>
        <div className="decorative-line" />
        <p className="hero-subtitle2">
	  ABOUT OUR SCHOOL	
        </p>
      </div>

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

      <PrincipalMessage />
      <Facilities />
      <Footer />
    </>
  );
}

export default About;
