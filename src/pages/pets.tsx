import { useEffect, useState } from "react"
import { PetFeed } from "../components/feed/PetFeed"
import { Feed } from "../components/feed/feed"
import { SearchBar } from "../components/search_bar/SearchBar"
import { Species } from "../enums/Species"
import { MenuButton } from "../components/left_menu/MenuButton"
import { capitalize, getEnumNames, logo, lorem } from "../utils/Utils"
import { State } from "../types/State"
import { City } from "../types/Cities"
import { api, locationApi } from "../utils/api"
import { AdoptionAnimal } from "../types/AdoptionAnimal"
import { PetCard } from "../components/feed/PetCard"
import defaultCatImage from "./../images/default-cat.png"
import defaultDogImage from "./../images/default-dog.png"

export interface PetFilter {
  species:Species[],
  maxAge:number,
  state:string,
  city:string
}

const starterFilter:PetFilter = {
  species:[Species.CAT, Species.DOG],
  maxAge: 20,
  state: "Todos",
  city: "Todas"
}

export const Pets = () => {
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [animals, setAnimals] = useState<AdoptionAnimal[]>([])
  const [selectedState, setSelectedState] = useState<State>();
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    species: getEnumNames(Species),
    city: "%",
    state: "%",
    maxAge: 20
  });

  const updatePets = async () => {
    let result:AdoptionAnimal[] = []
    await api.get(`/pets?city=${filterOptions.city}&state=${filterOptions.state}&maxAge=${filterOptions.maxAge}&species=${filterOptions.species.toString()}&`).then((response) => { 
      result = response.data.data.content as AdoptionAnimal[];
    })
    await setAnimals(result);
  }

  const updateSpecies = (species:string) => {
    const index = filterOptions.species.indexOf(species.toUpperCase());
    const temp = filterOptions.species;
    if(index === -1){
      temp.push(species.toUpperCase());
      setFilterOptions({...filterOptions, species: temp});
      console.log(filterOptions);
      return true;
    }
    setFilterOptions({...filterOptions, species: temp.filter(i => i !== temp[index])});
    return false;
  }

  const updateStates = async () => {
    await locationApi.get("/localidades/estados?orderBy=nome").then((response) => { 
      setStates(response.data as State[]);
    })
  }

  const handleStateUpdate = async (state:string) => {
    setFilterOptions({...filterOptions, state: state})
    await updateCities();
  }

  const updateCities = async () => {
    if(filterOptions.state === "%" && filterOptions.city !== "%"){
      setFilterOptions({...filterOptions, city: "%"})
    } else {
      await locationApi.get(`/localidades/estados/${filterOptions.state || "SP"}/distritos?orderBy=nome`).then((response) => { 
        setCities(response.data as City[]);
      })
    }
  }

  useEffect(() => {
    updateStates();
    updateCities();
    updatePets();
  }, [filterOptions])

  if(states == null || cities == null) {
    return <>loading</>
  }



  return <>
    <div>
      <div className="container d-flex">
        <div>
          <div style={{width: `300px`}}></div>
          <div style={{width: `300px`}} className="position-fixed">
            <div className="left-menu " style={{width: `100%`}}>
              <img src={logo} alt="logo" className="mb-3" />
              <MenuButton path="/donations"     text="DOAÇÕES"      icon="volunteer_activism" />
              <MenuButton path="/notifications" text="NOTIFICAÇÕES" icon="notifications" />
              <MenuButton path="/pets"          text="PETS"         icon="pet_supplies"/>
              <MenuButton path="/profile"       text="PERFIL"       icon="person"/>
              <div className="w-100 p-3">
                <hr />
                <h3>FILTROS</h3>
                <div className="mb-2">Tipo</div>
                {Object.values(Species).map(val => <div className="form-check">
                  <input checked={filterOptions.species.includes(val.toUpperCase())} onChange={() => updateSpecies(val)} className="form-check-input"  type="checkbox" name="species" id={val} />
                  <label className="form-check-label" htmlFor={val}>{val}</label>
                </div>)}

                <hr />
                <label htmlFor="age" className="form-label">Idade Máxima - {filterOptions.maxAge}</label>
                <input type="range" className="form-range" min="2" max="20" value={filterOptions.maxAge} onChange={(e) => setFilterOptions({...filterOptions, maxAge: Number(e.target.value)})} step="2" id="age"></input>
                
                <hr />
                <div className="form-group">
                  <label htmlFor="exampleFormControlSelect1">Estado</label>
                  <select value={filterOptions.state} onChange={(e) => handleStateUpdate(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                    <option value={"%"}>Todos</option>
                    { states.map((obj) => <option value={obj.sigla} key={obj.id}>{obj.nome}</option>) }
                  </select>
                </div>

                <div className="form-group my-4">
                  <label htmlFor="exampleFormControlSelect2">Cidade</label>
                  <select value={filterOptions.city} onChange={(e) => setFilterOptions({...filterOptions, city: e.target.value})} className="form-control" id="exampleFormControlSelect2">
                    <option value={"%"}>Todas</option>
                    { cities.map(obj => <option key={obj.id} value={obj.nome}>{obj.nome}</option>) }
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="feed" style={{width: `80%`, border: `2px solid var(--baseGray)`, borderTop: `0px solid black`}}>
          <SearchBar />
          <div style={{minHeight:`100vh`}} className="d-flex flex-wrap justify-content-center">
            {animals.map(pet => {
              return (
                <PetCard key={pet.id} species={pet.species} id={pet.id} description={lorem} weight={pet.weight} name={capitalize(pet.name)} age={pet.age} city={pet.city} state={pet.state} image={pet.image === "" ? (pet.species === Species.CAT ? defaultCatImage : defaultDogImage) : `${process.env.REACT_APP_BACKEND_URL}/pets/${pet.id}/image`} />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  </>
}

interface FilterOptions {
  species:string[]
  maxAge:number
  state:string
  city:string
}