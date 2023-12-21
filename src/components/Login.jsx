import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("Successful POST Application:", response.data);
      Swal.fire({
        icon: "success",
        html: "<p>WELCOME TO PELISPLUS</p>",
        timer: 3000,
        showConfirmButton: false,
      });
      navigate("/");
      onLogin();
    } catch (error) {
      console.error("Error sending POST request:", error);
      Swal.fire({
        icon: "error",
        html: "<h2>An error occurred while login the user.</h2>",
        timer: 1000,
      });
    }
  };

  return (
    <div className="container mt-5 ">
      <div
        className="row justify-content-center"
        style={{ marginTop: "120px" }}
      >
        <div className="col-md-4">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                className="form-control"
                placeholder="Email"
                onChange={handleEmailChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                value={password}
                className="form-control"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
            </div>
            <button
              className="btn btn-outline-secondary btn-block my-2 my-sm-0"
              type="submit"
            >
              Login
            </button>
          </form>
          <br />
          <Link to="/password-reset" className="link">
            Forgot your password?
          </Link>
          <br />
          <Link to="/register ">
            <button className="btn btn-outline-secondary btn-block my-2 my-sm-0">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
