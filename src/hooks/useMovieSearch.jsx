import { useEffect, useState } from "react";
import axios from "axios";

const useMovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  const queryParameters = new URLSearchParams(window.location.search);
  const keyword = queryParameters.get("keyword");
  const apiUrl = `${process.env.REACT_APP_API_URL_SEARCH}&query=${keyword}`;
  useEffect(() => {
    if (keyword) {
      setQuery(keyword);

      // Realizar la solicitud a la API de TMDb
      axios
        .get(`${apiUrl}${keyword}`)
        .then((response) => {
          const moviesArray = response.data.results;
          setMovies(moviesArray);
        })
        .catch((error) => {
          console.error("Error al buscar películas:", error);
          setMovies([]);
        });
    } else {
      setQuery("");
      setMovies([]);
    }
  }, [queryParameters]);

  return { movies, query };
};

export default useMovieSearch;
