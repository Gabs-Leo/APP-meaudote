import { Species } from "../enums/Species"

export type AdoptionAnimal = {
  id:string
  name:string
  description:string
  age:number
  adopted:boolean
  image:string
  city:string
  state:string
  weight:number
  species:Species
}