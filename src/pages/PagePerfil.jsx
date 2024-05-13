import React, { useState, useEffect } from "react";
import defaultAvatar from "../assets/perfil.png";
import Swal from "sweetalert2";
import "../index.css";

const PagePerfil = () => {
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [intereses, setIntereses] = useState("");
  const [genero, setGenero] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({ type: "", message: "" }); // Estado de error
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUsername, setInputUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("email");
    const storedAvatar = localStorage.getItem("photoURL");

    setUsername(storedUsername || "");
    setEmail(storedEmail || "");
    setAvatar(storedAvatar || defaultAvatar); // Si no hay imagen de usuario, utiliza la imagen por defecto
  }, []);

  const handleDelete = () => {
    // Lógica para eliminar el perfil
    // Verificar si el nombre de usuario coincide antes de eliminar el perfil
    if (inputUsername.trim() === username) {
      // Eliminar el perfil
      // Swal.fire({
      //   position: "top-center",
      //   icon: "success",
      //   title: "Perfil eliminado",
      //   showConfirmButton: false,
      //   timer: 1500,
      // }).then(() => {
      //   // Aquí puedes realizar acciones adicionales después de mostrar el SweetAlert
      //   // Por ejemplo, redirigir a otra página o limpiar los datos del perfil
      // });
    } else {
      // Mostrar un mensaje de error si el nombre de usuario no coincide
      setError({
        type: "manual",
        message:
          "El nombre de usuario no coincide. Por favor, inténtalo de nuevo.",
      });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Limpia el campo de entrada del nombre de usuario al cerrar el modal
    setInputUsername("");
    // Limpia cualquier error mostrado
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
    <div className="min-h-screen bg-purple-dark text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div>
            <div className="mb-4 text-center font-bold">
              <label htmlFor="">MI PERFIL</label>
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
                  readOnly // Hacer el campo de solo lectura
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
                  readOnly // Hacer el campo de solo lectura
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
                  readOnly // Hacer el campo de solo lectura
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
                  readOnly // Hacer el campo de solo lectura
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="gender"
                >
                  Género
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="gender"
                  type="text"
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={handleOpenModal}
                >
                  Eliminar Perfil
                </button>
                <div style={{ width: "10px" }}></div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => history.goBack()} // Redirige a la vista anterior
                >
                  Regresar
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="flex-1 bg-green-100 text-center hidden lg:flex bor sm:rounded-lg">
          <div
            className="relative w-96 h-96 mr-4 bg-center bg-no-repeat rounded-full"
            style={{
              backgroundImage: `url(${avatar})`,
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
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
        </div>
      </div>
      {/* Modal de confirmación para eliminar perfil */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 w-96 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Eliminar Perfil</h2>
            <p className="mb-4">
              Por favor, ingresa tu nombre de usuario para confirmar la
              eliminación del perfil.
            </p>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              type="text"
              placeholder="Nombre de Usuario"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
            />
            {error.type === "manual" && (
              <p className="text-red-500 text-sm mb-4">{error.message}</p>
            )}
            <div className="flex justify-end">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
                onClick={handleDelete}
              >
                Eliminar
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
