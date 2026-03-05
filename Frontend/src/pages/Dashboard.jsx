import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut, BookOpen, Clock, Mail, Pencil, Check, X,
  User, MessageSquare, BarChart2, Image, Plus, Trash2,
  ChevronDown, ChevronUp, Save, RotateCcw, Upload,
} from "lucide-react";

import "../styles/dashboard.css";
import "../styles/PrincipalEditor.css";
import "../styles/galleryManager.css";

import { useStats, ICON_MAP }   from "../context/StatsContext";
import { usePrincipal }          from "../context/PrincipalContext";
import { useGallery, GALLERY_CATEGORIES } from "../context/GalleryContext";

/* ─────────────────────────────────────────────
   GALLERY MANAGER  (inline — no extra import)
───────────────────────────────────────────── */
const ALL_GALLERY_FILTERS = ["All", ...GALLERY_CATEGORIES];
const RECENT_MS = 10_000;

function GalleryManager() {
  const { images, addImages, deleteImage } = useGallery();

  const [open,      setOpen]      = useState(true);
  const [filter,    setFilter]    = useState("All");
  const [category,  setCategory]  = useState("Events");
  const [previews,  setPreviews]  = useState([]);
  const [uploading, setUploading] = useState(false);
  const [savedAt,   setSavedAt]   = useState(null);
  const [dragOver,  setDragOver]  = useState(false);
  const fileRef = useRef();

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
  const onDragOver  = (e) => { e.preventDefault(); setDragOver(true); };
  const onDragLeave = ()  => setDragOver(false);
  const onDrop      = (e) => { e.preventDefault(); setDragOver(false); processFiles(e.dataTransfer.files); };
  const removePreview = (idx) => setPreviews((prev) => prev.filter((_, i) => i !== idx));

  const handleUpload = () => {
    if (!previews.length) return;
    setUploading(true);
    const now = Date.now();
    const newImgs = previews.map((p, i) => ({
      id:         `img-${now}-${i}`,
      src:        p.src,
      category,
      uploadedAt: new Date().toISOString(),
      _ts:        now,
    }));
    addImages(newImgs);
    setPreviews([]);
    setUploading(false);
    setSavedAt(now);
    setTimeout(() => setSavedAt(null), 3000);
  };

  const filtered = filter === "All" ? images : images.filter((img) => img.category === filter);
  const isNew    = (img) => img._ts && Date.now() - img._ts < RECENT_MS;

  return (
    <section className="gm-section">
      {/* Header */}
      <div className="gm-header" onClick={() => setOpen((o) => !o)}>
        <div className="gm-header-left">
          <div className="gm-header-icon"><Image size={17} /></div>
          <span className="gm-header-title">Gallery Manager</span>
          <span className="live-badge">Live on Gallery Page</span>
        </div>
        <ChevronDown size={18} className={`gm-header-chevron${open ? " open" : ""}`} />
      </div>

      {open && (
        <div className="gm-body">

          {/* Drop zone */}
          <div
            className={`gm-drop-zone${dragOver ? " dragover" : ""}`}
            onClick={() => fileRef.current?.click()}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <div className="gm-drop-zone-icon"><Upload size={22} /></div>
            <h4>Drop images here or <strong>click to browse</strong></h4>
            <p>JPG · PNG · WebP · Multiple files supported</p>
            <input ref={fileRef} type="file" accept="image/*" multiple style={{ display: "none" }} onChange={onFileInput} />
          </div>

          {/* Previews */}
          {previews.length > 0 && (
            <div className="gm-preview-strip">
              {previews.map((p, i) => (
                <div key={i} className="gm-preview-item">
                  <img src={p.src} alt={p.name} />
                  <button className="gm-preview-remove" onClick={() => removePreview(i)}>×</button>
                </div>
              ))}
            </div>
          )}

          {/* Category */}
          <div className="gm-form-row">
            <div className="gm-field">
              <label>Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {GALLERY_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Upload btn */}
          <div className="gm-upload-row">
            <button
              className={`gm-upload-btn${uploading ? " uploading" : ""}`}
              disabled={uploading || previews.length === 0}
              onClick={handleUpload}
            >
              <Plus size={16} />
              {uploading ? "Uploading…" : previews.length > 0 ? `Upload ${previews.length} photo${previews.length > 1 ? "s" : ""}` : "Upload Photos"}
            </button>
            {savedAt && <span className="gm-save-ok">✅ Added to Gallery!</span>}
          </div>

          <hr className="gm-divider" />

          {/* Manage */}
          <div className="gm-manage-top">
            <div className="gm-manage-title">
              Manage Photos
              <span className="gm-count-chip">{filtered.length}</span>
            </div>
            <div className="gm-pills">
              {ALL_GALLERY_FILTERS.map((cat) => (
                <button key={cat} className={`gm-pill${filter === cat ? " active" : ""}`} onClick={() => setFilter(cat)}>
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
                    <button className="gm-tile-delete" onClick={() => deleteImage(img.id)} title="Delete photo">
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

/* ─────────────────────────────────────────────
   MAIN DASHBOARD
───────────────────────────────────────────── */
function Dashboard() {
  const navigate = useNavigate();
  const { homeStats, setHomeStats } = useStats();
  const { principal, setPrincipal, loading, save } = usePrincipal();

  const [user] = useState(() => {
    const stored = localStorage.getItem("user");
    const token  = localStorage.getItem("token");
    if (!stored || !token) { navigate("/login"); return null; }
    return JSON.parse(stored);
  });

  // Principal draft state
  const [draft,          setDraft]          = useState(null);
  const [isDirty,        setIsDirty]        = useState(false);
  const [saving,         setSaving]         = useState(false);
  const [saveStatus,     setSaveStatus]     = useState(null); // "success" | "error"
  const [principalOpen,  setPrincipalOpen]  = useState(true);
  const [principalSection, setPrincipalSection] = useState("info");

  // School stats editing
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [savedId,   setSavedId]   = useState(null);

  // Sync draft when principal loads
  useEffect(() => {
    if (principal && !draft) {
      setDraft(JSON.parse(JSON.stringify(principal)));
    }
  }, [principal]);

  if (!user) return null;

  // ── Draft helpers ──
  const updateDraftField = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };
  const updateDraftParagraph = (index, value) => {
    setDraft((prev) => {
      const paragraphs = [...prev.paragraphs];
      paragraphs[index] = value;
      return { ...prev, paragraphs };
    });
    setIsDirty(true);
  };
  const addDraftParagraph = () => {
    setDraft((prev) => ({ ...prev, paragraphs: [...prev.paragraphs, "New paragraph text here."] }));
    setIsDirty(true);
  };
  const removeDraftParagraph = (index) => {
    setDraft((prev) => ({ ...prev, paragraphs: prev.paragraphs.filter((_, i) => i !== index) }));
    setIsDirty(true);
  };
  const updateDraftStat = (id, field, value) => {
    setDraft((prev) => ({
      ...prev,
      stats: prev.stats.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
    setIsDirty(true);
  };

  // ── Save principal ──
  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);
    try {
      await save(draft);
      setIsDirty(false);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 2500);
    } catch (err) {
      console.error("Save error:", err.message);
      if (err.message.includes("expired") || err.message.includes("log in")) {
        alert("Your session has expired. Please log in again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        return;
      }
      setSaveStatus("error");
      setTimeout(() => setSaveStatus(null), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    setDraft(JSON.parse(JSON.stringify(principal)));
    setIsDirty(false);
  };

  // ── School stat card ──
  const startEdit   = (id, value) => { setEditingId(id); setEditValue(value); };
  const cancelEdit  = ()          => { setEditingId(null); setEditValue(""); };
  const confirmEdit = (id) => {
    const [, rawId] = id.split("-");
    setHomeStats((prev) =>
      prev.map((s) => (s.id === Number(rawId) ? { ...s, value: editValue } : s))
    );
    setEditingId(null);
    setSavedId(id);
    setTimeout(() => setSavedId(null), 700);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const StatCard = ({ id, iconName, label, value, color, icons }) => {
    const isEditing     = editingId === id;
    const isSaved       = savedId   === id;
    const IconComponent = icons[iconName] || BookOpen;
    return (
      <div className={`stat-card stat-${color || "blue"}${isSaved ? " saved" : ""}`}>
        <div className="stat-icon"><IconComponent size={28} /></div>
        <div className="stat-content">
          <p className="stat-label">{label}</p>
          {isEditing ? (
            <div className="stat-edit-row">
              <input
                className="stat-edit-input"
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")  confirmEdit(id);
                  if (e.key === "Escape") cancelEdit();
                }}
                autoFocus
              />
              <button className="stat-edit-btn confirm" onClick={() => confirmEdit(id)}><Check size={14} /></button>
              <button className="stat-edit-btn cancel"  onClick={cancelEdit}><X size={14} /></button>
            </div>
          ) : (
            <div className="stat-value-row">
              <h3 className="stat-value">{value}</h3>
              <button className="stat-edit-trigger" onClick={() => startEdit(id, value)}><Pencil size={13} /></button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const upcomingClasses = [
    { id: 1, subject: "Mathematics", time: "10:00 AM", teacher: "Mr. Sharma",  room: "A-101" },
    { id: 2, subject: "English",     time: "11:30 AM", teacher: "Ms. Patel",   room: "B-205" },
    { id: 3, subject: "Science",     time: "1:00 PM",  teacher: "Dr. Gupta",   room: "C-310" },
  ];

  const recentAssignments = [
    { id: 1, title: "Math Assignment - Chapter 5",  dueDate: "2026-02-25", status: "pending"   },
    { id: 2, title: "Essay on Indian Independence", dueDate: "2026-02-28", status: "pending"   },
    { id: 3, title: "Science Project",              dueDate: "2026-02-22", status: "submitted" },
  ];

  return (
    <div className="dashboard-container">

      {/* ── Header ── */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {user?.name || "Student"}!</h1>
          <p>Here's your academic dashboard</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} /> Logout
        </button>
      </div>

      <div className="dashboard-content">

        {/* ══ SCHOOL STATS ══ */}
        <section className="stats-section">
          <h2 className="section-group-label">
            🏫 School Stats <span className="live-badge">Live on Home</span>
          </h2>
          <div className="stats-grid">
            {homeStats.map((stat, i) => {
              const colors = ["blue", "green", "orange", "purple"];
              return (
                <StatCard
                  key={`home-${stat.id}`}
                  id={`home-${stat.id}`}
                  iconName={stat.iconName}
                  label={stat.label}
                  value={stat.value}
                  color={colors[i % colors.length]}
                  icons={ICON_MAP}
                />
              );
            })}
          </div>
        </section>

        {/* ══ PRINCIPAL MESSAGE EDITOR ══ */}
        <section className="principal-editor-section">

          <div className="principal-editor-header" onClick={() => setPrincipalOpen((o) => !o)}>
            <div className="principal-editor-title">
              <User size={18} />
              <h2>Principal's Message Editor</h2>
              <span className="live-badge">Live on About Page</span>
              {isDirty && <span className="unsaved-badge">Unsaved changes</span>}
            </div>
            {principalOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>

          {principalOpen && (
            <div className="principal-editor-body">

              {/* Tabs */}
              <div className="principal-editor-tabs">
                {[
                  { id: "info",    icon: User,          label: "Profile Info" },
                  { id: "message", icon: MessageSquare, label: "Message Text" },
                  { id: "stats",   icon: BarChart2,     label: "Stats"        },
                  { id: "photo",   icon: Image,         label: "Photo"        },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`pe-tab${principalSection === tab.id ? " active" : ""}`}
                    onClick={() => setPrincipalSection(tab.id)}
                  >
                    <tab.icon size={15} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {loading || !draft ? (
                <p style={{ color: "#94a3b8", padding: "1rem" }}>Loading...</p>
              ) : (
                <>
                  {/* Profile Info */}
                  {principalSection === "info" && (
                    <div className="pe-fields">
                      {[
                        { field: "name",          label: "Full Name",         placeholder: "Ram Kumar Sharma"         },
                        { field: "initials",      label: "Initials (avatar)", placeholder: "RK"                      },
                        { field: "role",          label: "Role / Title",      placeholder: "Principal"                },
                        { field: "school",        label: "School Name",       placeholder: "Satyanarayan School"      },
                        { field: "qualification", label: "Qualification",     placeholder: "M.Ed, 20+ yrs experience" },
                      ].map(({ field, label, placeholder }) => (
                        <div key={field} className="pe-field">
                          <label>{label}</label>
                          <input
                            type="text"
                            value={draft[field] || ""}
                            placeholder={placeholder}
                            onChange={(e) => updateDraftField(field, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Message Text */}
                  {principalSection === "message" && (
                    <div className="pe-paragraphs">
                      <p className="pe-hint">Edit paragraphs below then click <strong>Save Changes</strong> to publish.</p>
                      {draft.paragraphs.map((para, i) => (
                        <div key={i} className="pe-para-row">
                          <label>Paragraph {i + 1}</label>
                          <div className="pe-para-input-row">
                            <textarea
                              rows={4}
                              value={para}
                              onChange={(e) => updateDraftParagraph(i, e.target.value)}
                            />
                            {draft.paragraphs.length > 1 && (
                              <button className="pe-remove-btn" onClick={() => removeDraftParagraph(i)}>
                                <Trash2 size={15} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button className="pe-add-para-btn" onClick={addDraftParagraph}>
                        <Plus size={15} /> Add Paragraph
                      </button>
                    </div>
                  )}

                  {/* Stats */}
                  {principalSection === "stats" && (
                    <div className="pe-stats">
                      <p className="pe-hint">Edit the quick-stats shown in the principal's signature.</p>
                      {draft.stats.map((stat) => (
                        <div key={stat.id} className="pe-stat-row">
                          <div className="pe-field">
                            <label>Number / Value</label>
                            <input
                              type="text"
                              value={stat.number}
                              onChange={(e) => updateDraftStat(stat.id, "number", e.target.value)}
                            />
                          </div>
                          <div className="pe-field">
                            <label>Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => updateDraftStat(stat.id, "label", e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Photo */}
                  {principalSection === "photo" && (
                    <div className="pe-photo-section">
                      <p className="pe-hint">Paste a URL or upload. Leave blank for initials avatar.</p>
                      <div className="pe-field">
                        <label>Image URL</label>
                        <input
                          type="text"
                          value={draft.photoUrl || ""}
                          placeholder="https://example.com/principal.jpg"
                          onChange={(e) => updateDraftField("photoUrl", e.target.value)}
                        />
                      </div>
                      <div className="pe-field" style={{ marginTop: "0.75rem" }}>
                        <label>Upload from device</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file) return;
                            const reader = new FileReader();
                            reader.onload = (ev) => updateDraftField("photoUrl", ev.target.result);
                            reader.readAsDataURL(file);
                          }}
                        />
                      </div>
                      <div className="pe-photo-preview">
                        {draft.photoUrl ? (
                          <img src={draft.photoUrl} alt="Principal" className="pe-photo-img" />
                        ) : (
                          <div className="pe-photo-placeholder">
                            <span>{draft.initials || "?"}</span>
                            <p>Initials avatar</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Save / Discard bar */}
                  <div className={`pe-action-bar${isDirty ? " visible" : ""}`}>
                    <span className="pe-action-hint">You have unsaved changes</span>
                    <div className="pe-action-buttons">
                      <button className="pe-discard-btn" onClick={handleDiscard} disabled={saving}>
                        <RotateCcw size={15} /> Discard
                      </button>
                      <button className="pe-save-btn" onClick={handleSave} disabled={saving}>
                        <Save size={15} />
                        {saving ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                    {saveStatus === "success" && <span className="pe-save-success">✅ Saved &amp; published live!</span>}
                    {saveStatus === "error"   && <span className="pe-save-error">❌ Save failed. Try again.</span>}
                  </div>
                </>
              )}
            </div>
          )}
        </section>

        {/* ══ GALLERY MANAGER ══ */}
        <GalleryManager />

        {/* ══ SCHEDULE & ASSIGNMENTS ══ */}
        <div className="dashboard-grid">
          <section className="card-section">
            <div className="section-header">
              <h2>Today's Schedule</h2>
              <Clock size={20} />
            </div>
            <div className="classes-list">
              {upcomingClasses.map((c) => (
                <div key={c.id} className="class-item">
                  <div className="class-time">{c.time}</div>
                  <div className="class-info">
                    <h4>{c.subject}</h4>
                    <p>{c.teacher}</p>
                    <small>Room {c.room}</small>
                  </div>
                  <div className="class-status">Join</div>
                </div>
              ))}
            </div>
          </section>

          <section className="card-section">
            <div className="section-header">
              <h2>Assignments</h2>
              <Mail size={20} />
            </div>
            <div className="assignments-list">
              {recentAssignments.map((a) => (
                <div key={a.id} className="assignment-item">
                  <div className="assignment-info">
                    <h4>{a.title}</h4>
                    <small>Due: {new Date(a.dueDate).toLocaleDateString()}</small>
                  </div>
                  <span className={`assignment-status ${a.status}`}>
                    {a.status === "pending" ? "Pending" : "Submitted"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ══ PROFILE ══ */}
        <section className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || "S"}
            </div>
            <div className="profile-info">
              <h3>{user?.name || "Student Name"}</h3>
              <p>{user?.email || "student@school.com"}</p>
              <small>Student ID: {user?.studentId || "STU001"}</small>
            </div>
          </div>
          <div className="profile-details">
            <div className="detail-row"><span>Class</span><strong>{user?.class || "12-A"}</strong></div>
            <div className="detail-row"><span>Roll Number</span><strong>{user?.rollNumber || "45"}</strong></div>
            <div className="detail-row"><span>Joined</span><strong>2022</strong></div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Dashboard;