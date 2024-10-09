import { useCallback, useEffect, useState } from "react";
import { Button } from "../button/Button";
import { CustomModal } from "../modal/Modal";
import { getWhatsAppLink } from "../../utils/Utils";
import { AppUser } from "../../types/AppUser";
import { api } from "../../utils/api";

interface PetCardProps {
  id: string;
  name: string;
  age: number;
  city: string;
  state: string;
  image: string;
  description: string;
  weight: number;
  species: string;
}

export const PetCard = (props: PetCardProps) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [owner, setOwner] = useState<AppUser>();

  const getOwner = useCallback(async () => {
    await api.get(`/pets/${props.id}/owner`).then((response) => {
      setOwner(response.data.data as AppUser);
    });
  }, [props.id]);

  useEffect(() => {
    getOwner();
  }, [getOwner]);

  if (owner == null) {
    return <></>;
  }

  return (
    <>
      <div
        className="pet-card d-flex flex-column m-3"
        style={{ width: `200px` }}
      >
        <div
          style={{
            height: `270px`,
            width: `100%`,
            backgroundImage: `url(${props.image})`,
            backgroundPosition: `center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
          }}
        ></div>
        <div className="pt-2">
          <h4 className="m-0">
            {props.name} - {props.age} anos
          </h4>
          <h6 className="gray">
            {props.city} - {props.state}
          </h6>
        </div>
        <Button text="VER MAIS" onClick={() => setModalOpen(true)} />
      </div>
      <CustomModal
        title=""
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      >
        <div className="d-flex justify-content-center">
          <div
            style={{
              width: `50%`,
              height: `500px`,
              backgroundImage: `url(${props.image})`,
              backgroundSize: `cover`,
              backgroundPosition: `center`,
            }}
          ></div>
          <div
            className="ps-3 d-flex flex-column justify-content-between"
            style={{ width: `50%` }}
          >
            <div>
              <h3>{props.name}</h3>
              <h6 className="gray">
                {props.city} - {props.state}
              </h6>
              <p>{props.description}</p>
              <h6>Idade: {props.age}</h6>
              <h6>Peso: {props.weight}kg</h6>
            </div>
            <Button
              text="FALAR COM O DONO"
              targetBlank
              textSize={20}
              link={getWhatsAppLink(
                owner.phone,
                `Quero adotar o ${props.name}!`,
              )}
            />
          </div>
        </div>
      </CustomModal>
    </>
  );
};
