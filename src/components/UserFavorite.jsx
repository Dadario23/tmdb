import axios from "axios";
import React, { useEffect, useState } from "react";

const UserFavorite = ({ userId, fav }) => {
  const [favorite, setFavorite] = useState([]);
  //console.log(fav);
  const { movieId } = fav;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/favorites/${userId}/${movieId}`)
      .then((response) => response.data)
      .then((fav) => setFavorite(fav))
      .catch((error) => console.log(error));
  }, []);

  console.log(favorite);

  return <div>UserFavorite</div>;
};

export default UserFavorite;
