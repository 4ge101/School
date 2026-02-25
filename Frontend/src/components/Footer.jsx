import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-wave"></div>

      <div className="footer-container">
        <div className="footer-brand">
          <h2>SATYANARAYAN</h2>
          <p>
            Empowering students with knowledge, creativity, and leadership for
            a brighter tomorrow.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Admissions</a></li>
            <li><a href="#">Academics</a></li>
            <li><a href="#">Events</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>📍 Ramchok, Nepal</p>
          <p>📞 +977 98XXXXXXXX</p>
          <p>✉ info@sunriseacademy.edu</p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Sunrise Academy. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;