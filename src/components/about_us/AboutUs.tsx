import "./about-us.css";
import image from "../../images/logo_dog.png";

export const AboutUs = () => {
  return (
    <div id="about-us" className="container py-5">
      <img src={image} alt="" />
      <h2>Conheça o MeAudote</h2>
      <p>
        O MeAudote é uma plataforma dedicada a conectar animais de estimação que
        precisam de um lar com pessoas que desejam adotar. Nosso objetivo é
        tornar o processo de adoção mais acessível e seguro, facilitando o
        encontro perfeito entre os animais e suas novas famílias. Junte-se a nós
        e faça a diferença na vida de um pet!
      </p>
    </div>
  );
};
