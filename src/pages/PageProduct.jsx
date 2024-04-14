import React, { useState, useEffect } from "react";
import PanelDivisor from "../components/PanelDivisor";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import ModalRegisterProducto from "../components/ModalRegisterProducto";
import Swal from "sweetalert2";

import ModalEditProducto from "../components/ModalEditProducto";

const Page = () => {
  const [productos, setProductos] = useState();
  const [categorias, setCategorias] = useState();

  useEffect(() => {
    fetch("https://localhost:7127/api/Productos/Consultar")
      .then((responde) => responde.json())
      .then((productos) => setProductos(productos));
  }, [productos]);

  useEffect(() => {
    fetch("https://localhost:7127/api/Categorias/Consultar")
      .then((responde) => responde.json())
      .then((categorias) => setCategorias(categorias));
  }, [categorias]);

  const getCategoriaPorId = (idCategoria) => {
    // Suponiendo que categorias es un array que contiene objetos con la estructura { id, nombre }
    const categoriaEncontrada = categorias?.find(
      (categoria) => categoria.id === idCategoria
    );
    return categoriaEncontrada ? categoriaEncontrada.nombre : "Sin categoría";
  };

  const [formRegister, setformRegister] = useState(false);
  const [formEdit, setformEdit] = useState(false);

  const [dataProducto, setDataProducto] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    idCategoria: "",
  });

  const eliminarProducto = (event, id) => {
    event.preventDefault();
    Swal.fire({
      title: "¿Estas seguro?",
      text: "No podra deshacer este cambio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Bórralo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `https://localhost:7127/api/Productos/Eliminar?id=${id}`,
            {
              method: "DELETE",
            }
          );

          if (response.ok) {
            Swal.fire({
              title: "Borrado!",
              text: "Se ha borrado con éxito",
              icon: "success",
            });
          } else {
            throw new Error("Error al intentar borrar la categoría");
          }
        } catch (error) {
          console.error(error);
          Swal.fire({
            icon: "error",
            title: "Error al borrar el producto",
            text: error.message,
          });
        }
      }
    });
  };

  const editarProducto = (event, id, nombre, descripcion, idCategoria) => {
    event.preventDefault();
    setDataProducto({ id, nombre, descripcion, idCategoria });
    setformEdit(true);
  };

  return (
    <>
      <ModalRegisterProducto
        open={formRegister}
        onClose={() => {
          setformRegister(false);
        }}
        registrar={(dataForm) => {
          console.log(dataForm);
          setProductos([...productos, dataForm]);
          //aca logica
        }}
        categorias={categorias}
      />
      <ModalEditProducto
        open={formEdit}
        dataProducto={dataProducto}
        onClose={() => {
          setformEdit(false);
        }}
        editar={(dataForm) => {
          console.log(dataForm);
          //con esta dataForm modifican
        }}
        categorias={categorias}
      />
      <div className="p-5  shadow-md rounded-sm shadow-black h-full">
        <h3>Lista Productos</h3>
        <section>
          <button
            onClick={() => setformRegister(true)}
            className="bnt__primary"
          >
            Agregar Productos
          </button>
        </section>

        <section className="flex flex-col my-5">
          <label className="label__form" htmlFor="textBuscarProducto">
            Buscar Producto
          </label>
          <input className="input__form" id="textBuscarProducto" type="text" />
        </section>

        <div className="h-3/4 overflow-y-auto snap-y shadow-sm shadow-black rounded-sm">
          <table className="w-full ">
            <thead className="[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white">
              <tr>
                <th className="text-start pl-3">Categoria</th>
                <th className="text-start pl-3">Nombre</th>
                <th className="text-start pl-3">Descripcion</th>
                <th className="text-center w-28">Editar</th>
                <th className="text-center w-28">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {productos?.map((producto, index) => {
                return (
                  <tr className="even:bg-slate-100" key={index}>
                    <td className="pl-3">
                      {getCategoriaPorId(producto.idCategoria)}
                    </td>
                    <td className="pl-3">{producto.nombre}</td>
                    <td className="pl-3">{producto.descripcion}</td>
                    <td className="text-center text-blue-800">
                      <button
                        onClick={(event) =>
                          editarProducto(
                            event,
                            producto.id,
                            producto.nombre,
                            producto.descripcion,
                            producto.idCategoria
                          )
                        }
                      >
                        <EditIcon clases={"size-7 cursor-pointer"} />
                      </button>
                    </td>
                    <td className="text-center text-red-800">
                      <button
                        onClick={(event) =>
                          eliminarProducto(event, producto.id)
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
const PageProduct = () => {
  return <PanelDivisor Page={<Page />} />;
};

export default PageProduct;
