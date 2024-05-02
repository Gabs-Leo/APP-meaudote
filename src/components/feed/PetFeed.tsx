import { useEffect, useState } from "react"
import { api } from "../../utils/api"
import { PetCard } from "./PetCard"
import { AdoptionAnimal } from "../../types/AdoptionAnimal"

export const PetFeed = () => {
  const [animals, setAnimals] = useState<AdoptionAnimal[]>([])

  const updatePets = async () => {
    let result:AdoptionAnimal[] = []
    await api.get("/pets").then((response) => { 
      result = response.data.data.content as AdoptionAnimal[]
    })
    await setAnimals(result);
  }

  useEffect(() => {
    updatePets();
  }, [])
  
  return <>
    <div className="d-flex flex-wrap justify-content-between">
      {animals.map(pet => {
        return (
          <PetCard key={pet.id} name={pet.name} age={pet.age} city={pet.city} state={pet.state} image={`${process.env.REACT_APP_BACKEND_URL}/pets/${pet.id}/image`} />
        )
      })}
    </div>
  </>
}