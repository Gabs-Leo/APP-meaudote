import "./navbar.css";
import LOGO from "../../images/logo_color.png";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav id="nav">
      <div className="container">
        <div>
          <Link to={"/"}>
            <img id="logo" src={LOGO} alt="logo" />
          </Link>
        </div>
        <div>
          <Button link="/pets" text="ADOTAR" />
        </div>
        <div>
          <Link className="menu-option" to={"/contact"}>CONTATO</Link>
        </div>
        <div>
          <Link className="menu-option" to={"/about"}>SOBRE</Link>
        </div>
        <div>
          <Link style={{ color: `var(--baseColor)`, fontWeight: `bold` }} to={"/login"}>
            LOGIN
          </Link>
        </div>
      </div>
    </nav>
  );
};
