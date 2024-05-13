const API_INVENTARIO = 'https://localhost:7073/inventario-service'

// -------------------------------------------------------------------------------
export const fetchCategories = async () => {
  const response = await fetch(`${API_INVENTARIO}/Categorias/Consultar`)

  return await response.json()
}

export const deleteCategory = async (id) => {
  try {
    const response = await fetch(
      `${API_INVENTARIO}/Categorias/Eliminar?id=${id}`,
      {
        method: 'DELETE',
      }
    )

    if (response.ok) {
      return true
    } else {
      throw new Error('Error al intentar borrar la categoría')
    }
  } catch (error) {
    throw error
  }
}
// -----------------------------------------------------------------------------

export const fetchClients = async () => {
  const response = await fetch(`${API_INVENTARIO}/Clientes/Consultar`)
  return await response.json()
}

export const deleteClient = async (id) => {
  try {
    const response = await fetch(
      `${API_INVENTARIO}/Clientes/Eliminar?id=${id}`,
      {
        method: 'DELETE',
      }
    )

    if (response.ok) {
      return true
    } else {
      throw new Error('Error al intentar borrar el cliente')
    }
  } catch (error) {
    throw error
  }
}

// -----------------------------------------------------------------------------
export const fetchProducts = async () => {
  const response = await fetch(`${API_INVENTARIO}/Productos/Consultar`)
  return await response.json()
}

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(
      `${API_INVENTARIO}/Productos/Eliminar?id=${id}`,
      {
        method: 'DELETE',
      }
    )

    if (response.ok) {
      return true
    } else {
      throw new Error('Error al intentar borrar el producto')
    }
  } catch (error) {
    throw error
  }
}

// -------------------------------------------------------------------------------

export const fetchProviders = async () => {
  try {
    const response = await fetch(`${API_INVENTARIO}/Proveedors/Consultar`)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Error al consultar los proveedores')
    }
  } catch (error) {
    throw error
  }
}

export const deleteProvider = async (id) => {
  try {
    const response = await fetch(
      `${API_INVENTARIO}/Proveedors/Eliminar?id=${id}`,
      {
        method: 'DELETE',
      }
    )

    if (response.ok) {
      return true
    } else {
      throw new Error('Error al intentar borrar el proveedor')
    }
  } catch (error) {
    throw error
  }
}

// ---------------------------------------------------------------------------------

export const fetchExistencias = async () => {
  try {
    const response = await fetch(`${API_INVENTARIO}/Entradas/Consultar`)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Error al obtener las existencias')
    }
  } catch (error) {
    throw error
  }
}

export const deleteExistencia = async (idExistencia) => {
  try {
    const response = await fetch(
      `${API_INVENTARIO}/Entradas/Eliminar?id=${idExistencia}`,
      {
        method: 'DELETE',
      }
    )

    if (response.ok) {
      return true
    } else {
      throw new Error('Error al eliminar la existencia')
    }
  } catch (error) {
    throw error
  }
}

// ----------------------------------------------------------------------------

export const fetchSalidas = async () => {
  try {
    const response = await fetch(`${API_INVENTARIO}/Salidas/ConsultarTodo`)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Error al obtener las salidas')
    }
  } catch (error) {
    throw error
  }
}

export default deleteProduct
