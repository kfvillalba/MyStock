import React, { useState } from "react";

const EditProfile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");

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
