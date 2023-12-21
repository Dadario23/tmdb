import axios from "axios";
import React, { useEffect, useState } from "react";
import CardMovie from "./CardMovie";

const Favorites = ({ user, movies, isAuthenticated }) => {
  const [favorites, setFavorite] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5000/api/favorites/${user.id}`)
        .then((response) => setFavorite(response.data));
    }
  }, []);

  const moviesFav = movies.filter((movie) => {
    return favorites.some((userMovie) => userMovie.movieId === movie.id);
  });

  return (
    <div>
      <div className="ml-4" style={{ marginTop: "100px" }}>
        <h3>Your favorite movies:</h3>
      </div>
      <div className="row mx-2 mt-3">
        {movies && moviesFav.length !== 0 ? (
          moviesFav.map((movie) => (
            <div className="col-sm-4 col-md-3 col-lg-3  " key={movie.id}>
              <CardMovie
                user={user}
                movie={movie}
                isAuthenticated={isAuthenticated}
              />
            </div>
          ))
        ) : (
          <p> Add Movies to Favorites...</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
