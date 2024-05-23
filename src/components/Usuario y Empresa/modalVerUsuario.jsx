import React, { useState, useEffect } from "react";
import LogOutIcon from "../../assets/LogOutIcon";
import { useNavigate } from "react-router-dom";
import ModalDatosEmpresa from "./ModalDatosEmpresa";
import ModalDatosEdit from "./ModalEditDatos";

const ProfileModal = ({ open, onClose }) => {
  const navigate = useNavigate();
  const [formRegister, setFormRegister] = useState(false);
  const [hasCompany, setHasCompany] = useState(null);
  const [empresa, setEmpresa] = useState(null);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const perfil = () => {
    navigate("/perfil");
  };

  useEffect(() => {
    if (open) {
      const checkCompany = async () => {
        try {
          const response = await fetch(
            `https://localhost:7113/api/Empresas/Filtrar/EmpresaUsuario?email=${localStorage.getItem(
              "email"
            )}`
          );
          const data = await response.json();
          setHasCompany(data.length > 0);
          setEmpresa(data.length > 0 ? data[0] : null);
        } catch (error) {
          console.error("Error fetching company data:", error);
          setHasCompany(false);
        }
      };
      checkCompany();
    }
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isProfileModal = event.target.closest(".bg-slate-100");
      const isDataModal = event.target.closest(".modalDatos");
      if (open && !isProfileModal) {
        if (formRegister && !isDataModal) {
          return;
        }
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, formRegister, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="absolute  w-full top-0 right-0 left-0 z-10 flex items-end justify-end">
        <div className="relative top-20 flex justify-end items-center mr-7">
          <div className="bg-slate-100 p-8 rounded-lg">
            <section className="flex-wrap border-separate border-b-2 border-gray-300">
              <div className="Profile flex flex-wrap items-center mb-3">
                <img
                  className="w-18 h-17 rounded-full cursor-pointer"
                  src={
                    localStorage.getItem("photoURL") ||
                    "../src/assets/perfil1.png"
                  }
                  alt="avatar"
                />
                <div className="ml-3 text-sm text-center">
                  <p className="text-bold">
                    {localStorage.getItem("userName")?.length > 20
                      ? localStorage.getItem("userName").substring(0, 20) +
                        "..."
                      : localStorage.getItem("userName")}
                  </p>
                  <p>
                    {localStorage.getItem("email")?.length > 20
                      ? localStorage.getItem("email").substring(0, 20) + "..."
                      : localStorage.getItem("email")}
                  </p>
                </div>
              </div>
            </section>
            <section className="border-b-2 border-gray-300">
              <button type="button" onClick={perfil} className="mt-3 btn__menu">
                Mi Perfil
              </button>
            </section>
            <button onClick={logout} className="btn__menu">
              <LogOutIcon clases={"mr-3 size-7"} />
              LogOut
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
