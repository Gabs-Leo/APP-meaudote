import "./navbar.css"
import LOGO from "../../images/logo_color.png"

export const Navbar = () => {
  return (
    <nav id="nav">
      <div className="container">
        <div>
          <a href="#nav"><img id="logo" src={LOGO} alt="logo" /></a>
        </div>
        <div>
            <a className="menu-option" href="#header">INICIO</a>
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
            <a id="adopt-nav-button" href="#services">ADOTAR</a>
        </div>
      </div>
    </nav>
  );
}