import React, { useState, useEffect } from "react";
import LogOutIcon from "../assets/LogOutIcon";
import { useNavigate } from "react-router-dom";

const ProfileModal = ({ open, onClose }) => {
  const Navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    Navigate("/login");
  };

  const perfil = () => {
    Navigate("/perfil");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && !event.target.closest(".bg-slate-100")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="fixed w-full top-0 left-0 z-10 flex items-center justify-center">
        <div
          className="fixed inset-0 flex justify-end items-center mr-7 "
          style={{ height: "70vh" }}
        >
          <div className="bg-slate-100 p-8 rounded-lg">
            <section className="flex-wrap border-separate border-b-2 border-gray-300">
              <div className="Profile flex flex-wrap items-center mb-3">
                <img
                  className="w-18 h-17 rounded-full cursor-pointer"
                  src={localStorage.getItem("photoURL")}
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
              <button onClick={perfil} className="mt-3 btn__menu">
                Mi Perfil
              </button>

              <button
                className=" btn__menu"
                onClick={() => {
                  onClose();
                }}
              >
                Cerrar
              </button>
            </section>
            <button onClick={Logout} className="btn__menu">
              <LogOutIcon clases={"mr-3  size-7"} />
              LogOut
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
