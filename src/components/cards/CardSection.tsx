import "./card.css"
import { Card } from "./Card"
import { Button } from "../button/Button";

export const CardSection = () => {
  return (
    <div id="card-section" className="my-5 py-5">
      <div className="container">
        <h2 >Por que Adotar?</h2>
        <div className="card-container">
          <Card />
          <Card />
          <Card />
        </div>
        <div className="mt-5 d-flex justify-content-center">
          <Button text="ENCONTRAR MEU NOVO AMIGO" link="https://" bold />
        </div>
      </div>
    </div>
  );
}