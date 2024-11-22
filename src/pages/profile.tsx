import { FormEvent, useEffect, useState } from "react";
import { Menu } from "../components/left_menu/Menu";
import { AdoptionAnimal } from "../types/AdoptionAnimal";
import { api, locationApi } from "../utils/api";
import { AppUser } from "../types/AppUser";
import { capitalize } from "../utils/Utils";
import { Navigate, useParams } from "react-router-dom";
import { Button } from "../components/button/Button";
import { CustomModal } from "../components/modal/Modal";
import { Dropzone } from "../components/dropzone/Dropzone";
import { Species } from "../enums/Species";
import { PetTable } from "../components/pet_table/PetTable";

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

export const Profile = () => {
  const [appUser, setAppUser] = useState<AppUser>();
  const [random, setRandom] = useState<number>(Math.random());
  const { username } = useParams();

  const [isPetModalOpen, setPetModalOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState<boolean>(false);

  const [isUserLogged, setUserLogged] = useState<boolean>(true);
  const [profilePicture, setProfilePicture] = useState<string>("none");
  const [pet, setPet] = useState<AdoptionAnimal>(defaultPet);

  const [tempAppUser, setTempAppUser] = useState<AppUser>({
    bannerPicture: ``,
    city: `Franca`,
    state: `São Paulo`,
    cpf: ``,
    email: ``,
    isNGO: false,
    name: ``,
    petAmount: 0,
    phone: ``,
    profilePicture: ``,
  });
  //const [states, setStates] = useState<State[]>([]);
  //const [cities, setCities] = useState<City[]>([]);

  const updateProfilePicture = async () => {
    setRandom(Math.random());
  };

  const updateAppUser = async () => {
    // TODO fix useEffect
    if (username == null) {
      await api
        .get("/users/current", { headers: await getHeaders() })
        .then((response) => {
          setAppUser(response.data.data as AppUser);
          setProfilePicture((response.data.data as AppUser).name);
          setUserLogged(true);
        })
        .catch(() => {
          setUserLogged(false);
        });
    } else {
      await api
        .get(`/users/${username}`, { headers: await getHeaders() })
        .then((response) => {
          setAppUser(response.data.data as AppUser);
          setProfilePicture((response.data.data as AppUser).name);
        });
    }
  };

  const handlePetSaving = async (event: FormEvent) => {
    event.preventDefault();
    api
      .post("/pets", pet, { headers: await getHeaders() })
      .then(() => {
        setPetModalOpen(false);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  const handleProfileUpdate = async (event: FormEvent) => {
    event.preventDefault();
    const user = appUser;
    if (user) {
      user.name = tempAppUser.name;
      user.phone = tempAppUser.phone;
    } else {
      return;
    }

    api
      .put("/users/current", user, { headers: await getHeaders() })
      .then(() => {
        setProfileModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateStates = async () => {
    await locationApi.get("/localidades/estados?orderBy=nome").then(() => {
      //setStates(response.data as State[]);
    });
  };

  const updateCities = async () => {
    if (tempAppUser?.state === "%" && tempAppUser?.city !== "%") {
      setTempAppUser({ ...tempAppUser, city: "%" });
    } else {
      await locationApi
        .get(
          `/localidades/estados/${tempAppUser?.state.replaceAll(" ", "") || "SP"}/distritos?orderBy=nome`,
        )
        .then(() => {
          //setCities(response.data as City[]);
        });
    }
  };

  useEffect(() => {
    updateStates();
    updateCities();
    updateAppUser();
  }, [isUserLogged, isPetModalOpen]);

  if (!isUserLogged) {
    return <Navigate to={"/login"} />;
  }
  
  if (appUser == null) {
    return <>loading</>;
  }

  return (
    <>
      <div>
        <div className="container d-flex">
          <Menu />
          <div style={{ width: `80%` }}>
            <div
              className="w-100"
              style={{
                height: `230px`,
                backgroundColor: `var(--baseColor)`,
                backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/users/${appUser.name}/banner)`,
                backgroundPosition: `center`,
                backgroundSize: `cover`,
              }}
            ></div>
            <div className="mx-5">
              {username == null ? (
                <div style={{ width: `20px` }}>
                  <Dropzone
                    postUrl={`${process.env.REACT_APP_BACKEND_URL}/users/${appUser.name}/image`}
                    then={() => {
                      updateProfilePicture();
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        backgroundColor: `white`,
                        borderRadius: `100%`,
                      }}
                      className="p-2 position material-symbols-outlined"
                    >
                      upload
                    </span>
                  </Dropzone>
                </div>
              ) : (
                <></>
              )}

              <div
                style={{
                  backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}/users/${profilePicture}/image?random=${random})`,
                  marginTop: `-75px`,
                  border: `6px solid white`,
                  width: `150px`,
                  backgroundColor: `var(--baseColor)`,
                  height: `150px`,
                  backgroundSize: `cover`,
                  backgroundPosition: `center`,
                  borderRadius: `100%`,
                }}
              ></div>
            </div>
            <div className="mx-5">
              <div>
                <h3>{capitalize(appUser?.name || " ")}</h3>
                <h5></h5>
              </div>
              <div>
                <h6>
                  {appUser?.petAmount} Pet
                  {(appUser?.petAmount || 2) > 1 ? "s" : ""} Registrado
                  {(appUser?.petAmount || 2) > 1 ? "s" : ""}
                </h6>
                <div className="d-flex justify-content-between">
                  {username != null ? (
                    <></>
                  ) : (
                    <Button
                      text="Adicionar Pet"
                      onClick={() => {
                        setPet(defaultPet);
                        setPetModalOpen(true);
                      }}
                    />
                  )}
                  {username != null ? (
                    <></>
                  ) : (
                    <div>
                      
                    </div>
                  )}
                </div>
                <CustomModal
                  open={isPetModalOpen}
                  onClose={() => setPetModalOpen(false)}
                  title="Editar Pet"
                >
                  <form onSubmit={handlePetSaving}>
                    <div className="form-group">
                      <label htmlFor="pet-name">Nome</label>
                      <input
                        onChange={(e) =>
                          setPet({ ...pet, name: e.target.value })
                        }
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
                            setPet({
                              ...pet,
                              species: e.target.value as Species,
                            })
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
                </CustomModal>
                <CustomModal
                  open={isProfileModalOpen}
                  onClose={() => {
                    setProfileModalOpen(false);
                  }}
                  title="Editar Perfil"
                >
                  <form onSubmit={handleProfileUpdate}>
                    <div className="form-group">
                      <label htmlFor="pet-name">Nome</label>
                      <input
                        onChange={(e) =>
                          setTempAppUser({
                            ...tempAppUser,
                            name: e.target.value,
                          })
                        }
                        value={tempAppUser.name}
                        className="form-control"
                        type="text"
                        name="pet-name"
                        id="pet-name"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="pet-name">Phone</label>
                      <input
                        onChange={(e) =>
                          setTempAppUser({
                            ...tempAppUser,
                            phone: e.target.value,
                          })
                        }
                        value={tempAppUser.phone}
                        className="form-control"
                        type="text"
                        name="pet-name"
                        id="pet-name"
                      />
                    </div>
                    <div className="d-flex justify-content-end">
                      <Button className="my-3" submit text="Salvar" />
                    </div>
                  </form>
                </CustomModal>
              </div>
            </div>
            <div className="d-flex">
              <PetTable username={username} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/*
                  <div className="form-group">
                    <label htmlFor="exampleFormControlSelect1">Estado</label>
                    <select value={tempAppUser.state} onChange={(e) => handleStateUpdate(e.target.value)} className="form-control" id="exampleFormControlSelect1">
                      { states.map((obj) => <option value={obj.sigla} key={obj.id}>{obj.nome}</option>) }
                    </select>
                  </div>
                  <div className="form-group my-4">
                    <label htmlFor="exampleFormControlSelect2">Cidade</label>
                    <select value={tempAppUser.city} onChange={(e) => setTempAppUser({...tempAppUser, city: e.target.value})} className="form-control" id="exampleFormControlSelect2">
                      { cities.map(obj => <option key={obj.id} value={obj.nome}>{obj.nome}</option>) }
                    </select>
                  </div>
*/
