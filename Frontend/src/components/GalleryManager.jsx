import { useState, useRef, useCallback } from "react";
import { Image, Upload, Plus, Trash2, ChevronDown, Tag } from "lucide-react";
import { useGallery, GALLERY_CATEGORIES } from "../context/GalleryContext";
import "../styles/galleryManager.css";

const ALL_FILTERS = ["All", ...GALLERY_CATEGORIES];
const RECENT_MS   = 10_000; // highlight for 10s after upload

export default function GalleryManager() {
  const { images, addImages, deleteImage } = useGallery();

  const [open,      setOpen]      = useState(true);
  const [filter,    setFilter]    = useState("All");
  const [caption,   setCaption]   = useState("");
  const [category,  setCategory]  = useState("Events");
  const [previews,  setPreviews]  = useState([]); // { src, name }
  const [uploading, setUploading] = useState(false);
  const [savedAt,   setSavedAt]   = useState(null); // timestamp of last save
  const [dragOver,  setDragOver]  = useState(false);
  const fileRef                   = useRef();

  /* ── Convert selected files → base64 previews ── */
  const processFiles = useCallback((files) => {
    const valid = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!valid.length) return;

    Promise.all(
      valid.map(
        (file) =>
          new Promise((res) => {
            const r = new FileReader();
            r.onload = (ev) => res({ src: ev.target.result, name: file.name });
            r.readAsDataURL(file);
          })
      )
    ).then((results) => setPreviews((prev) => [...prev, ...results]));
  }, []);

  const onFileInput = (e) => { processFiles(e.target.files); e.target.value = ""; };

  /* ── Drag & drop ── */
  const onDragOver  = (e) => { e.preventDefault(); setDragOver(true);  };
  const onDragLeave = ()  => setDragOver(false);
  const onDrop      = (e) => {
    e.preventDefault();
    setDragOver(false);
    processFiles(e.dataTransfer.files);
  };

  const removePreview = (idx) =>
    setPreviews((prev) => prev.filter((_, i) => i !== idx));

  /* ── Upload: push to context → instantly visible on Gallery page ── */
  const handleUpload = () => {
    if (!previews.length) return;
    setUploading(true);

    const now = Date.now();
    const newImgs = previews.map((p, i) => ({
      id:         `img-${now}-${i}`,
      src:        p.src,
      caption:    caption.trim(),
      category,
      uploadedAt: new Date().toISOString(),
      _ts:        now,
    }));

    addImages(newImgs);      // updates context + localStorage instantly
    setPreviews([]);
    setCaption("");
    setUploading(false);
    setSavedAt(now);
    setTimeout(() => setSavedAt(null), 3000);
  };

  /* ── Filtered view for manage section ── */
  const filtered = filter === "All"
    ? images
    : images.filter((img) => img.category === filter);

  const isNew = (img) => img._ts && Date.now() - img._ts < RECENT_MS;

  return (
    <section className="gm-section">
      {/* ── Header ── */}
      <div className="gm-header" onClick={() => setOpen((o) => !o)}>
        <div className="gm-header-left">
          <div className="gm-header-icon">
            <Image size={17} />
          </div>
          <span className="gm-header-title">Gallery Manager</span>
          <span className="live-badge">Live on Gallery Page</span>
        </div>
        <ChevronDown
          size={18}
          className={`gm-header-chevron${open ? " open" : ""}`}
        />
      </div>

      {open && (
        <div className="gm-body">

          {/* ── Drop zone ── */}
          <div
            className={`gm-drop-zone${dragOver ? " dragover" : ""}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="gm-drop-zone-icon">
              <Upload size={22} />
            </div>
            <h4>Drop images here or <strong>click to browse</strong></h4>
            <p>JPG · PNG · WebP · Multiple files supported</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={onFileInput}
            />
          </div>

          {/* ── Preview strip ── */}
          {previews.length > 0 && (
            <div className="gm-preview-strip">
              {previews.map((p, i) => (
                <div key={i} className="gm-preview-item">
                  <img src={p.src} alt={p.name} />
                  <button
                    className="gm-preview-remove"
                    onClick={() => removePreview(i)}
                    title="Remove"
                  >×</button>
                </div>
              ))}
            </div>
          )}

          {/* ── Caption + Category ── */}
          <div className="gm-form-row">
            <div className="gm-field">
              <label><Tag size={10} style={{ display: "inline", marginRight: 4 }} />Caption (optional)</label>
              <input
                type="text"
                placeholder="e.g. Annual Sports Day 2026"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUpload()}
              />
            </div>
            <div className="gm-field">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {GALLERY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Upload button ── */}
          <div className="gm-upload-row">
            <button
              className={`gm-upload-btn${uploading ? " uploading" : ""}`}
              disabled={uploading || previews.length === 0}
              onClick={handleUpload}
            >
              <Plus size={16} />
              {uploading
                ? "Uploading…"
                : previews.length > 0
                  ? `Upload ${previews.length} photo${previews.length > 1 ? "s" : ""}`
                  : "Upload Photos"}
            </button>

            {savedAt && (
              <span className="gm-save-ok">
                ✅ {images.length > 0 ? "Added to Gallery!" : "Uploaded!"}
              </span>
            )}
          </div>

          <hr className="gm-divider" />

          {/* ── Manage existing ── */}
          <div className="gm-manage-top">
            <div className="gm-manage-title">
              Manage Photos
              <span className="gm-count-chip">{filtered.length}</span>
            </div>
            <div className="gm-pills">
              {ALL_FILTERS.map((cat) => (
                <button
                  key={cat}
                  className={`gm-pill${filter === cat ? " active" : ""}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="gm-empty-mini">
              <div className="gm-empty-mini-icon">🖼️</div>
              <p>No photos yet — upload some above ↑</p>
            </div>
          ) : (
            <div className="gm-grid">
              {filtered.map((img) => (
                <div key={img.id} className="gm-img-tile">
                  <img src={img.src} alt={img.caption || img.category} loading="lazy" />
                  {isNew(img) && <span className="gm-new-badge">New</span>}
                  <div className="gm-img-tile-overlay">
                    <span className="gm-tile-category">{img.category}</span>
                    {img.caption && (
                      <p className="gm-tile-caption">{img.caption}</p>
                    )}
                    <button
                      className="gm-tile-delete"
                      onClick={() => deleteImage(img.id)}
                      title="Delete photo"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      )}
    </section>
  );
}