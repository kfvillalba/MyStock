import React, { useState, useEffect } from "react";
import PanelDivisor from "../components/PanelDivisor";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import Swal from "sweetalert2";
import ModalRegisterExistencias from "../components/ModalRegisterExistencias";
import ModalEditExistencias from "../components/ModalEditExistencias";

const Page = () => {
  const [existencia, setExistencia] = useState();
  const [categorias, setCategorias] = useState();
  const [productos, setProductos] = useState();
  const [proveedores, setProveedores] = useState();

  const [formRegister, setformRegister] = useState(false);
  const [formEdit, setformEdit] = useState(false);

  return (
    <>
      <ModalRegisterExistencias
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
        <ModalEditExistencias
          open={formEdit}
          onClose={() => {
            setformEdit(false);
          }}
          editar={(dataForm) => {}}
        />
      }
      <div className="p-5  shadow-md rounded-sm shadow-black h-full">
        <h3>Lista existencia</h3>
        <section>
          <button
            onClick={() => setformRegister(true)}
            className="bnt__primary"
          >
            Agregar Existencia
          </button>
        </section>

        <section className="flex row-span-3 flex-wrap justify-between gap-4 my-5">
          <div>
            <select type="text" className="select">
              <option value="-1">Todas las Categorias</option>
              {categorias?.map((categoria) => {
                return (
                  <option key={categoria.id} value={`${categoria.id}`}>
                    {categoria.nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <select type="text" className="select">
              <option value="-1">Todos los Productos</option>
              {productos?.map((producto) => {
                return (
                  <option key={producto.id} value={`${producto.id}`}>
                    {producto.nombre}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <select type="text" className="select">
              <option value="-1">Todos los Proveedores</option>
              {proveedores?.map((proveedor) => {
                return (
                  <option key={proveedor.id} value={`${proveedor.id}`}>
                    {proveedor.nombre}
                  </option>
                );
              })}
            </select>
          </div>
        </section>

        <div className="h-3/4 overflow-y-auto snap-y shadow-sm shadow-black rounded-sm">
          <table className="w-full ">
            <thead className="[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white">
              <tr>
                <th className="text-start pl-3">Categoria</th>
                <th className="text-start pl-3">Producto</th>
                <th className="text-start pl-3">Proveedor</th>
                <th className="text-center w-28">Comprobante</th>
                <th className="text-center w-28">Existencia Inicial</th>
                <th className="text-center w-28">Existencia Actual</th>
                <th className="text-center w-28">Precio de Compra</th>
                <th className="text-center w-28">Precio de Venta</th>
                <th className="text-center w-28">Fecha de Entrada</th>
                <th className="text-center w-28">Agregar</th>
                <th className="text-center w-28">Editar</th>
                <th className="text-center w-28">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {existencia?.map((existencia, index) => {
                return (
                  <tr className="even:bg-slate-100" key={index}>
                    <td className="pl-3">{existencia.nombreCategoria}</td>
                    <td className="pl-3">{existencia.nombreProducto}</td>
                    <td className="pl-3">{existencia.nombreProveedor}</td>
                    <td className="pl-3">{existencia.comprobante}</td>
                    <td className="pl-3">{existencia.existenciaInicial}</td>
                    <td className="pl-3">{existencia.existenciaActual}</td>
                    <td className="pl-3">{existencia.precioCompra}</td>
                    <td className="pl-3">{existencia.precioVenta}</td>
                    <td className="pl-3">{existencia.fechaEntrada}</td>
                    <td className="text-center text-blue-800">
                      <button
                        onClick={(event) =>
                          editarCliente(
                            event,
                            existencia.id,
                            existencia.nombre,
                            existencia.celular,
                            existencia.correo
                          )
                        }
                      >
                        <EditIcon clases={"size-7 cursor-pointer"} />
                      </button>
                    </td>
                    <td className="text-center text-red-800">
                      <button
                        onClick={(event) =>
                          eliminarClientes(event, existencia.id)
                        }
                      >
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
const Pageexistencia = () => {
  return <PanelDivisor Page={<Page />} />;
};

export default Pageexistencia;
