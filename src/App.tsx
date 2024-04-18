import { Home } from "./pages/home"
import "./main.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";

export const App = () => {
  return (<>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  </>)
}  