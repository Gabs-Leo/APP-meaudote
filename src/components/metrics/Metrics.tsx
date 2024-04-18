import { Button } from "../button/Button"
import "./metrics.css"

export const Metrics = () => {
  return (
    <div id="metrics">
      <div className="container p-5">
        <h2>Toda ajuda conta e faz muita diferença.</h2>
        <div id="metrics-numbers" className="my-5">
          <div className={`metric-number`}>
            <h3>+6000</h3>
            <p>fusaihfuiahf</p>
          </div>
          <div className={`metric-number`}>
            <h3>+95</h3>
            <p>fusaihfuiahf</p>
          </div>
          <div className={`metric-number`}>
            <h3>+7300</h3>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod  reiciendis.</p>
          </div>
          <div className={`metric-number`}>
            <h3>+130</h3>
            <p>fusaihfuiahf</p>
          </div>
          <div className={`metric-number`}>
            <h3>+120000</h3>
            <p>fusaihfuiahf</p>
          </div>
        </div>
        <Button text="QUERO AJUDAR" link="#nav" />
      </div>
    </div>
  )
}