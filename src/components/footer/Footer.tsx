import logo from "../../images/logo_color_text.png";
import "./footer.css";

export const Footer = () => {
  return (
    <footer className="mt-5">
      <div className="container d-flex justify-content-between">
        <div id="logo-with-text">
          <img src={logo} alt="LOGO.jpeg" />
        </div>
      </div>
      <div id="footer-copyright">
        <div className="container">Copyright © 2024 MeAudote.</div>
      </div>
    </footer>
  );
};

/*
<div className="d-flex flex-column footer-menu">
  <h3>INSTITUCIONAL</h3>
  <a href="http://">Link 1</a>
  <a href="http://">Link 2</a>
  <a href="http://">Link 3</a>
  <a href="http://">Link 4</a>
  <a href="http://">Link 5</a>
  <a href="http://">Link 6</a>
</div>
<div className="d-flex flex-column footer-menu">
  <h3>MENU RÁPIDO</h3>
  <a href="http://">Link 1</a>
  <a href="http://">Link 2</a>
  <a href="http://">Link 3</a>
</div>
*/
