import { FormEvent, useCallback, useState } from "react";
import { AdoptionAnimal } from "../../types/AdoptionAnimal";
import { Species } from "../../enums/Species";
import { api } from "../../utils/api";
import { Button } from "../button/Button";
import { CustomModal } from "../modal/Modal";
import { Dropzone } from "../dropzone/Dropzone";

const getHeaders = async () => {
  return {
    Authorization: `Bearer ${localStorage.getItem(`token`)}`,
    "Content-Tyype": "application/json",
  };
};

const defaultPet: AdoptionAnimal = {
  adopted: false,
  age: 0,
  city: "Franca",
  state: "SP",
  description: "",
  image: "",
  name: "Meu Pet",
  weight: 0,
  id: "",
  species: Species.DOG,
};

export const PetTable = (props: { username: string | undefined }) => {
  const [animals, setAnimals] = useState<AdoptionAnimal[]>([]);
  const [pet, setPet] = useState<AdoptionAnimal>(defaultPet);
  const [isPetModalOpen, setPetModalOpen] = useState<boolean>(false);
  const [random, setRandom] = useState<number>(Math.random());

  const closeModal = () => {
    setPetModalOpen(false);
    updatePets();
  };

  const updateModal = async (petId: string) => {
    await api
      .get(`/pets/${petId}`, { headers: await getHeaders() })
      .then((response) => {
        setPet(response.data.data as AdoptionAnimal);
      });
    setPetModalOpen(true);
  };

  const handlePetSaving = async (event: FormEvent) => {
    event.preventDefault();
    api
      .post("/pets", pet, { headers: await getHeaders() })
      .then(closeModal)
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  const updatePets = useCallback(async () => {
    await api
      .get(`/users/${props.username || "current"}/pets`, {
        headers: await getHeaders(),
      })
      .then((response) => {
        setAnimals(response.data.data.content as AdoptionAnimal[]);
      });
  }, [props.username]);

  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col">Idade</th>
            <th scope="col">Peso</th>
            {props.username ? <></> : <th scope="col">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <th scope="row">{animal.name}</th>
              <td>{animal.age}</td>
              <td>{animal.weight}</td>
              {props.username ? (
                <></>
              ) : (
                <td>
                  <Button
                    text="Editar"
                    onClick={() => {
                      updateModal(animal.id);
                    }}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <CustomModal
        open={isPetModalOpen}
        onClose={closeModal}
        title="Registrar Pet"
      >
        <div className="w-100 d-flex justify-content-between">
          <div style={{ width: `47%` }}>
            <Dropzone
              postUrl={`${process.env.REACT_APP_BACKEND_URL}/pets/${pet.id}/image`}
              then={() => {
                setRandom(Math.random());
              }}
            >
              <div
                className="w-100"
                style={{
                  opacity: 0.6,
                  borderRadius: `10px`,
                  height: `350px`,
                  backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/pets/${pet.id}/image?random=${random})`,
                  backgroundPosition: `center`,
                  backgroundSize: `cover`,
                }}
              ></div>
              <div
                style={{
                  position: "relative",
                  marginTop: `-170px`,
                  width: `350px`,
                }}
                className="d-flex justify-content-center align-items-center"
              >
                <span
                  style={{
                    position: "absolute",
                    backgroundColor: `white`,
                    borderRadius: `100%`,
                  }}
                  className="p-5 position material-symbols-outlined"
                >
                  upload
                </span>
              </div>
            </Dropzone>
          </div>
          <form className="w-50" onSubmit={handlePetSaving}>
            <div className="form-group">
              <label htmlFor="pet-name">Nome</label>
              <input
                onChange={(e) => setPet({ ...pet, name: e.target.value })}
                value={pet.name}
                className="form-control"
                type="text"
                name="pet-name"
                id="pet-name"
              />
            </div>
            <div className="d-flex justify-content-between">
              <div style={{ width: `48%` }} className="form-group">
                <label htmlFor="pet-age">Idade</label>
                <input
                  onChange={(e) =>
                    setPet({ ...pet, age: Number(e.target.value) })
                  }
                  value={pet.age}
                  className="form-control"
                  type="number"
                  name="pet-age"
                  id="pet-age"
                  max={20}
                />
              </div>
              <div style={{ width: `48%` }} className="w-50 form-group">
                <label htmlFor="pet-species">Espécie</label>
                <select
                  value={pet.species}
                  onChange={(e) =>
                    setPet({ ...pet, species: e.target.value as Species })
                  }
                  className="form-control"
                  name="species"
                  id="pet-species"
                >
                  <option value="CAT">Gato</option>
                  <option value="DOG">Cachorro</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="pet-description">Descrição</label>
              <textarea
                onChange={(e) =>
                  setPet({ ...pet, description: e.target.value })
                }
                value={pet.description}
                className="form-control"
                id="pet-description"
                rows={3}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="pet-weight">Peso (Kg)</label>
              <input
                onChange={(e) =>
                  setPet({ ...pet, weight: Number(e.target.value) })
                }
                value={pet.weight}
                className="form-control"
                type="number"
                name="pet-weight"
                id="pet-weight"
              />
            </div>
            <div className="d-flex justify-content-end">
              <Button className="my-3" submit text="Salvar" />
            </div>
          </form>
        </div>
      </CustomModal>
    </>
  );
};
