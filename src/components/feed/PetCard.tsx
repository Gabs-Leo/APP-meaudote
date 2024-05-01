import { Button } from "../button/Button"
import image from "./../../images/cat.jpg"

export const PetCard = () => {
  return <>
    <div className="pet-card d-flex flex-column m-3" style={{width: `200px`}}>
      <div style={{height: `270px`, width: `100%`, backgroundImage: `url(${image})`, backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`}}></div>
      <div className="pt-2">
        <h4 className="m-0">Nome - 2 anos</h4>
        <h6 className="gray">Franca - SP</h6>
      </div>
      <Button text="VER MAIS" />
    </div>
  </>
}