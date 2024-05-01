import { Link } from "react-router-dom"

interface ButtonProps {
  path:string
  text:string
  icon:string
}

export const MenuButton = (props:ButtonProps) => {
  return <div className="w-100">
    <Link className="decoration-none h4" to={props.path}>
      <div className="p-3 black d-flex align-items-center">
        <span className="material-symbols-outlined me-2" style={{fontSize: 30}}>{props.icon}</span>
        <div>{props.text}</div>
      </div>
    </Link>
  </div>
}