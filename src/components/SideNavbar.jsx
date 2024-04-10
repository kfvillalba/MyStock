import React, { useState } from "react";
import DashboardIcon from "../assets/DashboardIcon";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ClienteIcon from "../assets/ClienteIcon";
import ProductosIcon from "../assets/ProductosIcon";
import ControlExistenciasIcon from "../assets/ControlExistenciasIcon";
import ReportesIcon from "../assets/ReportesIcon";
import LogOutIcon from "../assets/LogOutIcon";
import DropDown from "./DropDown";

const SideNavbar = () => {
  const Navigate = useNavigate();
  const Logout = () => {
    localStorage.clear();
    console.log(localStorage);
    Navigate("/login");
  };
  return (
    <nav className="bg-purple-dark object-cover h-full text-gray-300 relative flex flex-col">
      <section className="flex-wrap">
        <h1 className="p-2 text-center shadow-md shadow-black text-purple-light text-5xl ">
          MyStock
        </h1>
        <header className="Profile flex flex-wrap items-center p-5  shadow-sm shadow-black ">
          <img
            className="rounded-full shadow-sm shadow-white"
            src={
              localStorage.getItem("photoURL") ||
              "https://cdn-icons-png.flaticon.com/512/282/282133.png"
            }
            alt="avatar"
            style={{ width: "64px", height: "64px" }}
          />
          <div className="ml-3">
            <p className="text-lg">{localStorage.getItem("displayName")}</p>
            <p className="text-sm">{localStorage.getItem("email")}</p>
          </div>
        </header>
        <h1 className="py-3 shadow-sm shadow-black">Navegación Principal</h1>
      </section>
      <section className="h-full [&>footer>ul>li]:mx-3 [&>header>ul>li]:mx-3 flex flex-col relative">
        <header className="overflow-y-auto h-1 flex flex-col flex-grow shadow-sm shadow-black">
          <ul>
            <li>
              <NavLink to={"/dashboard"}>
                {({ isActive }) => {
                  return isActive ? (
                    <button className="btn__menu__active">
                      <DashboardIcon clases={"mr-3 size-7"} />
                      Dashboard
                    </button>
                  ) : (
                    <button className="btn__menu">
                      <DashboardIcon clases={"mr-3 size-7"} />
                      Dashboard
                    </button>
                  );
                }}
              </NavLink>
            </li>
            <li>
              <NavLink to={"/clientes"}>
                {({ isActive }) => {
                  return isActive ? (
                    <button className="btn__menu__active">
                      <ClienteIcon clases={"mr-3 size-7"} />
                      Clientes
                    </button>
                  ) : (
                    <button className="btn__menu">
                      <ClienteIcon clases={"mr-3 size-7"} />
                      Clientes
                    </button>
                  );
                }}
              </NavLink>
            </li>
            <li>
              <DropDown
                nombre={"Gestión de Productos"}
                Icon={<ProductosIcon clases={"mr-3 size-7"} />}
              />
            </li>
            <li>
              <NavLink to={"/controlexistencias"}>
                {({ isActive }) => {
                  return isActive ? (
                    <button className="btn__menu__active">
                      <ControlExistenciasIcon clases={"mr-3 size-7"} />
                      Crontrol Existencias
                    </button>
                  ) : (
                    <button className="btn__menu">
                      <ControlExistenciasIcon clases={"mr-3 size-7"} />
                      Crontrol Existencias
                    </button>
                  );
                }}
              </NavLink>
            </li>
            <li>
              <NavLink to={"/reportes"}>
                {({ isActive }) => {
                  return isActive ? (
                    <button className="btn__menu__active">
                      <ReportesIcon clases={"mr-3 size-7"} />
                      Reportes
                    </button>
                  ) : (
                    <button className="btn__menu">
                      <ReportesIcon clases={"mr-3 size-7"} />
                      Reportes
                    </button>
                  );
                }}
              </NavLink>
            </li>
          </ul>
        </header>
        <footer className="my-1">
          <ul>
            <li>
              <button onClick={Logout} className="btn__menu">
                <LogOutIcon clases={"mr-3  size-7"} />
                LogOut
              </button>
            </li>
          </ul>
        </footer>
      </section>
    </nav>
  );
};

export default SideNavbar;
