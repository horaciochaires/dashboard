import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/constants";
import { useState,useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import { Toast } from 'primereact/toast';

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const goTo = useNavigate();
  const auth = useAuth();
  const toast = useRef<Toast>(null);

  async function handleSubmitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
          password,
        }),
      });
      if (response.ok) {
        setErrorResponse("");
        const json = (await response.json()) as AuthResponse;
        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
        goTo("/dashboard");
      } else {
        const json = (await response.json()) as AuthResponseError;
        console.log(json.body.error);
        toast.current?.show({severity:'error', summary: 'Error', detail:'Usuario o Contraseña invalido', life: 3000});
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.current?.show({severity:'error', summary: 'Error', detail:'Error del servidor', life: 3000});
    }
  }
  if (auth.isAuthenticated) {
    toast.current?.show({severity:'success', summary: 'Success', detail:'Inicio de sesión exitoso', life: 3000});
    return <Navigate to="/dashboard" />;
  }
  async function handleSubmitSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          userName,
          password,
        }),
      });
      if (response.ok) {
        toast.current?.show({severity:'success', summary: 'Success', detail:'Message Content', life: 3000});
        setErrorResponse("");
        goTo("/");
      } else {
        console.log("User not created");
        const json = (await response.json()) as AuthResponseError;
        console.log(json.body.error);
        toast.current?.show({severity:'error', summary: 'Error', detail:'Usuario no creado, capture todos los campos del formulario', life: 3000});
        setErrorResponse(json.body.error);
        return;
      }
    } catch (error) {
      console.log(error);
      toast.current?.show({severity:'error', summary: 'Error', detail:'Error del servidor ', life: 3000});
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <>
      <Toast ref={toast} />
      <div className="body">
        <div className="main">
          <input type="checkbox" id="chk" aria-hidden="true" />
          <div className="signup">
            <form className="wrapper-signup" onSubmit={handleSubmitSignup}>
              <label id="signup" htmlFor="chk" aria-hidden="true">
                Sign up
              </label>
              <div className="field">
                <label className="text-white" htmlFor="chk" aria-hidden="true">
                  Nombre
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                />
              </div>
              <div className="field">
                <label className="text-white" htmlFor="chk" aria-hidden="true">
                  Nombre de usuario
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="User Name"
                  className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                />
              </div>
              <div className="field">
                <label className="text-white" htmlFor="chk" aria-hidden="true">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                />
              </div>
              <button className="button-login">Registrarse</button>
            </form>
          </div>
          <div className="login">
            <form className="wrapper-login" onSubmit={handleSubmitLogin}>
              <label id="login" htmlFor="chk" aria-hidden="true">
                Login
              </label>

              <div className="field">
                <label htmlFor="chk" aria-hidden="true">
                  Nombre de usuario
                </label>
                <input
                  type="passwtextord"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="User Name"
                  className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                />
              </div>
              <div className="field">
                <label htmlFor="chk" aria-hidden="true">
                  Contraseña
                </label>
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full"
                />
              </div>
              <button className="button-login">Iniciar Sesión</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
