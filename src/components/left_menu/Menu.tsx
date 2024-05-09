import "./menu.css"
import logo from "./../../images/logo_color.png"
import { MenuButton } from "./MenuButton"
import { Species } from "../../enums/Species"
import { useEffect, useState } from "react"
import { State } from "../../types/State"
import { locationApi } from "../../utils/api"
import { City } from "../../types/Cities"

interface MenuProps {
  filter?:boolean
}

export const Menu = (props:MenuProps) => {
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
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState<State>();

  const updateStates = async () => {
    await locationApi.get("/localidades/estados?orderBy=nome").then((response) => { 
      setStates(response.data as State[]);
      setSelectedState(states[0] || undefined);
    })
  }

  const updateCities = async () => {
    await locationApi.get(`/localidades/estados/${selectedState?.sigla || "SP"}/distritos?orderBy=nome`).then((response) => { 
      setCities(response.data as City[]);
    })
  }

  useEffect(() => {
    updateStates();
    updateCities();
  }, [])

  if(states == null || cities == null) {
    return <>loading</>
  }

  return <div className="w-100 p-3">
    <hr />
    <h3>FILTROS</h3>
    <div className="mb-2">Tipo</div>
    {Object.values(Species).map(val => <div className="form-check">
      <input className="form-check-input" checked type="checkbox" name="species" id={val} />
      <label className="form-check-label" htmlFor={val}>{val}</label>
    </div>)}

    <hr />
    <label htmlFor="age" className="form-label">Idade Máxima</label>
    <input type="range" className="form-range" min="2" max="20" step="2" id="age"></input>
    
    <hr />
    <div className="form-group">
      <label htmlFor="exampleFormControlSelect1">Estado</label>
      <select className="form-control" id="exampleFormControlSelect1">
        { states.map((obj) => <option key={obj.id}>{obj.nome}</option>) }
      </select>
    </div>

    <div className="form-group my-4">
      <label htmlFor="exampleFormControlSelect2">Cidade</label>
      <select className="form-control" id="exampleFormControlSelect2">
        { cities.map(obj => <option key={obj.id}>{obj.nome}</option>) }
      </select>
    </div>
  </div>
}