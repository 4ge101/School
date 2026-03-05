import {
  MapPin, Phone, Mail, Facebook, Instagram, Youtube,
  GraduationCap, ArrowRight, Heart
} from "lucide-react";
import "../styles/footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-wave-wrap">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" fill="#fefce8"/>
        </svg>
      </div>

      <div className="footer-body">
        <div className="footer-container">

          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <GraduationCap size={22} color="#ffffff" />
              </div>
              <span>SATYANARAYAN</span>
            </div>
            <p className="footer-tagline">
              Empowering students with knowledge, creativity, and leadership
              for a brighter tomorrow.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-btn" aria-label="Facebook"><Facebook size={16} /></a>
              <a href="#" className="footer-social-btn" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="#" className="footer-social-btn" aria-label="YouTube"><Youtube size={16} /></a>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Quick Links</h3>
            <ul className="footer-links">
              {["Home", "About Us", "Courses", "Gallery", "Contact"].map((link) => (
                <li key={link}><a href="#"><ArrowRight size={13} />{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Academics</h3>
            <ul className="footer-links">
              {["Admissions", "Examinations", "Results", "Library", "Events"].map((link) => (
                <li key={link}><a href="#"><ArrowRight size={13} />{link}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title">Contact Us</h3>
            <ul className="footer-contact-list">
              <li>
                <div className="footer-contact-icon"><MapPin size={14} /></div>
                <span>Ramchok, Kavrepalanchok, Nepal</span>
              </li>
              <li>
                <div className="footer-contact-icon"><Phone size={14} /></div>
                <span>+977 98XXXXXXXX</span>
              </li>
              <li>
                <div className="footer-contact-icon"><Mail size={14} /></div>
                <span>info@satyanarayan.edu.np</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <span>© {currentYear} Satyanarayan School. All Rights Reserved.</span>
          <span className="footer-made">
            Made by{" "}
            <a
              href="https://AlixSami.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-portfolio-link"
            >
              Mohammad Sami Ali
            </a>
          </span>
        </div>

      </div>
    </footer>
  );
};

export default Footer;