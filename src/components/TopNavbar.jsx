import React, { useState } from "react";
import { Link } from "react-router-dom";

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-20 shadow-sm bg-slate-200 shadow-gray-700 flex p-3 justify-between items-center ">
      <section className="flex items-center pl-5">
        <button>
          <img
            className="rounded-full size-14"
            src={"../src/assets/en-stock.png"}
            alt="avatar"
          />
        </button>
        <h1 className="pl-5 text-center  text-purple-light text-5xl ">
          MyStock
        </h1>
      </section>

      <div className="relative">
        <button
          className="Profile flex flex-wrap items-center rounded-full border-2 border-purple-dark"
          onClick={handleMenuClick}
        >
          <img
            className="rounded-full size-14"
            src={localStorage.getItem("photoURL") || "../src/assets/perfil.png"}
            alt="avatar"
          />
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-10">
            <div className="py-1">
              <Link
                to="/editar-perfil"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Editar Perfil {/* Enlace a la página de edición de perfil */}
              </Link>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => console.log("Option 1 clicked")}
              >
                Opción 1
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => console.log("Option 2 clicked")}
              >
                Opción 2
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => console.log("Option 3 clicked")}
              >
                Opción 3
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
