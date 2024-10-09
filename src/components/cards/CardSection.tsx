import "./card.css";
import { Card } from "./Card";
import { Button } from "../button/Button";
import dog from "../../images/dog.jpg";
import dog2 from "../../images/dog2.jpg";
import dog3 from "../../images/dog3.jpg";

export const CardSection = () => {
  return (
    <div id="card-section" className="my-5 py-5">
      <div className="container">
        <h2>Por que Adotar?</h2>
        <div className="card-container">
          <Card
            title="Salve uma Vida"
            image={dog}
            text="Adotar um animal de estimação não só salva uma vida, mas também proporciona um lar cheio de amor e carinho para um pet que precisa. Além disso, você estará ajudando a reduzir a superpopulação de animais abandonados."
          />
          <Card
            title="Transforme Vidas"
            image={dog2}
            text="Ao adotar, você contribui para a diminuição do número de animais em abrigos, oferecendo a eles uma segunda chance de serem felizes. Adotar é um ato de amor que transforma vidas, tanto a do animal quanto a sua."
          />
          <Card
            title="Amor Incondicional"
            image={dog3}
            text="Adotar um pet é uma experiência gratificante. Você ganha um amigo leal e amoroso, e ainda faz a diferença ao proporcionar um novo começo para um animal que já sofreu muito. A adoção é uma escolha consciente que reflete empatia e responsabilidade."
          />
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <Button text="ENCONTRAR MEU NOVO AMIGO" link="/login" bold />
        </div>
      </div>
    </div>
  );
};
