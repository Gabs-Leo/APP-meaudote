import { Button } from "../button/Button"
import image from "./../../images/cat.jpg"

interface PetCardProps {
  name:string
  age:number
  city:string
  state:string
  image:string
}

export const PetCard = (props:PetCardProps) => {
  return <>
    <div className="pet-card d-flex flex-column m-3" style={{width: `200px`}}>
      <div style={{height: `270px`, width: `100%`, backgroundImage: `url(${props.image})`, backgroundPosition: `center`, backgroundRepeat: `no-repeat`, backgroundSize: `cover`}}></div>
      <div className="pt-2">
        <h4 className="m-0">{props.name} - {props.age} anos</h4>
        <h6 className="gray">{props.city} - {props.state}</h6>
      </div>
      <Button text="VER MAIS" />
    </div>
  </>
}