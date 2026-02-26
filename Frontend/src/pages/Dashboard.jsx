import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut, BookOpen, Clock,
  Award, Mail, Pencil, Check, X,
} from "lucide-react";
import "../styles/dashboard.css";
import { useStats, ICON_MAP } from "../context/StatsContext";

function Dashboard() {
  const navigate = useNavigate();
  const { homeStats, setHomeStats } = useStats();

  const [user] = useState(() => {
    const stored = localStorage.getItem("user");
    const token  = localStorage.getItem("token");
    if (!stored || !token) { navigate("/login"); return null; }
    return JSON.parse(stored);
  });

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [savedId,   setSavedId]   = useState(null);

  if (!user) return null;

  const startEdit = (id, value) => { setEditingId(id); setEditValue(value); };

  const confirmEdit = (id) => {
    const [group, rawId] = id.split("-");
    const numId = Number(rawId);

    if (group === "dash") {
      setDashboardStats((prev) =>
        prev.map((s) => (s.id === numId ? { ...s, value: editValue } : s))
      );
    } else {
      setHomeStats((prev) =>
        prev.map((s) => (s.id === numId ? { ...s, value: editValue } : s))
      );
    }
    setEditingId(null);
    setSavedId(id);
    setTimeout(() => setSavedId(null), 700);
  };

  const cancelEdit = () => { setEditingId(null); setEditValue(""); };

  const handleKeyDown = (e, id) => {
    if (e.key === "Enter")  confirmEdit(id);
    if (e.key === "Escape") cancelEdit();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Reusable stat card
  const StatCard = ({ id, iconName, label, value, color, icons }) => {
    const isEditing    = editingId === id;
    const isSaved      = savedId   === id;
    const IconComponent = icons[iconName] || BookOpen;

    return (
      <div className={`stat-card stat-${color || "blue"}${isSaved ? " saved" : ""}`}>
        <div className="stat-icon">
          <IconComponent size={28} />
        </div>
        <div className="stat-content">
          <p className="stat-label">{label}</p>
          {isEditing ? (
            <div className="stat-edit-row">
              <input
                className="stat-edit-input"
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, id)}
                autoFocus
              />
              <button className="stat-edit-btn confirm" onClick={() => confirmEdit(id)} title="Save">
                <Check size={14} />
              </button>
              <button className="stat-edit-btn cancel" onClick={cancelEdit} title="Cancel">
                <X size={14} />
              </button>
            </div>
          ) : (
            <div className="stat-value-row">
              <h3 className="stat-value">{value}</h3>
              <button
                className="stat-edit-trigger"
                onClick={() => startEdit(id, value)}
                title="Edit value"
              >
                <Pencil size={13} />
              </button>
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

        {/* School Stats — editable here, reflects live on Home */}
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

        <div className="dashboard-grid">
          <section className="card-section">
            <div className="section-header">
              <h2>Today's Schedule</h2>
              <Clock size={20} />
            </div>
            <div className="classes-list">
              {upcomingClasses.map((classItem) => (
                <div key={classItem.id} className="class-item">
                  <div className="class-time">{classItem.time}</div>
                  <div className="class-info">
                    <h4>{classItem.subject}</h4>
                    <p>{classItem.teacher}</p>
                    <small>Room {classItem.room}</small>
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
              {recentAssignments.map((assignment) => (
                <div key={assignment.id} className="assignment-item">
                  <div className="assignment-info">
                    <h4>{assignment.title}</h4>
                    <small>Due: {new Date(assignment.dueDate).toLocaleDateString()}</small>
                  </div>
                  <span className={`assignment-status ${assignment.status}`}>
                    {assignment.status === "pending" ? "Pending" : "Submitted"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

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
            <div className="detail-row">
              <span>Class</span>
              <strong>{user?.class || "12-A"}</strong>
            </div>
            <div className="detail-row">
              <span>Roll Number</span>
              <strong>{user?.rollNumber || "45"}</strong>
            </div>
            <div className="detail-row">
              <span>Joined</span>
              <strong>2022</strong>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Dashboard;