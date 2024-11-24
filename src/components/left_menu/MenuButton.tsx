import { Link } from "react-router-dom"

interface ButtonProps {
  path:string
  text:string
  icon:string
  type?:"redirect" | "function"
  onClick?:() => void
}

export const MenuButton = ({type="redirect", ...props}:ButtonProps) => {
  return <div className="w-100">
    { type == "redirect" ?
    <Link className="decoration-none h4" to={props.path} >
      <div className="p-3 black d-flex align-items-center">
        <span className="material-symbols-outlined me-2" style={{fontSize: 30}}>{props.icon}</span>
        <div>{props.text}</div>
      </div>
    </Link>
    :
    <div className="decoration-none h4 pointer-on-hover"  onClick={() => {
      if(props.onClick) props.onClick() }} >
        
      <div className="p-3 black d-flex align-items-center">
        <span className="material-symbols-outlined me-2" style={{fontSize: 30}}>{props.icon}</span>
        <div>{props.text}</div>
      </div>
    </div>
    }
  </div>
}