import "./navbar.css"
import LOGO from "../../images/logo_color.png"
import { Button } from "../button/Button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav id="nav">
      <div className="container">
        <div>
          <a href="#nav"><img id="logo" src={LOGO} alt="logo" /></a>
        </div>
        <div>
          <Button  link="/pets" text="ADOTAR" />
        </div>
        <div>
          <a className="menu-option" href="#projects">DOAR</a>
        </div>
        <div>
          <a className="menu-option" href="#contact">CONTATO</a>
        </div>
        <div>
          <a className="menu-option" href="#about">SOBRE</a>
        </div>
        <div>
          <Link style={{color: `var(--baseColor)`}} to={"/login"}>LOGIN</Link>
        </div>
      </div>
    </nav>
  );
}