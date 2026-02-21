import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Gallery from "./pages/Gallery.jsx";
import Courses from "./pages/Courses.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./styles/announcement.css";

function App() {
  const announcements = [
    "📢 Admissions Open for 2026-27 Session — Apply Now!",
    "🏆 SSNS students science excibation ",
    "📅 Annual Sports Day: January 00, 2026",
    "📝 FInal-Term Examinations Begin January 00, 2026"
  ];

  return (
    <Router>
      <Routes>
        {/* Login - no navbar */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard - protected, no navbar */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Home with navbar */}
        <Route
          path="/"
          element={
            <>
              <div className="announcement-banner">
                <span className="school-name">Satyanarayan</span>
                <div className="announcement-content">
                  <div>
                    {announcements.map((announcement, index) => (
                      <div key={index} className="announcement-item">
                        {announcement}
                      </div>
                    ))}
                    {announcements.map((announcement, index) => (
                      <div key={`dup-${index}`} className="announcement-item">
                        {announcement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Navbar />
              <Home />
            </>
          }
        />

        {/* Other pages with navbar */}
        <Route
          path="/about"
          element={
            <>
              <div className="announcement-banner">
                <span className="school-name">Satyanarayan</span>
                <div className="announcement-content">
                  <div>
                    {announcements.map((announcement, index) => (
                      <div key={index} className="announcement-item">
                        {announcement}
                      </div>
                    ))}
                    {announcements.map((announcement, index) => (
                      <div key={`dup-${index}`} className="announcement-item">
                        {announcement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Navbar />
              <About />
            </>
          }
        />

        <Route
          path="/contact"
          element={
            <>
              <div className="announcement-banner">
                <span className="school-name">Satyanarayan</span>
                <div className="announcement-content">
                  <div>
                    {announcements.map((announcement, index) => (
                      <div key={index} className="announcement-item">
                        {announcement}
                      </div>
                    ))}
                    {announcements.map((announcement, index) => (
                      <div key={`dup-${index}`} className="announcement-item">
                        {announcement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Navbar />
              <Contact />
            </>
          }
        />

        <Route
          path="/gallery"
          element={
            <>
              <div className="announcement-banner">
                <span className="school-name">Satyanarayan</span>
                <div className="announcement-content">
                  <div>
                    {announcements.map((announcement, index) => (
                      <div key={index} className="announcement-item">
                        {announcement}
                      </div>
                    ))}
                    {announcements.map((announcement, index) => (
                      <div key={`dup-${index}`} className="announcement-item">
                        {announcement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Navbar />
              <Gallery />
            </>
          }
        />

        <Route
          path="/courses"
          element={
            <>
              <div className="announcement-banner">
                <span className="school-name">Satyanarayan</span>
                <div className="announcement-content">
                  <div>
                    {announcements.map((announcement, index) => (
                      <div key={index} className="announcement-item">
                        {announcement}
                      </div>
                    ))}
                    {announcements.map((announcement, index) => (
                      <div key={`dup-${index}`} className="announcement-item">
                        {announcement}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Navbar />
              <Courses />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;