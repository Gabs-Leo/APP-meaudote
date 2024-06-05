import { Link } from "react-router-dom"
import "./button.css"

interface ButtonProps {
  link?:string
  text?:string
  bold?:boolean
  textSize?:number
  targetBlank?:boolean
  submit?:boolean
  className?:string
  onClick?: () => void
}

export const Button = ({bold=false, submit=false, ...props}:ButtonProps) => {
  let link = <Link target={props.targetBlank ? "_blank" : "_self"} style={{fontSize: props.textSize || "16" + "px"}} className={"button " + props.className} onClick={props.onClick} to={props.link || ""}>{props.text}</Link>;
  const submitButton = <button className={"button " + props.className} style={{fontSize: props.textSize || "16px", border: `none`}} type="submit">{props.text}</button>;
  if(submit) {
    link = submitButton
  }
  return (
    bold ? <strong>{link}</strong> : <>{link}</>
  )
}