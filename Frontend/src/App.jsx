import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Gallery from "./pages/Gallery.jsx";
import Courses from "./pages/Courses.jsx";
import "./styles/announcement.css";

function App() {
  const announcements = [
    "Annual Function",
    "Admission 2025",
    "About School"
  ];

  return (
    <Router>
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

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </Router>
  );
}

export default App;