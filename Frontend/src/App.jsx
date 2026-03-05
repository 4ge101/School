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
import { StatsProvider } from "./context/StatsContext.jsx";
import { PrincipalProvider } from "./context/PrincipalContext.jsx";
import { GalleryProvider } from "./context/GalleryContext.jsx";
import "./styles/announcement.css";

const announcements = [
  "📢 Admissions Open for 2026-27 Session — Apply Now!",
  "🏆 SSNS students science excibation ",
  "📅 Annual Sports Day: January 00, 2026",
  "📝 FInal-Term Examinations Begin January 00, 2026",
];

function PageLayout({ children }) {
  return (
    <>
      <div className="announcement-banner">
        <span className="school-name">Satyanarayan</span>
        <div className="announcement-content">
          <div>
            {[...announcements, ...announcements].map((a, i) => (
              <div key={i} className="announcement-item">{a}</div>
            ))}
          </div>
        </div>
      </div>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <GalleryProvider>
    <StatsProvider>
      <PrincipalProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="/"        element={<PageLayout><Home /></PageLayout>} />
            <Route path="/about"   element={<PageLayout><About /></PageLayout>} />
            <Route path="/contact" element={<PageLayout><Contact /></PageLayout>} />
            <Route path="/gallery" element={<PageLayout><Gallery /></PageLayout>} />
            <Route path="/courses" element={<PageLayout><Courses /></PageLayout>} />
          </Routes>
        </Router>
      </PrincipalProvider>
    </StatsProvider>
    </GalleryProvider>
  );
}

export default App;