import React, { useState, useEffect } from "react";
import defaultAvatar from "../assets/perfil.png";
import Swal from "sweetalert2";
import "../index.css";
import PanelDivisor from "../components/PanelDivisor";

const Page = () => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ type: "", message: "" }); // Estado de error

  useEffect(() => {
    // Simulación de carga de datos del usuario desde localStorage
    const storedUsername = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("email");
    const storedAvatar = localStorage.getItem("photoURL");

    setUsername(storedUsername || "");
    setEmail(storedEmail || "");
    setAvatar(storedAvatar || defaultAvatar); // Si no hay imagen de usuario, utiliza la imagen por defecto
  }, []);

  const handleSave = () => {
    // Lógica para guardar los cambios del perfil
    if (password !== confirmPassword) {
      setError({
        type: "manual",
        message: "Las contraseñas no coinciden. Por favor, inténtalo de nuevo.",
      });
      return;
    }

    // Simulación de éxito al guardar el perfil
    // Swal.fire({
    //   position: "top-center",
    //   icon: "success",
    //   title: "Perfil actualizado",
    //   showConfirmButton: false,
    //   timer: 1500,
    // }).then(() => {
    //   // Aquí puedes realizar acciones adicionales después de mostrar el SweetAlert
    //   // Por ejemplo, redirigir a otra página o resetear el formulario
    //   reset(); // Asegúrate de definir la función reset
    //   handleShowAuthForm(); // Asegúrate de definir la función handleShowAuthForm
    // });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full shadow-md bg-purple-dark">
      <div>
        <div className="mb-4 text-center">
          <img
            src={avatar}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover shadow mx-auto"
          />
        </div>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Nombre de Usuario
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
              Confirmar Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSave}
            >
              Guardar Perfil
            </button>
            <div style={{ width: "10px" }}></div>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => history.goBack()} // Redirige a la vista anterior
            >
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PagePerfil = () => {
  return <PanelDivisor Page={<Page />} />;
};

export default PagePerfil;
