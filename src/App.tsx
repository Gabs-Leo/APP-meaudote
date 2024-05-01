import { Home } from "./pages/home"
import "./main.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pets } from "./pages/pets";

export const App = () => {
  return (<>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pets" element={<Pets />} />
        </Routes>
      </BrowserRouter>
    </div>
  </>)
}  