import React, { useState } from "react";

const EditProfile = () => {
  // Define estados para los campos del formulario
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // Función para manejar cambios en el nombre de usuario
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  // Función para manejar cambios en el correo electrónico
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Función para manejar cambios en la imagen de perfil
  const handleProfileImageChange = (event) => {
    // Aquí puedes manejar la lógica para actualizar la imagen de perfil
    const file = event.target.files[0];
    // Lógica para cargar la imagen al servidor o almacenarla en el estado local, etc.
  };

  // Función para enviar los datos actualizados al servidor
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes enviar los datos actualizados al servidor
  };

  return (
    <div>
      <h2>Mi Perfil</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre de usuario:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Correo electrónico:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Imagen de perfil:
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
          />
        </label>
        <br />
        <button type="submit">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditProfile;
