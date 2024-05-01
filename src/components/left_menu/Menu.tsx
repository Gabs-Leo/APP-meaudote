import "./menu.css"
import logo from "./../../images/logo_color.png"
import { MenuButton } from "./MenuButton"

export const Menu = () => {
  return <>
    <div className="w-20">
      <div className="left-menu">
        <img src={logo} alt="logo" className="mb-3" />
        <MenuButton path="/donations"     text="DOAÇÕES"      icon="volunteer_activism" />
        <MenuButton path="/notifications" text="NOTIFICAÇÕES" icon="notifications" />
        <MenuButton path="/pets"          text="PETS"         icon="pet_supplies"/>
        <MenuButton path="/profile"       text="PERFIL"       icon="person"/>
      </div>
    </div>
  </>
}