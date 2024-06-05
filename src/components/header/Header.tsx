import "./header.css"

interface HeaderProps {
  height?:string
  image?:string
  children?:React.ReactNode
}

export const Header = (props:HeaderProps) => {
  return(<>
    <header id="header" style={{height: props.height || `80vh`}}>
      <div className="container">
        {props.children}
      </div>
    </header>
  </>)
}