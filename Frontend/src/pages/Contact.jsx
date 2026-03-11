import { useState } from "react";
import "../styles/contact.css";
import Footer from "../components/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    role: "parent",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      role: "parent",
    });
  };

  const contacts = [
    {
      icon: "📍",
      label: "Address",
      value:
        "123 Knowledge Lane, Education Nagar\nMumbai, Maharashtra – 400001",
      link: null,
    },
    {
      icon: "📞",
      label: "Main Office",
      value: "+91 22 1234 5678",
      link: "tel:+912212345678",
    },
    {
      icon: "📱",
      label: "Admissions",
      value: "+91 98765 43210",
      link: "tel:+919876543210",
    },
    {
      icon: "✉️",
      label: "Email",
      value: "info@satyanarayan.edu.in",
      link: "mailto:info@satyanarayan.edu.in",
    },
    {
      icon: "🕐",
      label: "Office Hours",
      value: "Mon – Sat: 8:00 AM – 4:00 PM\nSunday: Closed",
      link: null,
    },
  ];

  const departments = [
    {
      name: "Principal's Office",
      email: "principal@satyanarayan.edu.in",
      phone: "+91 22 1234 5679",
    },
    {
      name: "Admissions Dept.",
      email: "admissions@satyanarayan.edu.in",
      phone: "+91 22 1234 5680",
    },
    {
      name: "Academic Affairs",
      email: "academics@satyanarayan.edu.in",
      phone: "+91 22 1234 5681",
    },
    {
      name: "Transport Office",
      email: "transport@satyanarayan.edu.in",
      phone: "+91 22 1234 5682",
    },
  ];

  return (
    <div className="contact-page">
      {/* Hero */}
      <div className="hero">
        <div className="hero-badge">✦ Get in Touch ✦</div>
        <h1 className="hero-title2">
          SATYANARAYAN
          <br />
          HIGH SCHOOL
        </h1>
        <div className="decorative-line" />
        <p className="hero-subtitle2">
          We're here to answer your questions and welcome your visit
        </p>
      </div>

      <hr className="divider-bar" />

      {/* Contact Info Cards */}
      <div className="section">
        <p className="section-title">Contact Information</p>
        <p className="section-sub">Reach us through any of these channels</p>

        <div className="info-grid">
          {contacts.map((c, i) => (
            <div className="info-card" key={i}>
              <div className="info-icon">{c.icon}</div>
              <div>
                <div className="info-label">{c.label}</div>
                <div className="info-value">
                  {c.link ? <a href={c.link}>{c.value}</a> : c.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Form + Map */}
        <div className="two-col">
          {/* Form */}
          <div className="form-card">
            <p className="form-eyebrow">Send a Message</p>
            <h2 className="form-heading">How can we help?</h2>

            <div className="role-tabs">
              {["parent", "student", "staff", "visitor"].map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`role-tab${formData.role === r ? " active" : ""}`}
                  onClick={() => setFormData({ ...formData, role: r })}
                >
                  {r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>

            <div className="form-row">
              <div className="field-group">
                <label className="field-label">Full Name *</label>
                <input
                  className="field-input"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                />
              </div>
              <div className="field-group">
                <label className="field-label">Phone Number</label>
                <input
                  className="field-input"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Email Address *</label>
              <input
                className="field-input"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
              />
            </div>

            <div className="field-group">
              <label className="field-label">Subject *</label>
              <select
                className="field-select"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                <option value="">Select a topic...</option>
                <option>Admissions Inquiry</option>
                <option>Fee Payment</option>
                <option>Academic Query</option>
                <option>Transport / Bus Route</option>
                <option>Event / Activities</option>
                <option>Complaint / Feedback</option>
                <option>Other</option>
              </select>
            </div>

            <div className="field-group">
              <label className="field-label">Message *</label>
              <textarea
                className="field-textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here..."
              />
            </div>

            <button className="submit-btn" type="button" onClick={handleSubmit}>
              Send Message →
            </button>

            {submitted && (
              <div className="success-msg">
                ✅ Message sent! We'll get back to you within 1-2 business days.
              </div>
            )}
          </div>

          {/* Map */}
          <div className="map-col">
            <p className="form-eyebrow">Find Us</p>
            <h2 className="form-heading">Our Location</h2>

            <div className="map-placeholder">
              <div className="map-pin">📍</div>
              <div className="map-text">SATYANARAYAN HIGH SCHOOL</div>
              <div className="map-address">
                123 Knowledge Lane, Education Nagar
                <br />
                Mumbai, Maharashtra – 400001
              </div>
              <a
                className="view-map-btn"
                href="https://maps.google.com/?q=Mumbai+Maharashtra"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      <hr className="divider-bar" />

      {/* Departments */}
      <div className="section dept-section">
        <p className="section-title">Department Contacts</p>
        <p className="section-sub">Reach the right team directly</p>
        <div className="dept-grid">
          {departments.map((d, i) => (
            <div className="dept-card" key={i}>
              <div className="dept-name">{d.name}</div>
              <div className="dept-detail">
                📞 <a href={`tel:${d.phone.replace(/\s/g, "")}`}>{d.phone}</a>
              </div>
              <div className="dept-detail">
                ✉️ <a href={`mailto:${d.email}`}>{d.email}</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
