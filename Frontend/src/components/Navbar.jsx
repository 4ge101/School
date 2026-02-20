import { NavLink } from "react-router-dom";
import "../styles/nav.css";
// import Logo from '../assets/logo.png'

function Navbar() {
  return (
    <div className="navigation">
      <div className="logo">
        {/* <img src={Logo} alt="school logo" /> */}
        <h1>Logo</h1>
      </div>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Contact
        </NavLink>
        <NavLink
          to="/gallery"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Gallery
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Courses
        </NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
