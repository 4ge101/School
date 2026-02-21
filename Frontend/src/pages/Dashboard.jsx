import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LogOut,
  User,
  BookOpen,
  Calendar,
  BarChart3,
  Clock,
  Award,
  Mail,
} from "lucide-react";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (!storedUser || !token) {
      navigate("/login");
      return;
    }

    setUser(JSON.parse(storedUser));
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  const dashboardStats = [
    {
      id: 1,
      icon: BookOpen,
      label: "Courses Enrolled",
      value: "8",
      color: "blue",
    },
    { id: 2, icon: Award, label: "GPA", value: "3.8", color: "green" },
    { id: 3, icon: Calendar, label: "Classes Today", value: "5", color: "orange" },
    {
      id: 4,
      icon: BarChart3,
      label: "Attendance",
      value: "94%",
      color: "purple",
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      subject: "Mathematics",
      time: "10:00 AM",
      teacher: "Mr. Sharma",
      room: "A-101",
    },
    {
      id: 2,
      subject: "English",
      time: "11:30 AM",
      teacher: "Ms. Patel",
      room: "B-205",
    },
    {
      id: 3,
      subject: "Science",
      time: "1:00 PM",
      teacher: "Dr. Gupta",
      room: "C-310",
    },
  ];

  const recentAssignments = [
    {
      id: 1,
      title: "Math Assignment - Chapter 5",
      dueDate: "2026-02-25",
      status: "pending",
    },
    {
      id: 2,
      title: "Essay on Indian Independence",
      dueDate: "2026-02-28",
      status: "pending",
    },
    {
      id: 3,
      title: "Science Project",
      dueDate: "2026-02-22",
      status: "submitted",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Welcome, {user?.name || "Student"}!</h1>
          <p>Here's your academic dashboard</p>
        </div>
        <button className="logout-button" onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="dashboard-content">
        {/* Stats Grid */}
        <section className="stats-section">
          <div className="stats-grid">
            {dashboardStats.map((stat) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={stat.id}
                  className={`stat-card stat-${stat.color}`}
                >
                  <div className="stat-icon">
                    <IconComponent size={28} />
                  </div>
                  <div className="stat-content">
                    <p className="stat-label">{stat.label}</p>
                    <h3 className="stat-value">{stat.value}</h3>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="dashboard-grid">
          {/* Upcoming Classes */}
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

          {/* Recent Assignments */}
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
                  <span
                    className={`assignment-status ${assignment.status}`}
                  >
                    {assignment.status === "pending"
                      ? "Pending"
                      : "Submitted"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* User Profile Card */}
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