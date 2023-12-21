import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const PasswordResetForm = (props) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handlePasswordResetSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Enviar la nueva contraseña al servidor
      const response = await axios.post(
        "http://localhost:5000/api/complete-password-reset",
        {
          newPassword: password,
          token,
        }
      );
      if (!response.data.success) {
        Swal.fire({
          icon: "success",
          html: "<p>Password successfully reset</p>",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/login");
      }
    } catch (error) {
      setMessage("Hubo un error al procesar la solicitud");
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Reset Password</h1>
              <form onSubmit={handlePasswordResetSubmit}>
                <div className="form-group">
                  <label htmlFor="password">New Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">
                    Reset Password
                  </button>
                </div>
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
