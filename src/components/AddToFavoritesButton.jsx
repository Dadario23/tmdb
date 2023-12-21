import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AddToFavoritesButton = ({ userId, movieId }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const handleFavorite = () => {
    !isFavorite
      ? axios
          .post(`http://localhost:5000/api/favorites/${userId.id}/${movieId}`)
          .then((response) => {
            if (response.data.success) {
              Swal.fire({
                icon: "success",
                html: "<p>Added to Favorites</p>",
                timer: 1500,
                showConfirmButton: false,
              });
              setIsFavorite(true);
            } else {
              Swal.fire({
                icon: "error",
                html: "<p>Error al agregar la película a favoritos.</p>",
                timer: 1500,
                showConfirmButton: false,
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            alert("Hubo un error al agregar la película a favoritos.");
          })
      : axios
          .delete(`http://localhost:5000/api/favorites/${userId}/${movieId}`)
          .then(() => {
            Swal.fire({
              icon: "success",
              html: "<p>Delete to Favorites</p>",
              timer: 1500,
              showConfirmButton: false,
            });
            setIsFavorite(false);
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              html: "<p>Error al agregar la película a favoritos.</p>",
              timer: 1500,
              showConfirmButton: false,
            });
          });
  };

  return (
    <button className="btn btn-primary favourite-btn " onClick={handleFavorite}>
      🖤
    </button>
  );
};

export default AddToFavoritesButton;
