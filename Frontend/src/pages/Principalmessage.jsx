import { Quote, GraduationCap } from "lucide-react";
import { usePrincipal } from "../context/PrincipalContext";
import "../styles/Principalmessage.css";

function PrincipalMessage() {
  const { principal, loading, error } = usePrincipal();

  if (loading) return (
    <section className="principal-section">
      <div className="principal-inner" style={{ textAlign: "center", padding: "3rem", color: "#94a3b8" }}>
        Loading principal message...
      </div>
    </section>
  );

  if (error || !principal) return null;

  const { initials, name, role, school, qualification, photoUrl, paragraphs, stats } = principal;

  return (
    <section className="principal-section">
      <div className="principal-section-texture" />
      <div className="principal-inner">

        {/* ── Header ── */}
        <div className="section-header">
          <span className="principal-eyebrow">✦ Leadership</span>
          <h2>Principal's <span>Message</span></h2>
          <div className="principal-title-accent" />
          <p>A word from our school's leadership</p>
        </div>

        {/* ── Card ── */}
        <div className="principal-card">

          {/* Left — Photo & Info */}
          <div className="principal-photo-col">
            <div className="principal-avatar">
              {photoUrl ? (
                <img src={photoUrl} alt={name} />
              ) : (
                <span className="principal-avatar-initials">{initials}</span>
              )}
            </div>

            <p className="principal-name">{name}</p>
            <p className="principal-role">{role}</p>
            <p className="principal-school">{school}</p>

            <div className="principal-badge">
              <GraduationCap size={14} />
              <span>{qualification}</span>
            </div>

            {/* Stats inside left panel */}
            <div className="principal-left-stats">
              {stats.map((stat) => (
                <div key={stat.id} className="principal-left-stat">
                  <span className="principal-left-stat-number">{stat.number}</span>
                  <span className="principal-left-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Message */}
          <div className="principal-message-col">
            <div className="quote-icon">
              <Quote size={40} strokeWidth={1.4} />
            </div>

            <h3>A Message to Our Students, Parents & Community</h3>

            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}

            {/* Signature */}
            <div className="principal-signature">
              <div>
                <p className="signature-text">
                  With warm regards,{" "}
                  <span className="signature-name">{name}</span>
                </p>
                <p className="signature-text">{role}, {school}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default PrincipalMessage;