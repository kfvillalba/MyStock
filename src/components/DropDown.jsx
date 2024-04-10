import React, { useState } from "react";
import ArrowDownIcon from "../assets/ArrowDownIcon";
import ArrowUpIcon from "../assets/ArrowUpIcon";
import { NavLink } from "react-router-dom";
import ProductosIcon from "../assets/ProductosIcon";
import ProveedoresIcon from "../assets/ProveedoresIcon";
import CategoriasIcon from "../assets/CategoriasIcon";

const DropDown = ({ nombre, Icon, val }) => {
  const [isOpen, setIsOpen] = useState(val);
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((isOpen) => !isOpen);
        }}
        className="btn__menu flex "
      >
        {Icon}

        <div className="flex flex-grow justify-between ">
          {nombre}
          {!isOpen ? (
            <ArrowDownIcon clases={"size-7 "} />
          ) : (
            <ArrowUpIcon clases={"size-7 "} />
          )}
        </div>
      </button>
      {isOpen && (
        <div className="w-ful relative pl-10">
          <NavLink to={"/stock/categorias"}>
            {({ isActive }) => {
              return isActive ? (
                <button className="btn__menu__active">
                  <CategoriasIcon clases={"mr-3 size-7"} />
                  Categorias
                </button>
              ) : (
                <button className="btn__menu">
                  <CategoriasIcon clases={"mr-3 size-7"} />
                  Categorias
                </button>
              );
            }}
          </NavLink>
          <NavLink to={"/stock/productos"}>
            {({ isActive }) => {
              return isActive ? (
                <button className="btn__menu__active">
                  <ProductosIcon clases={"mr-3 size-7"} />
                  Productos
                </button>
              ) : (
                <button className="btn__menu">
                  <ProductosIcon clases={"mr-3 size-7"} />
                  Productos
                </button>
              );
            }}
          </NavLink>
          <NavLink to={"/stock/proveedores"}>
            {({ isActive }) => {
              return isActive ? (
                <button className="btn__menu__active">
                  <ProveedoresIcon clases={"mr-3 size-7"} />
                  Proveedores
                </button>
              ) : (
                <button className="btn__menu">
                  <ProveedoresIcon clases={"mr-3 size-7"} />
                  Proveedores
                </button>
              );
            }}
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default DropDown;
