import defaultCatImage from "./../images/default-cat.png";
import defaultDogImage from "./../images/default-dog.png";
import "./pet.css"

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdoptionAnimal } from "../types/AdoptionAnimal";
import { api } from "../utils/api";
import { Navbar } from "../components/navbar/Navbar";
import { Button } from "../components/button/Button";
import { getWhatsAppLink } from "../utils/Utils";
import { AppUser } from "../types/AppUser";
import { Species } from "../enums/Species";
import { Loading } from "../components/loading/Loading";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export const Pet = () => {
  const { petId } = useParams();
  const [pet, setPet] = useState<AdoptionAnimal>()
  const [owner, setOwner] = useState<AppUser>();

  const updatePet = async () => {
    await api.get(`/pets/${petId}`)
      .then((response) => {
        setPet(response.data.data as AdoptionAnimal);
      });
    console.log("owner update");
  }
  const getOwner = async () => {
    await api.get(`/pets/${petId}/owner`).then((response) => {
      setOwner(response.data.data as AppUser);
    })
    console.log("owner update");
  };

  useEffect(() => {
    getOwner();
    updatePet();
  }, [])

  if(!(owner && pet)){
    return <Loading />
  }

  return (
    <>
      <Navbar />
      <Header image={pet.species.toLocaleLowerCase()} height="300px">
        <h1 className="text-white">Adote {pet.name}!</h1>
      </Header>
      <div className="container p-5">
        <div id="pet-page" className="d-flex justify-content-center w-100">
          <img id="pet-page-image" className="w-50" src={`${pet.image == ""
              ? pet.species === Species.CAT
                ? defaultCatImage
                : defaultDogImage
              : `${process.env.REACT_APP_BACKEND_URL}/pets/${pet.id}/image`}`} alt="xd" />
          <div
            id="pet-page-text"
            className="ps-3 d-flex flex-column justify-content-between w-50"
          >
            <div>
              <h3>{pet.name}</h3>
              <h6 className="gray">
                {pet.city} - {pet.state}
              </h6>
              <p>{pet.description}</p>
              <h6>Idade: {pet.age}</h6>
              <h6>Peso: {pet.weight}kg</h6>
            </div>
            <Button
              text="FALAR COM O DONO"
              targetBlank
              textSize={20}
              link={getWhatsAppLink(
                owner.phone,
                `Quero adotar o ${pet.name}!`,
              )}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}