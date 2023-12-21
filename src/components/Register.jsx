import axios from "axios";

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  //const [error, setError] = useState(null);

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.lastname ||
      !formData.email ||
      !formData.password
    ) {
      //setError("All fields are required");
      return false;
    }
    //setError(null);
    return true;
  };

  const handleInputChange = (e) => {
    const { name } = e.target;

    setFormData((prevState) => {
      return { ...prevState, [name]: e.target.value };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      axios
        .post(`http://localhost:5000/api/register`, formData)
        .then(() => {
          setFormData({
            name: "",
            lastname: "",
            email: "",
            password: "",
          });
          Swal.fire({
            icon: "success",
            html: "<p>Successful Registration</p>",
            timer: 3000,
            showConfirmButton: false,
          });
          navigate("/login");
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while registering the user.");
        });
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="row justify-content-center"
        style={{ marginTop: "120px" }}
      >
        <div className="col-md-4">
          <h2>Register</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="text"
                value={formData.name}
                name="name"
                className="form-control"
                placeholder="Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                value={formData.lastname}
                name="lastname"
                className="form-control"
                placeholder="Last Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <button
              onClick={onSubmit}
              className="btn btn-outline-secondary btn-block my-2 my-sm-0"
            >
              Register
            </button>
          </form>
          <br />
          <Link to="/login">
            <button className="btn btn-outline-secondary btn-block my-2 my-sm-0">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
