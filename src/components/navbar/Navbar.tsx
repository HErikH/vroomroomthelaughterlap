import { NavLink } from "react-router";
import "./style.scss";

export function Navbar() {
  return (
    <nav className="navbar">
      <NavLink className="navbar__link" to="garage">Garage</NavLink>
      <NavLink className="navbar__link" to="winners">Winners</NavLink>
    </nav>
  );
}
