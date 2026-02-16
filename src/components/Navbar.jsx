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
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </div>
  );
}

export default Navbar;
