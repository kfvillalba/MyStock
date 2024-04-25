import React, { useState, useEffect } from "react";
import PanelDivisor from "../components/PanelDivisor";
import DeleteIcon from "../assets/DeleteIcon";
import EditIcon from "../assets/EditIcon";
import ModalRegisterCategoria from "../components/ModalRegisterCategoria";
import Swal from "sweetalert2";
import ModalEditCategoria from "../components/ModalEditCategoria";

const Page = () => {
  const [data, setData] = useState([]);
  const [buscarCategoria, setBuscarCategoria] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://localhost:7073/inventario-service/Categorias/Consultar")
      .then((responde) => responde.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      });
  }, [data]);

  const [formRegister, setformRegister] = useState(false);
  const [formEdit, setformEdit] = useState(false);

  const [dataCategoria, setDataCategoria] = useState({ id: "", nombre: "" });

  const eliminarCategoria = (event, id) => {
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
            `https://localhost:7073/inventario-service/Categorias/Eliminar?id=${id}`,
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
            title: "Error al borrar la categoría",
            text: error.message,
          });
        }
      }
    });
  };

  const editarCategoria = (event, id, nombre) => {
    event.preventDefault();
    setDataCategoria({ id, nombre });
    setformEdit(true);
  };

  const handleBuscarCategoria = (event) => {
    setBuscarCategoria(event.target.value);
  };

  return (
    <>
      <ModalRegisterCategoria
        open={formRegister}
        onClose={() => {
          setformRegister(false);
        }}
        registrar={(dataForm) => {
          setData([...data, dataForm]);
        }}
      />
      <ModalEditCategoria
        open={formEdit}
        dataCategoria={dataCategoria}
        onClose={() => {
          setformEdit(false);
        }}
        editar={(dataForm) => {
          console.log(dataForm);
          //con esta dataForm modifican
        }}
      />
      <div className="p-5 h-full flex flex-col shadow-md rounded-sm shadow-black ">
        <section className="flex flex-col ">
          <label className="label__form" htmlFor="textBuscarCategoria">
            Buscar Categoria
          </label>
          <input
            className="input__form"
            id="textBuscarCategoria"
            type="text"
            value={buscarCategoria}
            onChange={handleBuscarCategoria}
          />
        </section>

        <div className="container__table">
          <table className="w-full ">
            <thead className="[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white">
              <tr>
                <th className="text-start pl-3">Nombre</th>
                <th className="text-center w-28">Editar</th>
                <th className="text-center w-28">Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin">
                        <div className="w-8 h-8 border-2 border-blue-900 rounded-full"></div>
                      </div>
                      <span className="ml-2">Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                data
                  .filter((data) =>
                    data.nombre
                      .toLowerCase()
                      .includes(buscarCategoria.toLowerCase())
                  )
                  .map((categoria, index) => (
                    <tr className="even:bg-slate-100" key={index}>
                      <td className="pl-3">{categoria.nombre}</td>
                      <td className="text-center text-blue-800">
                        <button
                          onClick={(event) =>
                            editarCategoria(
                              event,
                              categoria.id,
                              categoria.nombre
                            )
                          }
                        >
                          <EditIcon clases={"size-7 cursor-pointer"} />
                        </button>
                      </td>
                      <td className="text-center text-red-800">
                        <button
                          onClick={(event) =>
                            eliminarCategoria(event, categoria.id)
                          }
                        >
                          <DeleteIcon clases={"size-7 cursor-pointer"} />
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        <section className="self-end mt-2">
          <button
            onClick={() => setformRegister(true)}
            className="bnt__primary"
          >
            Agregar Categoria
          </button>
        </section>
      </div>
    </>
  );
};
const PageCategorias = () => {
  return <PanelDivisor Page={<Page />} titulo={"Categorias"} />;
};

export default PageCategorias;
