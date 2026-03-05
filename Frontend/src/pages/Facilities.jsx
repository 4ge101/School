import {
  Monitor,
  Droplets,
  GraduationCap,
  BookOpen,
  FlaskConical,
  Bus,
  ShieldCheck,
  Wifi,
  Trophy,
  Utensils,
  HeartPulse,
  TreePine,
  Music2,
} from "lucide-react";
import "../styles/Facilities.css";

const facilities = [
  {
    id: 1,
    icon: Monitor,
    title: "Smart Education",
    tag: "Digital",
    description:
      "Modern smart boards, digital classrooms and e-learning tools that make every lesson engaging and interactive.",
    variant: "horizontal",
  },
  {
    id: 2,
    icon: Droplets,
    title: "Clean Water",
    tag: "Health",
    description:
      "Purified drinking water available throughout the campus for all students and staff.",
    variant: "default",
  },
  {
    id: 3,
    icon: GraduationCap,
    title: "High Graduation Cert.",
    tag: "Certified",
    description:
      "Nationally recognized certificates accepted by top universities across Nepal and beyond.",
    variant: "default",
  },
  {
    id: 4,
    icon: BookOpen,
    title: "Rich Library",
    tag: "Knowledge",
    description:
      "Thousands of books, journals and reference materials for every student.",
    variant: "default",
  },
  {
    id: 5,
    icon: FlaskConical,
    title: "Science Labs",
    tag: "Practical",
    description:
      "Fully equipped Physics, Chemistry and Biology laboratories. Hands-on experiments that bring science to life for every student.",
    variant: "tall",
  },
  {
    id: 6,
    icon: Bus,
    title: "School Transport",
    tag: "Safe Rides",
    description:
      "Safe and reliable bus service covering all major routes across the community.",
    variant: "default",
  },
  {
    id: 7,
    icon: ShieldCheck,
    title: "Safe Campus",
    tag: "Security",
    description:
      "24/7 security, CCTV surveillance and a fully safe environment for every student.",
    variant: "default",
  },
  {
    id: 8,
    icon: Wifi,
    title: "Internet Access",
    tag: "Connected",
    description:
      "High-speed Wi-Fi across campus to support digital learning and research.",
    variant: "default",
  },
  {
    id: 9,
    icon: Trophy,
    title: "Sports Facilities",
    tag: "Athletics",
    description:
      "Outdoor and indoor sports grounds for cricket, football, basketball and athletics — keeping students active and competitive.",
    variant: "horizontal",
  },
  {
    id: 10,
    icon: Utensils,
    title: "School Canteen",
    tag: "Nutrition",
    description: "Hygienic and affordable meals prepared fresh every day.",
    variant: "default",
  },
  {
    id: 11,
    icon: HeartPulse,
    title: "Health & Medical",
    tag: "Wellness",
    description:
      "On-campus medical room with a trained nurse for health emergencies.",
    variant: "default",
  },
  {
    id: 12,
    icon: TreePine,
    title: "Green Campus",
    tag: "Eco",
    description:
      "A clean, green and eco-friendly campus promoting environmental awareness.",
    variant: "default",
  },
  {
    id: 13,
    icon: Music2,
    title: "Music & Arts",
    tag: "Creative",
    description:
      "Dedicated music room and art studio where students explore their creative talents and express themselves freely.",
    variant: "default",
  },
];

function Facilities() {
  return (
    <section className="facilities-section">
      <div className="facilities-texture" />
      <div className="facilities-inner">
        <div className="facilities-header">
          <span className="facilities-eyebrow">✦ What We Offer</span>
          <h2>
            Our <span>Facilities</span>
          </h2>
          <div className="facilities-accent" />
          <p>
            Satyanarayan School provides a well-rounded environment with modern
            resources designed to support every student's academic and personal
            growth.
          </p>
        </div>

        <div className="facilities-grid">
          {facilities.map((f, i) => {
            const Icon = f.icon;
            const isTall = f.variant === "tall";
            const isHorizontal = f.variant === "horizontal";

            return (
              <div
                key={f.id}
                className={[
                  "facility-card",
                  isTall ? "facility-card--tall" : "",
                  isHorizontal ? "facility-card--horizontal" : "",
                ]
                  .join(" ")
                  .trim()}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="facility-card-bar" />

                {/* Decorative circles for tall card */}
                {isTall && (
                  <>
                    <div className="facility-deco-circle" />
                    <div className="facility-deco-circle2" />
                  </>
                )}

                <div
                  className={
                    isTall ? "facility-card-inner" : "facility-wrapper"
                  }
                >
                  <div className="facility-icon-wrap">
                    <Icon
                      size={isTall || isHorizontal ? 28 : 24}
                      color={isTall ? "#92400e" : "#ca8a04"}
                      strokeWidth={1.8}
                    />
                  </div>

                  <div className="facility-text">
                    <h3>{f.title}</h3>
                    <p>{f.description}</p>
                  </div>

                  <span className="facility-tag">✦ {f.tag}</span>
                </div>

                {!isTall && (
                  <span className="facility-card-number">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Facilities;
