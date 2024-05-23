import React, { useState } from "react";
import ProfileModal from "../Usuario y Empresa/modalVerUsuario";
import ModalVerNotificaciones from "../Usuario y Empresa/modalVerNotificaciones";
import { IoIosNotifications } from "react-icons/io";
const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [Notification, setNotification] = useState([[], []]);

  return (
    <>
      <ProfileModal
        open={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false);
        }}
      />
      <ModalVerNotificaciones
        open={isNotification}
        onClose={() => {
          setIsNotification(false);
        }}
      />
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

        <div className="flex gap-10">
          <button
            type="button"
            className="Profile flex flex-wrap items-center rounded-full "
            onClick={() => setIsNotification(true)}
          >
            <div>
              {Notification && (
                <div className="absolute ml-[30px] font-semibold rounded-full min-w-fit size-6 bg-red-900 p-1 text-xs text-white text-center items-center ">
                  {Notification.length}
                </div>
              )}

              <IoIosNotifications className="size-10  transition-all  text-green-800" />
            </div>
          </button>
          <button
            type="button"
            className="Profile flex flex-wrap items-center rounded-full border-2 border-purple-dark"
            onClick={() => setIsMenuOpen(true)}
          >
            <img
              className="rounded-full size-14"
              src={
                localStorage.getItem("photoURL") || "../src/assets/perfil1.png"
              }
              alt="avatar"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default TopNavbar;
