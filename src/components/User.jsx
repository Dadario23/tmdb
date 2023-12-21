import profileImage from "../assets/usuarioPerfil.png";
const User = ({ name, lastname }) => {
  return (
    <div className="user-card">
      <img
        src={profileImage}
        alt={`${name} ${lastname}`}
        width={120}
        height={120}
      />
      <div className="user-details">
        <h2>
          {name} {lastname}
        </h2>
        {/* Agrega aquí otros campos comunes del usuario, como email, dirección, etc. */}
      </div>
    </div>
  );
};

export default User;
