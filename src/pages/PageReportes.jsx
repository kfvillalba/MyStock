import React from "react";
import PanelDivisor from "../components/PanelDivisor";
import { useForm } from "react-hook-form";

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(hola);
  };
  return (
    <div className="h-full w-full gap-4 p-10 shadow-md  shadow-black ">
      <form
        className="bg-white rounded-lg shadow-sm flex flex-col h-full p-5"
        onSubmit={onSubmit}
      >
        <div className="h-full">
          <div>
            <label className="label__form" htmlFor="tipoReporte">
              Seleccione el Tipo de reporte
            </label>
            <select
              className="input__form"
              name="tipoReporte"
              id="tipoReporte"
              {...register("tipoReporte", { required: "Campo Obligatorio" })}
            >
              <option value="-1">Seleccione un tipo de reporte</option>
              <option value="1">Listado de Cliente</option>
              <option value="2">Aqui los otros reportes :V</option>
            </select>
            <span className="message">{errors?.tipoReporte?.message}</span>
          </div>
          <div>
            <label className="label__form" htmlFor="fechaInicio">
              Fecha de Incio
            </label>
            <input
              {...register("fechaInicio", { required: "Campo Obligatorio" })}
              className="input__form"
              type="date"
              name=""
              id="fechaInicio"
            />
            <span className="message">{errors?.fechaInicio?.message}</span>
          </div>
          <div>
            <label className="label__form" htmlFor="fechaFinal">
              Fecha de Final
            </label>
            <input
              {...register("fechaFinal", { required: "Campo Obligatorio" })}
              className="input__form"
              type="date"
              name=""
              id="fechaFinal"
            />
            <span className="message">{errors?.fechaFinal?.message}</span>
          </div>
          <div>
            <label className="label__form" htmlFor="categoria">
              Seleccione una Categoria (Opcional)
            </label>
            <select
              className="input__form"
              name="categoria"
              id="tipoReporte"
              {...register("categoria")}
            >
              <option value="-1">Seleccione una categoria</option>
              //listado de categorias con .map copia de los otro :V
            </select>
            <span className="message">{errors?.categoria?.message}</span>
          </div>
          <div>
            <label className="label__form" htmlFor="producto">
              Seleccione un producto (Opcional)
            </label>
            <select
              className="input__form"
              name="producto"
              id="tipoReporte"
              {...register("producto")}
            >
              <option value="-1">Seleccione un producto</option>
              //listado de productoes con .map copia de los otro :V
            </select>
            <span className="message">{errors?.producto?.message}</span>
          </div>
          <div>
            <label className="label__form" htmlFor="cliente">
              Seleccione un cliente (Opcional)
            </label>
            <select
              className="input__form"
              name="cliente"
              id="tipoReporte"
              {...register("cliente")}
            >
              <option value="-1">Seleccione un cliente</option>
              //listado de clientes con .map copia de los otro :V
            </select>
            <span className="message">{errors?.cliente?.message}</span>
          </div>
          <div>
            <label className="label__form" htmlFor="proveedor">
              Seleccione un proveedor (Opcional)
            </label>
            <select
              className="input__form"
              name="proveedor"
              id="tipoReporte"
              {...register("proveedor")}
            >
              <option value="-1">Seleccione un proveedor</option>
              //listado de proveedores con .map copia de los otro :V
            </select>
            <span className="message">{errors?.proveedor?.message}</span>
          </div>
        </div>
        <section className="self-end">
          <button className="bnt__primary mt-5 ">Generar Reporte</button>
        </section>
      </form>
    </div>
  );
};

const PageReportes = () => {
  return <PanelDivisor Page={<Page />} />;
};

export default PageReportes;
