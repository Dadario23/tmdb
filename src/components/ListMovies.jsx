import CardMovie from "./CardMovie.jsx";

const ListMovies = ({ movies, user, isAuthenticated, loading }) => {
  return (
    <div className="row mx-2" style={{ marginTop: "90px" }}>
      {loading ? (
        <p className="col-12 text-center">Cargando...</p>
      ) : movies !== null ? (
        movies.length > 0 ? (
          movies.map((movie) => (
            <div className="col-sm-4 col-md-3 col-lg-3 mb-4 " key={movie.id}>
              <CardMovie
                user={user}
                movie={movie}
                isAuthenticated={isAuthenticated}
              />
            </div>
          ))
        ) : (
          <p>No data</p>
        )
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default ListMovies;
