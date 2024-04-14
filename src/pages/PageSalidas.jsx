import React, { useState, useEffect } from "react";
import PanelDivisor from "../components/PanelDivisor";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import Swal from "sweetalert2";
import ModalRegisterExistencias from "../components/ModalRegisterExistencias";
import ModalEditExistencias from "../components/ModalEditExistencias";
import ModalRegisterFactura from "../components/ModalRegisterFactura";
import ModalEditFactura from "../components/ModalEditFactura";

const Page = () => {
  const [facturas, setFacturas] = useState([
    {
      numFactura: "sad",
      fecha: "sad",
      nombre: "sad",
      totalPagado: "sad",
    },
  ]);
  const [clientes, setClientes] = useState();
  const [formRegister, setformRegister] = useState(false);
  const [formEdit, setformEdit] = useState(false);

  return (
    <>
      <ModalRegisterFactura
        open={formRegister}
        onClose={() => {
          setformRegister(false);
        }}
        registrar={(dataForm) => {
          console.log(dataForm);
          setExistencia([...existencia, dataForm]);
        }}
      />
      {
        <ModalEditFactura
          open={formEdit}
          onClose={() => {
            setformEdit(false);
          }}
          editar={(dataForm) => {}}
        />
      }
      <div className="p-5  shadow-md rounded-sm shadow-black h-full">
        <h3>Lista Facturas</h3>
        <section>
          <button
            onClick={() => setformRegister(true)}
            className="bnt__primary"
          >
            Nueva Factura
          </button>
        </section>

        <section className="flex row-span-3 flex-wrap justify-between gap-4 my-5">
          <div>
            <input
              placeholder="Numero de factura"
              type="number"
              className="input__form"
            />
          </div>
          <div>
            <select type="text" className="select">
              <option value="-1">Todos los Clientes</option>
              {clientes?.map((cliente) => {
                return (
                  <option key={cliente.id} value={`${cliente.id}`}>
                    {cliente.nombre}
                  </option>
                );
              })}
            </select>
          </div>
        </section>

        <div className="h-3/4 overflow-y-auto snap-y shadow-sm shadow-black rounded-sm">
          <table className="w-full table-auto ">
            <thead className="[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white">
              <tr>
                <th className="text-start pl-3">Num Factura</th>
                <th className="text-start pl-3">Fecha</th>
                <th className="text-start pl-3">Cliente</th>
                <th className="text-center">Total Pagado</th>
                <th className="text-center">Editar</th>
                <th className="text-center">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {facturas?.map((factura, index) => {
                return (
                  <tr className="even:bg-slate-100" key={index}>
                    <td className="pl-3">{factura.numFactura}</td>
                    <td>{factura.fecha}</td>
                    <td>{factura.nombre}</td>
                    <td>{factura.totalPagado}</td>
                    <td className="text-center text-blue-800">
                      <button onClick={(event) => setformEdit(true)}>
                        <EditIcon clases={"size-7 cursor-pointer"} />
                      </button>
                    </td>
                    <td className="text-center text-red-800">
                      <button onClick={(event) => console.log("event")}>
                        <DeleteIcon clases={"size-7 cursor-pointer"} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
const PageSalidas = () => {
  return <PanelDivisor Page={<Page />} />;
};

export default PageSalidas;
