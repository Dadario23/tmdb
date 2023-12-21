import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const DetailMovies = () => {
  const query = new URL(window.location.href);
  const movieID = query.searchParams.get("movieID");
  const [movie, setMovie] = useState(null);

  const apiUrl = `${process.env.REACT_APP_URL_MOVIE_ID}${movieID}?api_key=${process.env.REACT_APP_API_KEY}`;

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        const movieData = response.data;
        setMovie(movieData);
      })
      .catch((error) =>
        Swal.fire({
          icon: "warning",
          title: error?.message || "Oops...",
          html: "<h2>Hubo errores, intenta más tarde</h2>",
        })
      );
  }, [movieID, apiUrl]);

  return (
    <>
      {!movie && <p>Cargando...</p>}
      {movie && (
        <>
          <div className="ml-4" style={{ marginTop: "100px" }}>
            <h2>{movie.title}</h2>
          </div>
          <div className="row mx-2">
            <div className="col-sm-4 ">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                className="img-fluid"
                alt="movie poster"
              />
            </div>
            <div className="col-8">
              <h5>Fecha de estreno: {movie.release_date}</h5>
              <h5>Reseña:</h5>
              <p>{movie.overview}</p>
              <h5>Rating: {movie.vote_average}</h5>
              <h5>Géneros:</h5>
              <ul>
                {movie.genres.map((oneGenre) => (
                  <li key={oneGenre.id}>{oneGenre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DetailMovies;
