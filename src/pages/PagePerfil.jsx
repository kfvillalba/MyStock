import React, { useState, useEffect } from "react";
import defaultAvatar from "../assets/perfil.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PagePerfil = () => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [intereses, setIntereses] = useState("");
  const [genero, setGenero] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ type: "", message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("email");
    const storedAvatar = localStorage.getItem("photoURL");

    setUsername(storedUsername || "");
    setEmail(storedEmail || "");
    setAvatar(storedAvatar || defaultAvatar);
  }, []);

  const handleDelete = () => {
    if (inputUsername.trim() === username) {
      fetch(
        `https://localhost:7073/autenticacion-service/Usuarios/EliminarCuentaPorUserName?userName=${username}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Perfil eliminado",
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              localStorage.clear();
              Navigate("/login");
            });
          } else {
            throw new Error("No se pudo eliminar el perfil");
          }
        })
        .catch((error) => {
          console.error("Error al eliminar el perfil:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo eliminar el perfil. Por favor, inténtalo de nuevo.",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El nombre de usuario no coincide. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInputUsername("");
    setError({ type: "", message: "" });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAvatar(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-8 flex flex-col items-center relative">
        <div className="w-48 h-48 bg-gray-200 rounded-full overflow-hidden mb-4 relative z-10">
          <img
            src={avatar}
            alt="Avatar"
            className="object-cover w-full h-full"
          />
          <label
            htmlFor="image"
            className="absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21a1 1 0 01-1 1H6a1 1 0 01-1-1V8a1 1 0 011-1h7l2-2h4a1 1 0 011 1v14z"
              />
            </svg>
            <input
              id="image"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de Usuario
              </label>
              <input
                id="username"
                type="text"
                className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={username}
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={email}
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={password}
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={confirmPassword}
                readOnly
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Género
              </label>
              <input
                id="gender"
                type="text"
                className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={genero}
                onChange={(e) => setGenero(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between w-full">
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mr-4"
            onClick={handleOpenModal}
          >
            Eliminar Perfil
          </button>
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => Navigate("/")}
          >
            Regresar
          </button>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Eliminar Perfil</h2>
            <p className="mb-4">
              Por favor, ingresa tu nombre de usuario para confirmar la
              eliminación del perfil.
            </p>
            <input
              type="text"
              className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Nombre de Usuario"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
            />
            {error.type === "manual" && (
              <p className="text-red-500 text-sm mt-2">{error.message}</p>
            )}
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mr-2"
                onClick={handleDelete}
              >
                Eliminar
              </button>
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                onClick={handleCloseModal}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PagePerfil;
