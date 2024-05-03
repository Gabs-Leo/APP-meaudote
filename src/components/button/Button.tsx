import { Link } from "react-router-dom"
import "./button.css"

interface ButtonProps {
  link?:string,
  text?:string,
  bold?:boolean
  onClick?: () => void;
  textSize?:number
}

export const Button = (props:ButtonProps) => {
  const link = <Link style={{fontSize: props.textSize || "16" + "px"}} className="button" onClick={props.onClick} to={props.link || ""}>{props.text}</Link>
  return (
    props.bold ? <strong>link</strong> : <>{link}</>
  )
}