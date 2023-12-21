import React from "react";
import { Link } from "react-router-dom";

const MoviesFiltered = ({ moviesFiltered }) => {
  return (
    <div className="container">
      <div>
        <h2>Results:</h2>
      </div>

      {moviesFiltered.length === 0 && <h3>No results</h3>}
      <div className="row">
        {moviesFiltered.map((oneMovie, idx) => {
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

export default MoviesFiltered;
