import { useState, useEffect, useRef } from "react";
import { ZoomIn, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useGallery, GALLERY_CATEGORIES } from "../context/GalleryContext";
import "../styles/gallery.css";

const ALL_CATEGORIES = ["All", ...GALLERY_CATEGORIES];

export default function Gallery() {
  const { images }              = useGallery();   // live — re-renders on every upload
  const [activeFilter, setFilter] = useState("All");
  const [lightbox,   setLightbox] = useState(null); // index into `filtered`
  const touchStartX               = useRef(null);

  /* ── Derived filtered list ── */
  const filtered = activeFilter === "All"
    ? images
    : images.filter((img) => img.category === activeFilter);

  /* ── Lightbox helpers ── */
  const openLightbox  = (idx) => setLightbox(idx);
  const closeLightbox = ()    => setLightbox(null);
  const prevImg = () => setLightbox((i) => (i - 1 + filtered.length) % filtered.length);
  const nextImg = () => setLightbox((i) => (i + 1) % filtered.length);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const onKey = (e) => {
      if (lightbox === null) return;
      if (e.key === "ArrowLeft")  prevImg();
      if (e.key === "ArrowRight") nextImg();
      if (e.key === "Escape")     closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, filtered.length]);

  /* ── Touch swipe ── */
  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) diff > 0 ? nextImg() : prevImg();
    touchStartX.current = null;
  };

  return (
    <div className="glr-page">

      {/* ── Hero ── */}
      <div className="glr-hero">
        <span className="glr-hero-eyebrow">Satyanarayan Nagar Nigam School</span>
        <h1>Our <em>Gallery</em></h1>
        <p className="glr-hero-sub">
          Memories, milestones &amp; moments captured from school life
        </p>
        <div className="glr-hero-line" />
      </div>

      {/* ── Sticky filter bar ── */}
      <div className="glr-filter-bar">
        <span className="glr-filter-label">Filter :</span>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`glr-filter-btn${activeFilter === cat ? " active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Count ── */}
      <div className="glr-count-bar">
        <span className="glr-count-text">
          {filtered.length} {filtered.length === 1 ? "photo" : "photos"}
        </span>
        {activeFilter !== "All" && (
          <span className="glr-count-tag">{activeFilter}</span>
        )}
      </div>

      {/* ── Grid / Empty ── */}
      {filtered.length === 0 ? (
        <div className="glr-empty">
          <div className="glr-empty-icon">🖼️</div>
          <h3>No photos here yet</h3>
          <p>
            {activeFilter === "All"
              ? "Upload images from the Dashboard to see them appear here instantly."
              : `No photos in the "${activeFilter}" category yet.`}
          </p>
        </div>
      ) : (
        <div className="glr-grid">
          {filtered.map((img, idx) => (
            <div
              key={img.id}
              className="glr-card"
              style={{ animationDelay: `${(idx % 16) * 35}ms` }}
              onClick={() => openLightbox(idx)}
            >
              <img
                src={img.src}
                alt={img.caption || img.category}
                loading="lazy"
              />
              <button className="glr-zoom-btn" tabIndex={-1}>
                <ZoomIn size={15} />
              </button>
              <div className="glr-card-footer">
                {img.caption
                  ? <span className="glr-card-caption">{img.caption}</span>
                  : <span />
                }
                <span className="glr-card-tag">{img.category}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Lightbox ── */}
      {lightbox !== null && filtered[lightbox] && (
        <div
          className="glr-lightbox"
          onClick={closeLightbox}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button className="glr-lb-close" onClick={closeLightbox}>
            <X size={18} />
          </button>

          {/* Prev */}
          {filtered.length > 1 && (
            <button
              className="glr-lb-nav glr-lb-prev"
              onClick={(e) => { e.stopPropagation(); prevImg(); }}
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Image */}
          <div
            className="glr-lb-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              className="glr-lb-img"
              src={filtered[lightbox].src}
              alt={filtered[lightbox].caption || filtered[lightbox].category}
            />
            <div className="glr-lb-info">
              {filtered[lightbox].caption && (
                <p className="glr-lb-caption">{filtered[lightbox].caption}</p>
              )}
              <p className="glr-lb-tag">{filtered[lightbox].category}</p>
              <p className="glr-lb-counter">
                {lightbox + 1} / {filtered.length}
              </p>
            </div>
          </div>

          {/* Next */}
          {filtered.length > 1 && (
            <button
              className="glr-lb-nav glr-lb-next"
              onClick={(e) => { e.stopPropagation(); nextImg(); }}
            >
              <ChevronRight size={22} />
            </button>
          )}
        </div>
      )}

    </div>
  );
}