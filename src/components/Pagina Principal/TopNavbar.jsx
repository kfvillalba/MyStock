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
      <div className="lg:h-20 md:h-12 shadow-sm bg-slate-200 shadow-gray-700 flex p-3 justify-between items-center ">
        <section className="flex items-center pl-5">
          <button>
            <img
              className="rounded-full lg:size-14 md:size-9"
              src={"../src/assets/en-stock.png"}
              alt="avatar"
            />
          </button>
          <h1 className="pl-5 text-center  text-purple-light lg:text-5xl md:text-xl ">
            MyStock
          </h1>
        </section>

        <div className="flex  lg:gap-10 md:gap-6">
          <button
            type="button"
            className="Profile flex flex-wrap items-center rounded-full "
            onClick={() => setIsNotification(true)}
          >
            <div>
              {Notification && (
                <div className="absolute lg:ml-[30px] md:ml-[24px]  font-semibold rounded-full min-w-fit md:size-4 lg:size-6 bg-red-900 lg:p-1 text-xs text-white text-center items-center ">
                  {Notification.length}
                </div>
              )}

              <IoIosNotifications className="lg:size-10 md:size-8  transition-all  text-green-800" />
            </div>
          </button>
          <button
            type="button"
            className="Profile flex flex-wrap items-center rounded-full border-2 border-purple-dark"
            onClick={() => setIsMenuOpen(true)}
          >
            <img
              className="rounded-full lg:size-14 md:size-8"
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
