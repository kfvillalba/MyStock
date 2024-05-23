const API_INVENTARIO = "https://localhost:7073/inventario-service";

const fetchFromAPI = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_INVENTARIO}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error(`Fetch error: ${error.message}`);
  }
};

const deleteFromAPI = async (endpoint, id) => {
  try {
    const response = await fetch(`${API_INVENTARIO}${endpoint}?id=${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    throw new Error(`Delete error: ${error.message}`);
  }
};

export const fetchCategories = async () => {
  return await fetchFromAPI("/Categorias/Consultar");
};

export const deleteCategory = async (id) => {
  return await deleteFromAPI("/Categorias/Eliminar", id);
};

export const fetchClients = async () => {
  return await fetchFromAPI("/Clientes/Consultar");
};

export const deleteClient = async (id) => {
  return await deleteFromAPI("/Clientes/Eliminar", id);
};

export const fetchProducts = async () => {
  return await fetchFromAPI("/Productos/Consultar");
};

export const deleteProduct = async (id) => {
  return await deleteFromAPI("/Productos/Eliminar", id);
};

export const fetchProviders = async () => {
  return await fetchFromAPI("/Proveedors/Consultar");
};

export const deleteProvider = async (id) => {
  return await deleteFromAPI("/Proveedors/Eliminar", id);
};

export const fetchExistencias = async () => {
  return await fetchFromAPI("/Entradas/Consultar");
};

export const deleteExistencia = async (id) => {
  return await deleteFromAPI("/Entradas/Eliminar", id);
};

export const fetchSalidas = async () => {
  return await fetchFromAPI("/Salidas/ConsultarTodo");
};

export default fetchClients;
