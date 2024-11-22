import { Home } from "./pages/home"
import "./main.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Pets } from "./pages/pets";
import { AppUserProvider } from "./providers/AppUserProvider";
import { Profile } from "./pages/profile";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

export const App = () => {
  return (<>
    <div className="App">
      <AppUserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/donations" element={<Pets />} />
          <Route path="/notifications" element={<Pets />} />
          <Route path="/pets" element={<Pets />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
      </AppUserProvider>
    </div>
  </>)
}  