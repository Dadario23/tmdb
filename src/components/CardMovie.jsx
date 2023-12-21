import React from "react";
import { Link } from "react-router-dom";
import AddToFavoritesButton from "./AddToFavoritesButton";

const CardMovie = ({ movie, user, isAuthenticated }) => {
  return (
    <div className="card" data-movie-id={movie.title}>
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        className="card-img-top"
        alt="movie poster"
      />
      <div className="card-body ">
        {isAuthenticated ? (
          <>
            <AddToFavoritesButton
              userId={user}
              movieId={movie.id}
            ></AddToFavoritesButton>
          </>
        ) : (
          <></>
        )}

        <h5 className="card-title mb-2">{movie.title}</h5>
        <p
          className="card-text "
          style={{ fontSize: "0.875rem", color: "gray" }}
        >
          {movie.overview.substring(0, 120)}...
        </p>
        <Link to={`/detail?movieID=${movie.id}`} className="btn btn-primary">
          See more ...
        </Link>
      </div>
    </div>
  );
};

export default CardMovie;
