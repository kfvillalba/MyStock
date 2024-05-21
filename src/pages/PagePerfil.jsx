import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/perfil.png";
import defaultCover from "../assets/portada.png";
import { FiArrowLeft, FiTrash } from "react-icons/fi";

const ProfileHeader = ({
  avatar,
  cover,
  handleImageChange,
  handleDelete,
  navigateBack,
}) => {
  return (
    <div className="relative w-full h-64">
      <img src={cover} alt="Cover" className="w-full h-full object-cover" />
      <div className="absolute top-2 left-2">
        <button
          onClick={navigateBack}
          className="text-black hover:text-black text-3xl"
        >
          <FiArrowLeft />
        </button>
      </div>
      <div className="absolute top-2 right-2">
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600 text-3xl"
        >
          <FiTrash />
        </button>
      </div>
      <label
        htmlFor="cover"
        className="absolute bottom-2 right-2 bg-white rounded-full p-2 cursor-pointer"
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
          id="cover"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => handleImageChange(e, "cover")}
        />
      </label>
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 bg-gray-200 rounded-full overflow-hidden border-4 border-white">
        <img src={avatar} alt="Avatar" className="object-cover w-full h-full" />
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
            onChange={(e) => handleImageChange(e, "avatar")}
          />
        </label>
      </div>
    </div>
  );
};

const UserInfo = ({ username, email, password, confirmPassword }) => {
  return (
    <div className="w-full rounded-radius md:w-1/2 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Mi Perfil</h2>
      <div className="grid grid-cols-1 gap-6">
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
      </div>
    </div>
  );
};

const AdditionalInfo = ({ genero, intereses, setGenero, setIntereses }) => {
  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Información Adicional
      </h2>
      <div className="grid grid-cols-1 gap-6">
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
        <div>
          <label
            htmlFor="intereses"
            className="block text-sm font-medium text-gray-700"
          >
            Intereses
          </label>
          <input
            id="intereses"
            type="text"
            className="mt-1 p-2 block w-full border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            value={intereses}
            onChange={(e) => setIntereses(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

const PagePerfil = () => {
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [genero, setGenero] = useState("");
  const [intereses, setIntereses] = useState("");
  const [error, setError] = useState({ type: "", message: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputUsername, setInputUsername] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("email");
    const storedAvatar = localStorage.getItem("photoURL");
    const storedCover = localStorage.getItem("coverURL");

    setUsername(storedUsername || "");
    setEmail(storedEmail || "");
    setAvatar(storedAvatar || defaultAvatar);
    setCover(storedCover || defaultCover);
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
            text: "No se pudo eliminar el perfil. Por favor, inténtalo de nuevo más tarde.",
          });
        });
    } else {
      setError({
        type: "username",
        message: "El nombre de usuario no coincide",
      });
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "avatar") {
          setAvatar(reader.result);
          localStorage.setItem("photoURL", reader.result);
        } else if (type === "cover") {
          setCover(reader.result);
          localStorage.setItem("coverURL", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ProfileHeader
        avatar={avatar}
        cover={cover}
        handleImageChange={handleImageChange}
        handleDelete={handleDelete}
        navigateBack={() => Navigate("/Dashboard")}
      />
      <div className="flex justify-center">
        <UserInfo
          username={username}
          email={email}
          password={password}
          confirmPassword={confirmPassword}
        />
        <AdditionalInfo
          genero={genero}
          intereses={intereses}
          setGenero={setGenero}
          setIntereses={setIntereses}
        />
      </div>
    </div>
  );
};

export default PagePerfil;
