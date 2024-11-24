import "./navbar.css";
import LOGO from "../../images/logo_color.png";
import { Button } from "../button/Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Hamburger from "hamburger-react";

export const Navbar = () => {

  const [isOpen, setOpen] = useState(false);
  const [menuWidth, setMenuWidth] = useState("0%");
  const handleOpen = () => {
    setOpen(!isOpen)
    if(!isOpen)
      setMenuWidth("100%")
    else
      setMenuWidth("0%")
  }

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
        <div className="pc-menu">
          <Link className="menu-option" to={"/contact"}>CONTATO</Link>
        </div>
        <div className="pc-menu">
          <Link className="menu-option" to={"/about"}>SOBRE</Link>
        </div>
        <div className="pc-menu">
          <Link className="menu-option" style={{ color: `var(--baseColor)`, fontWeight: `bold` }} to={"/login"}>
            LOGIN
          </Link>
        </div>
        <div className="mobile-menu" style={{position: "relative"}}>
          <Hamburger color="var(--baseColor)" toggled={isOpen} toggle={handleOpen} />
        </div>

        <div className="mobile-menu menu-screen" style={{width: menuWidth}} onClick={() => handleOpen()}>
            <Link className="menu-option" to={"/"}>INICIO</Link>
            <Link className="menu-option" to={"/contact"}>CONTATO</Link>
            <Link className="menu-option" to={"/about"}>SOBRE</Link>
            <Link className="menu-option" style={{ color: `var(--baseColor)`, fontWeight: `bold` }} to={"/login"}>
              LOGIN
            </Link>
        </div>
      </div>
    </nav>
  );
};
