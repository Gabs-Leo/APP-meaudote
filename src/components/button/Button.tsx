import { Link } from "react-router-dom"
import "./button.css"

interface ButtonProps {
  link?:string
  text?:string
  bold?:boolean
  textSize?:number
  targetBlank?:boolean
  onClick?: () => void
}

export const Button = ({bold=false, ...props}:ButtonProps) => {
  const link = <Link target={props.targetBlank ? "_blank" : "_self"} style={{fontSize: props.textSize || "16" + "px"}} className="button" onClick={props.onClick} to={props.link || ""}>{props.text}</Link>
  return (
    bold ? <strong>link</strong> : <>{link}</>
  )
}