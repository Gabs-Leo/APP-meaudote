import { Menu } from "../components/left_menu/Menu"
import image from "./../images/cat.jpg";

export const Profile = () => {
  return <>
    <div>
      <div className="container d-flex">
        <Menu />
        <div className="w-100">
          <div className="w-100" style={{height: `230px`, backgroundImage: `url(${image})`, backgroundPosition: `center`, backgroundSize: `cover`}}></div>
          <div className="mx-5">
            <div style={{marginTop: `-75px`, border: `6px solid white`, width: `150px`, height: `150px`, backgroundColor: `red`, borderRadius: `100%`}}></div>

            <div>

            </div>
          </div>
          <div className="mx-5">
            <div>
              <h3>Usuário</h3>
              <h5>Franca - SP</h5>
            </div>
            <div>
              <h6>0 Pets Registrados</h6>
              <h6>0 Pets Registrados</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}