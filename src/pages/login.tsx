import { FormEvent, useState } from "react";
import { Button } from "../components/button/Button";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Navbar } from "../components/navbar/Navbar";
import { lorem } from "../utils/Utils";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  return (
    <div>
      <Navbar />
      <Header height="400px" />
      <LoginForm />
      <Footer />
    </div>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    api
      .post("/auth/login", { email: email, password: password })
      .then((response) => {
        localStorage.setItem("token", response.data.data as string);
        navigate("/pets");
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };

  return (
    <div className="container d-flex justify-content-between my-5">
      <div style={{ width: `48%` }}>
        <div
          className="w-100 p-3"
          style={{ border: `2px solid var(--baseGray)`, borderRadius: `6px` }}
        >
          <h2 className="mb-3" style={{ fontSize: `20px` }}>
            FAZER LOGIN
          </h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="form-control"
                id="emailInput"
                aria-describedby="emailHelp"
                placeholder="Email"
              />
            </div>
            <div className="form-group my-4">
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="form-control"
                id="passwordInput"
                aria-describedby="passwordHelp"
                placeholder="Senha"
              />
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <div className="black">Esqueceu a Senha?</div>
              <Button text="ENTRAR" submit />
            </div>
          </form>
        </div>
      </div>
      <div style={{ width: `48%` }}>
        <div
          className="w-100 p-3"
          style={{ border: `2px solid var(--baseGray)`, borderRadius: `6px` }}
        >
          <h2 className="mb-3" style={{ fontSize: `20px` }}>
            CRIAR CONTA
          </h2>
          <p>{lorem}</p>
          <div className="d-flex justify-content-end">
            <Button text="REGISTRAR" link="/register" />
          </div>
        </div>
      </div>
    </div>
  );
};
