import "./header.css"
import catImage from "./../../images/cat_bg.jpg"
import dogImage from "./../../images/dog_bg.jpg"
import defaultImage from "./../../images/cat_bg.png"

interface HeaderProps {
  height?:string
  image?:string
  children?:React.ReactNode
}

export const Header = (props:HeaderProps) => {
  return(<>
    <header id="header" style={{height: props.height || `80vh`, backgroundImage: `url(${props.image === "cat" ? catImage : props.image === "dog" ? dogImage : defaultImage})`}} >
      <div className="container">
        {props.children}
      </div>
    </header>
  </>)
}