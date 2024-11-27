import { Button } from "../button/Button"
import "./metrics.css"

export const Metrics = () => {
  return (
    <div id="metrics">
      <div className="container p-5">
        <h2>Toda ajuda conta e faz muita diferença.</h2>
        <div id="metrics-numbers" className="my-5">
          <div className={`metric-number`}>
            <h3>+150</h3>
            <p>Animais Resgatados</p>
          </div>
          <div className={`metric-number`}>
            <h3>+95</h3>
            <p>Adoções Realizadas</p>
          </div>
          <div className={`metric-number`}>
            <h3>+7</h3>
            <p>Voluntários Dedicados.</p>
          </div>
          <div className={`metric-number`}>
            <h3>+84</h3>
            <p>Doações Recebidas</p>
          </div>
          <div className={`metric-number`}>
            <h3>+6</h3>
            <p>Parcerias com ONGs e empresas locais</p>
          </div>
        </div>
        <Button text="QUERO AJUDAR" link="/login" />
      </div>
    </div>
  )
}