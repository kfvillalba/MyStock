import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ModalEditFactura = ({
  open,
  onClose,
  registrar,
  productos,
  categorias,
  proveedores,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  if (!open) return null;
  return (
    <div className="fixed w-full top-0 left-0 h-full z-10 flex items-center justify-center bg-black/50">
      <form
        className="bg-white rounded-lg shadow-sm p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="p-5 shadow-md rounded-sm shadow-black h-full">
          <h3>Editar Factura</h3>
          <section className="flex flex-col gap-4 my-5">
            <div className="flex flex-col">
              <select
                type="text"
                className="select"
                {...register("categoria", {
                  min: { value: 0, message: "Seleccione una Categoria" },
                })}
              >
                <option value="-1">Seleccione una categoria</option>
                {categorias?.map((categoria) => {
                  return (
                    <option key={categoria.id} value={`${categoria.id}`}>
                      {categoria.nombre}
                    </option>
                  );
                })}
              </select>
              <span className="message">{errors?.categoria?.message}</span>
            </div>
            <div className="flex flex-col">
              <select
                type="text"
                className="select"
                {...register("producto", {
                  min: { value: 0, message: "Seleccione un Producto" },
                })}
              >
                <option value="-1">Seleccione un Producto</option>
                {productos?.map((producto) => {
                  return (
                    <option key={producto.id} value={`${producto.id}`}>
                      {producto.nombre}
                    </option>
                  );
                })}
              </select>
              <span className="message">{errors?.producto?.message}</span>
            </div>
            <div className="flex flex-col">
              <select
                type="text"
                className="select"
                {...register("proveedor", {
                  min: { value: 0, message: "Seleccione un Proveedor" },
                })}
              >
                <option value="-1">Seleccione un Proveedor</option>
                {proveedores?.map((proveedor) => {
                  return (
                    <option key={proveedor.id} value={`${proveedor.id}`}>
                      {proveedor.nombre}
                    </option>
                  );
                })}
              </select>
              <span className="message">{errors?.proveedor?.message}</span>
            </div>
            <div>
              <input
                placeholder="Precio de Compra"
                type="number"
                className="input__form"
                {...register("precioCompra", {
                  required: {
                    value: true,
                    message: "El Precio de Compra es obligatorio",
                  },
                  min: { value: true, message: "Ingrese numeros validos" },
                  valueAsNumber: { value: true },
                })}
              />
              <span className="message">{errors?.precioCompra?.message}</span>
            </div>
            <div>
              <input
                placeholder="Precio de Venta"
                type="number"
                className="input__form"
                {...register("precioVenta", {
                  required: {
                    value: true,
                    message: "El Precio de Venta es obligatorio",
                  },
                  min: { value: true, message: "Ingrese numeros validos" },
                  valueAsNumber: { value: true },
                })}
              />
              <span className="message">{errors?.precioVenta?.message}</span>
            </div>
            <div>
              <input
                placeholder="Cantidad"
                type="number"
                className="input__form"
                {...register("cantidad", {
                  required: {
                    value: true,
                    message: "La cantidad es obligatoria",
                  },
                  min: { value: true, message: "Ingrese numeros validos" },
                  valueAsNumber: { value: true },
                })}
              />
              <span className="message">{errors?.cantidad?.message}</span>
            </div>
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

export default ModalEditFactura;
