import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post("http://localhost:5000/api/logout", { withCredentials: true })
      .then((response) => {
        Cookies.remove("token");
        onLogout();
        Swal.fire({
          icon: "success",
          html: "<p>good bye</p>",
          timer: 1000,
          showConfirmButton: false,
        });
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error durante el logout", error);
      });
  };
  return (
    <button
      className="btn btn-outline-secondary my-2 my-sm-0 mr-2"
      onClick={handleLogout}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
