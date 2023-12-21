import { useNavigate } from "react-router";

import Swal from "sweetalert2";
import years from "../utils/years";

const Search = ({ handleChangeYear, selectedYear, handleSubmitPerYear }) => {
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();

    if (keyword.length === 0) {
      Swal.fire({
        icon: "info",
        html: "<h5>Tienes que escribir una película</h5>",
      });
    } else if (keyword.length < 3) {
      Swal.fire({
        icon: "info",
        html: "<h5> Search with at least 3 characters</h5>",
      });
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/result?keyword=${keyword}`);
    }
  };

  /* const handleSubmitPerYear = async (e) => {
    e.preventDefault();

    try {
      if (selectedYear !== "0") {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&primary_release_year=${selectedYear}`;

        const response = await axios.get(url);
        setMoviesFiltered(response.data.results);
        navigate(`/movies-filtered`);
      } else {
        // Lógica para obtener todas las películas si se selecciona "All Movies"
      }
    } catch (error) {
      console.error("Error al obtener películas:", error);
    }
  };
 */
  //console.log("PELICULAS FILTRADAS", moviesFiltered);
  return (
    <>
      <form onSubmit={submitHandler} className="d-flex align-items-center">
        <label className="form-label mb-0 mx-2">
          <input
            className="form-control"
            type="text"
            name="keyword"
            placeholder="Search movie..."
          />
        </label>

        <button
          className="btn btn-outline-primary my-2 my-sm-0 mr-2"
          type="submit"
        >
          Search
        </button>
      </form>
      <form onSubmit={handleSubmitPerYear}>
        <div className="input-group">
          <div className="input-group-append">
            <select
              className="custom-select mr-2"
              value={selectedYear}
              onChange={handleChangeYear}
              name="year"
            >
              <option value="0">Years</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <button className="btn btn-outline-primary mr-2" type="submit">
              Filter
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Search;
