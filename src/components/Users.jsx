import axios from "axios";
import React, { useEffect, useState } from "react";

import UserFavorite from "./UserFavorite";

const Users = ({ user }) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${user ? user.id : null}`)
      .then((response) => response.data)
      .then((users) => setUsers(users))
      .catch((error) => console.log(error));
  }, []);

  //console.log(users);

  return (
    <div style={{ marginTop: "70px" }}>
      <div>
        <h1>Usuarios y Favoritos</h1>
        <ul>
          {users !== null ? (
            users.map((user) => (
              <li key={user.id}>
                <h2>
                  {user.name} {user.lastname}
                </h2>
                <h3>Favoritos:</h3>
                <ul>
                  {user.favorites.map((favorite) => (
                    <>
                      {/* <li key={favorite.id}>Movie ID: {favorite.movieId}</li> */}

                      <UserFavorite userId={user.id} fav={favorite} />
                    </>
                  ))}
                </ul>
              </li>
            ))
          ) : (
            <p>no hay usuarios registrados</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Users;
