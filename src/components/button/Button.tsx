import { Link } from "react-router-dom"
import "./button.css"

interface ButtonProps {
  link?:string,
  text?:string,
  bold?:boolean
}

export const Button = (props:ButtonProps) => {
  return (
    props.bold ? 
    <strong><Link className="button" to={props.link || ""}>{props.text}</Link></strong> :
    <Link className="button" to={props.link || ""}>{props.text}</Link>
  )
}