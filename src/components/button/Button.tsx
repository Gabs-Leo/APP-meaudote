import "./button.css"

interface ButtonProps {
  link?:string,
  text?:string,
  bold?:boolean
}

export const Button = (props:ButtonProps) => {
  return (
    props.bold ? 
    <strong><a className="button" href={props.link}>{props.text}</a></strong> :
    <a className="button" href={props.link}>{props.text}</a>
  )
}