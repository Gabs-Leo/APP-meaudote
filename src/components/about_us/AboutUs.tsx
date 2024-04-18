import "./about-us.css"
import image from "../../images/logo_dog.png"

export const AboutUs = () => {
  return(
    <div id="about-us" className="container py-5">
      <img src={image} alt="" />
      <h2>Conheça o MeAudote</h2>
      <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, incidunt ducimus? Eius numquam eaque, iste illo nemo facere harum cumque, ipsa aliquid aut reprehenderit asperiores voluptate magnam sapiente similique. Corporis.</p>
    </div>
  )
}