import "./menu.css";
import { MenuButton } from "./MenuButton";
import { State } from "../../types/State";
import { City } from "../../types/Cities";
import { useEffect, useState } from "react";
import { Species } from "../../enums/Species";
import { locationApi } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import logo from "./../../images/logo_color.png";
import { getEnumNames } from "../../utils/Utils";
import Hamburger from "hamburger-react";
import { Button } from "../button/Button";
import { Loading } from "../loading/Loading";

interface CloseButton {
  text:string
  position:"bottom"
}

interface MenuProps {
  filter?: boolean;
  children?: React.ReactNode;
  hamburgerColor?:string;
  closeOnClick?:boolean;
  closeButton?:CloseButton
}

export const LeftMenu = (props: MenuProps) => {
  const navigate = useNavigate();
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
    <>
      <div id="mobile-menu">
        <Hamburger color={props.hamburgerColor || "white"} toggled={isOpen} toggle={handleOpen} />
      </div>
      <div id="filler-div" style={{ width: `300px` }}></div>
      <div id="left-menu" style={{ width: '300px' }} className="position-fixed">
        <div className="left-menu" style={{ width: `100%` }}>
          <img src={logo} alt="logo" className="mb-3" />
          <MenuButton path="/pets" text="PETS" icon="pet_supplies" />
          <MenuButton path="/profile" text="PERFIL" icon="person" />
          <MenuButton path="/profile" text="SAIR" icon="logout" type="function" onClick={() => {
            localStorage.removeItem("token");
            navigate("/")
          }} />
          {props.children}
        </div>
      </div>
      <div id="mobile-left-menu" style={{ width: menuWidth }} onClick={ () => {
        if(props.closeOnClick)
          handleOpen();
      }}>
        <div className="d-flex align-items-center flex-column p-4">
          <img src={logo} className="mb-3" />
          <MenuButton path="/pets" text="PETS" icon="pet_supplies" />
          <MenuButton path="/profile" text="PERFIL" icon="person" />
          <MenuButton path="/profile" text="SAIR" icon="logout" type="function" onClick={() => {
            localStorage.removeItem("token");
            navigate("/")
          }} />
          {props.children}
          {props.closeButton && props.closeButton.position === "bottom" ? 
            <div id="left-menu-close-button">
              <Button text={props.closeButton.text} onClick={handleOpen} />
              <p style={{opacity: 0}}>xd</p>
            </div>
            :
            <div></div>
          }
        </div>
      </div>
    </>
  );
};

interface FilterOptions {
  species: string[];
  maxAge: number;
  state: string;
  city: string;
}

export const Filter = () => {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState<State>();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    species: getEnumNames(Species),
    city: "Franca",
    state: "SP",
    maxAge: 20,
  });
  console.log(filterOptions.species);

  const updateSpecies = (species: string) => {
    const index = filterOptions.species.indexOf(species.toUpperCase());
    const temp = filterOptions.species;
    if (index === -1) {
      temp.push(species.toUpperCase());
      setFilterOptions({ ...filterOptions, species: temp });
      console.log(filterOptions);
      return true;
    }
    setFilterOptions({
      ...filterOptions,
      species: temp.filter((i) => i !== temp[index]),
    });
    console.log(filterOptions);
    return false;
  };

  const updateStates = async () => {
    await locationApi
      .get("/localidades/estados?orderBy=nome")
      .then((response) => {
        setStates(response.data as State[]);
        setSelectedState(states[0] || undefined);
      });
  };

  const updateCities = async () => {
    await locationApi
      .get(
        `/localidades/estados/${selectedState?.sigla || "SP"}/distritos?orderBy=nome`,
      )
      .then((response) => {
        setCities(response.data as City[]);
      });
  };

  useEffect(() => {
    updateStates();
    updateCities();
  }, []);

  if (states == null || cities == null) {
    return <Loading />;
  }

  return (
    <div className="w-100 p-3">
      <hr />
      <h3>FILTROS</h3>
      <div className="mb-2">Tipo</div>
      {Object.values(Species).map((val) => (
        <div className="form-check">
          <input
            checked={filterOptions.species.includes(val.toUpperCase())}
            onChange={() => updateSpecies(val)}
            className="form-check-input"
            type="checkbox"
            name="species"
            id={val}
          />
          <label className="form-check-label" htmlFor={val}>
            {val}
          </label>
        </div>
      ))}

      <hr />
      <label htmlFor="age" className="form-label">
        Idade Máxima
      </label>
      <input
        type="range"
        className="form-range"
        min="2"
        max="20"
        value={filterOptions.maxAge}
        onChange={(e) =>
          setFilterOptions({ ...filterOptions, maxAge: Number(e.target.value) })
        }
        step="2"
        id="age"
      ></input>

      <hr />
      <div className="form-group">
        <label htmlFor="exampleFormControlSelect1">Estado</label>
        <select className="form-control" id="exampleFormControlSelect1">
          <option>Todos</option>
          {states.map((obj) => (
            <option key={obj.id}>{obj.nome}</option>
          ))}
        </select>
      </div>

      <div className="form-group my-4">
        <label htmlFor="exampleFormControlSelect2">Cidade</label>
        <select className="form-control" id="exampleFormControlSelect2">
          <option>Todas</option>
          {cities.map((obj) => (
            <option key={obj.id}>{obj.nome}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
