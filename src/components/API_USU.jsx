const API_USUARIO = 'https://localhost:7073/autenticacion-service/Usuarios'

export const loginWithEmailPassword = async (email, password) => {
  try {
    const response = await fetch(
      `${API_USUARIO}/Autenticacion?email=${email}&password=${password}`
    )
    if (!response.ok) {
      throw new Error('Usuario o contraseña incorrectos')
    }
    return response.json()
  } catch (error) {
    throw error
  }
}

export const sendEmail = async (email) => {
  try {
    const response = await fetch('https://localhost:7062/EnviarEmail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: email,
        subject: 'Iniciaste sesión en la aplicación MyStock',
        body: 'Si no fuiste tu, cambia de inmediato tu clave.',
        attachments: ['dfgdfg'],
      }),
    })
    if (!response.ok) {
      throw new Error('Error al enviar el correo electrónico')
    }
    return true
  } catch (error) {
    throw error
  }
}
