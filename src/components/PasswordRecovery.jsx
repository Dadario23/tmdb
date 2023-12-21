import React, { useState } from "react";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRecoverySubmit = async (event) => {
    event.preventDefault();

    try {
      // Realiza una solicitud al servidor para solicitar la recuperación de contraseña
      const response = await fetch("http://localhost:5000/api/password-reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setMessage(
          "An email has been sent with instructions on how to reset your password."
        );
      } else {
        setMessage(
          "Hubo un problema al procesar la solicitud. Verifica la dirección de correo electrónico."
        );
      }
    } catch (error) {
      setMessage(
        "There was a problem processing the request. Verify the email address."
      );
    }
  };

  function hacerPeticionAPI(url) {
    return axios
      .get(url)
      .then((respuesta) => {
        // Devolver la respuesta
        return respuesta.data;
      })
      .catch((error) => {
        // Manejar el error
        throw error;
      });
  }

  return (
    <div className="container" style={{ marginTop: "140px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Password Recovery</h1>
              <form onSubmit={handleRecoverySubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <div className="text-center mt-3">
                  <button type="submit" className="btn btn-primary">
                    Send Recovery Email
                  </button>
                </div>
              </form>
              {message && <p className="mt-3 text-center">{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordRecovery;
