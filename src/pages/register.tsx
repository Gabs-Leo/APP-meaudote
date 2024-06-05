import { FormEvent, useState } from "react";
import { Button } from "../components/button/Button";
import { lorem } from "../utils/Utils";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";
import { Navbar } from "../components/navbar/Navbar";

export const Register = () => {
  return <div>
  <Navbar />
  <Header height="400px" />
  <RegisterForm />
  <Footer />
  </div>
}

interface RegisterForm {
  cpf:string
  phone:string
  state:string
  city:string
  email:string
  password:string
  name:string
}

const defaultForm:RegisterForm = {
  cpf:"",
  phone:"",
  state:"",
  city:"",
  email:"",
  password:"",
  name:""
}

const RegisterForm = () => {
  const [userForm, setUserForm] = useState<RegisterForm>(defaultForm);
  const navigate = useNavigate();

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    api.post("/auth/register", userForm).then(response => {
      localStorage.setItem("token", response.data.data as string);
      navigate("/pets");
    }).catch(error => {
      console.log(error.response.data.errors);
    })
  }

  return <div className="container d-flex justify-content-center my-5">
    <div style={{width: `48%`}}>
      <div className="w-100 p-3" style={{border: `2px solid var(--baseGray)`, borderRadius: `6px`}}>
        <h2 className="mb-3" style={{fontSize: `20px`}}>CRIAR CONTA</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group mb-4">
            <input required value={userForm.name} onChange={(e) => setUserForm({...userForm, name: (e.target.value)})} type="name" className="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Nome de Usuário" />
          </div>
          <div className="d-flex justify-content-between w-100">
            <div style={{width: `52%`}} className="form-group mb-4">
              <input required value={userForm.cpf} onChange={(e) => setUserForm({...userForm, cpf: (e.target.value)})} type="cpf" className="form-control" id="cpfInput" aria-describedby="cpfHelp" placeholder="CPF" />
            </div>
            <div style={{width: `44%`}} className="form-group mb-4">
              <input required value={userForm.phone} onChange={(e) => setUserForm({...userForm, phone: (e.target.value)})} type="cpf" className="form-control" id="cpfInput" aria-describedby="cpfHelp" placeholder="Telefone" />
            </div>
          </div>
          <div className="d-flex justify-content-between w-100">
            <div style={{width: `44%`}} className="form-group mb-4">
              <input required value={userForm.state} onChange={(e) => setUserForm({...userForm, state: (e.target.value)})} type="cpf" className="form-control" id="stateInput" aria-describedby="cpfHelp" placeholder="Estado" />
            </div>
            <div style={{width: `52%`}} className="form-group mb-4">
              <input required value={userForm.city} onChange={(e) => setUserForm({...userForm, city: (e.target.value)})} type="cpf" className="form-control" id="cityInput" aria-describedby="cpfHelp" placeholder="Cidade" />
            </div>
          </div>
          <div className="form-group">
            <input required value={userForm.email} onChange={(e) => setUserForm({...userForm, email: (e.target.value)})} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" placeholder="Email" />
          </div>
          <div className="form-group my-4">
            <input required value={userForm.password} onChange={(e) => setUserForm({...userForm, password: (e.target.value)})} type="password" className="form-control" id="passwordInput" aria-describedby="passwordHelp" placeholder="Senha" />
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="black">Esqueceu a Senha?</div>
            <Button text="ENTRAR" submit />
          </div>
        </form>
      </div>
    </div>
  </div>
}