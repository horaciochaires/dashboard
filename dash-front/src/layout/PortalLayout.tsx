import React, { useRef } from "react";
import { useAuth } from "../auth/AuthProvider";
import { Link } from "react-router-dom";
import { API_URL } from "../auth/constants";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();
  const toast = useRef<Toast>(null);

  async function handleSignOut() {
    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signOut();
      }
    } catch (error) {
      console.log("error");
    }
  }
  
  const accept = async () => {
    await handleSignOut(); // Llamada a handleSignOut sin pasar el evento
  };
  const reject = () => {};
  const confirm2 = () => {
    confirmDialog({
      message: "¿Te gustaría cerrar sesión en este momento?",
      header: "Cerrar sesión",
      icon: "pi pi-info-circle",
      defaultFocus: "reject",
      acceptClassName: "p-button-danger",
      accept,
      reject,
    });
  };

  return (
    <>
      <ConfirmDialog />
      <header>
        <nav className="navbar">
          <div className="logo">
            <a href="#">Hola {auth.getUser()?.userName} </a>
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <a href="#" onClick={confirm2}>
                Cerrar sesión
              </a>
              <i className=" pl-2 fas fa-sign-out-alt white"></i>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
