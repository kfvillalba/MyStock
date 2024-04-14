import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import DeleteIcon from "../assets/DeleteIcon";

const ModalRegisterFactura = ({
  open,
  onClose,
  registrar,
  productos,
  categorias,
  proveedores,
  clientes,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  const onSubmitDetalle = (data) => {
    console.log(data);
  };
  const [detalleFactura, setDetalleFactura] = useState([]);
  const agregarDetalle = (e) => {
    e.preventDefault();
    const detalle = {
      categoria: [watch("categoria")],
      producto: [watch("producto")],
      cantidad: [watch("cantidad")],
      precio: [watch("precio")],
      descuento: [watch("descuento")],
      total: [watch("total")],
    };
    setDetalleFactura([...detalleFactura, detalle]);
    reset();
  };

  if (!open) return null;
  return (
    <div className="fixed w-full top-0 left-0 h-full z-10 flex items-center justify-center bg-black/50">
      <form
        className="bg-white rounded-lg shadow-sm p-5 w-full mx-32"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-5 shadow-md rounded-sm shadow-black h-full">
          <h3>Nueva Factura</h3>
          <section className="flex flex-col gap-4 my-5">
            <div className="flex flex-col">
              <select
                type="text"
                className="select"
                {...register("cliente", {
                  min: { value: 0, message: "Seleccione un Cliente" },
                })}
              >
                <option value="-1">Seleccione un Cliente</option>
                {clientes?.map((cliente) => {
                  return (
                    <option key={cliente.id} value={`${cliente.id}`}>
                      {cliente.nombre}
                    </option>
                  );
                })}
              </select>
              <span className="message">{errors?.cliente?.message}</span>
            </div>

            <div className="h-3/4 overflow-y-auto snap-y shadow-sm shadow-black rounded-sm">
              <table className="w-full table-auto ">
                <thead className="[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white">
                  <tr>
                    <th className="text-center">#</th>
                    <th className="text-start pl-3">Categoria</th>
                    <th className="text-start pl-3">Producto</th>
                    <th className="text-start pl-3">Cantidad</th>
                    <th className="text-center">Precio</th>
                    <th className="text-center">Descuento %</th>
                    <th className="text-center">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {detalleFactura?.map((detalle, index) => {
                    return (
                      <tr className="even:bg-slate-100" key={index}>
                        <td className="text-center text-red-800">
                          <button onClick={(event) => console.log("event")}>
                            <DeleteIcon clases={"size-7 cursor-pointer"} />
                          </button>
                        </td>
                        <td>{detalle.categoria}</td>
                        <td>{detalle.producto}</td>
                        <td>{detalle.cantidad}</td>
                        <td>{detalle.precio}</td>
                        <td>{detalle.descuento}</td>
                        <td>{detalle.total}</td>
                      </tr>
                    );
                  })}
                  <tr className="even:bg-slate-100">
                    <td className="text-center text-red-800">
                      <button onClick={(event) => console.log("event")}>
                        <DeleteIcon clases={"size-7 cursor-pointer"} />
                      </button>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <select
                          type="text"
                          className="select"
                          {...register("categoria")}
                        >
                          <option value="-1">Seleccione un categoria</option>
                          {categorias?.map((categoria) => {
                            return (
                              <option
                                key={categoria.id}
                                value={`${categoria.id}`}
                              >
                                {categoria.nombre}
                              </option>
                            );
                          })}
                        </select>
                        <span className="message">
                          {errors?.categoria?.message}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <select
                          type="text"
                          className="select"
                          {...register("producto")}
                        >
                          <option value="-1">Seleccione un producto</option>
                          {productos?.map((producto) => {
                            return (
                              <option
                                key={producto.id}
                                value={`${producto.id}`}
                              >
                                {producto.nombre}
                              </option>
                            );
                          })}
                        </select>
                        <span className="message">
                          {errors?.categoria?.message}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          type="number"
                          className="input__form"
                          {...register("cantidad", {
                            required: false,
                            min: {
                              value: 0,
                              message: "Ingrese numeros validos",
                            },
                            valueAsNumber: true,
                          })}
                        />
                        <span className="message">
                          {errors?.cantidad?.message}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          type="number"
                          className="input__form"
                          {...register("precio", {
                            required: false,
                            min: {
                              value: 0,
                              message: "Ingrese numeros validos",
                            },
                            valueAsNumber: true,
                          })}
                        />
                        <span className="message">
                          {errors?.precio?.message}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          type="number"
                          className="input__form"
                          {...register("descuento", {
                            required: false,
                            min: {
                              value: 0,
                              message: "Ingrese numeros validos",
                            },
                            valueAsNumber: true,
                          })}
                        />
                        <span className="message">
                          {errors?.descuento?.message}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <input
                          type="number"
                          className="input__form"
                          {...register("total", {
                            required: false,
                            min: {
                              value: 0,
                              message: "Ingrese numeros validos",
                            },
                            valueAsNumber: true,
                          })}
                        />
                        <span className="message">
                          {errors?.total?.message}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              onClick={(e) => agregarDetalle(e)}
              className="bnt__primary mt-3"
            >
              Agregar Otro
            </button>
          </section>
          <div className="flex gap-4 justify-center">
            <button type="submit" className="bnt__primary mt-3">
              Aceptar
            </button>
            <button
              onClick={() => {
                reset(), onClose();
              }}
              className="bnt__danger mt-3 "
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ModalRegisterFactura;
