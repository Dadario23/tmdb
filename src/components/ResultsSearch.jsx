import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const ResultsSearch = () => {
  const [moviesResults, setMoviesResults] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword");

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_API_URL_SEARCH}${keyword}&api_key=${process.env.REACT_APP_API_KEY}`;

    axios
      .get(endpoint)
      .then((response) => {
        const moviesArray = response.data.results;
        if (moviesArray.length === 0) {
          Swal.fire({
            icon: "warning",
            html: "<h4>Tu búsqueda no arrojó resultados</h4>",
          });
        }
        setMoviesResults(moviesArray);
      })
      .catch(() =>
        Swal.fire({
          icon: "warning",
          html: "<h2>Hubo errores, intenta más tarde</h2>",
        })
      );
  }, [keyword]);
  return (
    <div className="container">
      <div>
        <h2>
          Result: <em>{keyword}</em>
        </h2>
      </div>

      {moviesResults.length === 0 && <h3>No results</h3>}
      <div className="row">
        {moviesResults.map((oneMovie, idx) => {
          return (
            <div className="col-sm-5 col-md-4 col-lg-3" key={idx}>
              <div className="card my-4">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                  className="card-img-top"
                  alt="movie poster"
                />
                <div className="card-body">
                  <h5 className="card-title">{oneMovie.title}</h5>
                  <p className="card-text">
                    {oneMovie.overview.substring(0, 120)}...
                  </p>
                  <Link
                    to={`/detail?movieID=${oneMovie.id}`}
                    className="btn btn-primary"
                  >
                    See more ...
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsSearch;
