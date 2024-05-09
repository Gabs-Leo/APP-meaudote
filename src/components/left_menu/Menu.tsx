import "./menu.css"
import logo from "./../../images/logo_color.png"
import { MenuButton } from "./MenuButton"
import { Species } from "../../enums/Species"
import { useState } from "react"

interface MenuProps {
  filter?:boolean
}

export const Menu = (props:MenuProps) => {
  const [city, setCity] = useState<string>("Franca");


  return <>
    <div style={{width: `300px`}}>
      <div className="left-menu position-fixed">
        <img src={logo} alt="logo" className="mb-3" />
        <MenuButton path="/donations"     text="DOAÇÕES"      icon="volunteer_activism" />
        <MenuButton path="/notifications" text="NOTIFICAÇÕES" icon="notifications" />
        <MenuButton path="/pets"          text="PETS"         icon="pet_supplies"/>
        <MenuButton path="/profile"       text="PERFIL"       icon="person"/>
        {props.filter ? <Filter /> : <></>}
      </div>
    </div>
  </>
}

export const Filter = () => {
  return <div className="w-100 p-3">
    <hr />
    <h3>FILTROS</h3>
    <div className="mb-2">Tipo</div>
    {Object.values(Species).map(val => <div className="form-check">
      <input className="form-check-input" type="checkbox" name="species" id={val} />
      <label className="form-check-label" for={val}>{val}</label>
    </div>)}

    <hr />
    <label for="age" class="form-label">Idade Máxima</label>
    <input type="range" class="form-range" min="2" max="20" step="2" id="age"></input>
    
    <hr />
    <div class="form-group">
      <label for="exampleFormControlSelect1">Cidade</label>
      <select class="form-control" id="exampleFormControlSelect1">
        <option>Franca</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
    <div class="form-group my-4">
      <label for="exampleFormControlSelect1">Estado</label>
      <select class="form-control" id="exampleFormControlSelect1">
        <option>São Paulo</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
      </select>
    </div>
  </div>
}