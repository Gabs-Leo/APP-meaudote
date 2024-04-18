import "./header.css"

export const Header = () => {
  return(<>
    <header id="header">
      <div className="container">
        <h2 
          data-aos-mirror="true" 
          data-aos="fade-right" 
          data-aos-duration="1600">
          Adote um Pet
        </h2>
        <h1 
          data-aos-mirror="true" 
          data-aos="fade-left" 
          data-aos-duration="1600">
          Salve uma Vida
        </h1>
      </div>
    </header>
  </>)
}