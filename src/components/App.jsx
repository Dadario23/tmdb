import React, { useEffect, useState } from "react";
import Header from "./Header";
import Register from "./Register";
import Login from "./Login";
import { Route, Routes, useNavigate } from "react-router";
import axios from "axios";
import Dashoboard from "./Dashboard.jsx";
import Favorites from "./Favorites";
import ResultsSearch from "./ResultsSearch";
import DetailMovies from "./DetailMovies";
import ListMovies from "./ListMovies";
import useAxios from "../hooks/useAxios.js";
import Users from "./Users.jsx";
import PasswordRecovery from "./PasswordRecovery.jsx";
import PasswordResetForm from "./PasswordResetForm.jsx";
import MoviesFiltered from "./MoviesFiltered.jsx";

const App = () => {
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesFiltered, setMoviesFiltered] = useState([]);
  const [selectedYear, setSelectedYear] = useState("0");
  const navigate = useNavigate();

  const handleChangeYear = (e) => {
    setSelectedYear(e.target.value);
  };
  const handleSubmitPerYear = async (e) => {
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

  const apiUrl = `${process.env.REACT_APP_API_URL}page=1}`;
  const { data, loading } = useAxios(apiUrl);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users`)
      .then((response) => response.data)
      .then((users) => setUsers(users))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (!loading && data !== null) {
      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
      }
    }
  }, [data, loading]);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/verify", { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(true);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isAuthenticated]);

  return (
    <>
      <Header
        handleChangeYear={handleChangeYear}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        selectedYear={selectedYear}
        handleSubmitPerYear={handleSubmitPerYear}
      />

      <Routes>
        <Route
          path="/"
          element={
            <ListMovies
              movies={movies}
              user={user}
              isAuthenticated={isAuthenticated}
              loading={loading}
            />
          }
        />
        <Route path="/Register" element={<Register />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={
            <Dashoboard
              user={user}
              isAuthenticated={isAuthenticated}
              users={users}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              user={user}
              movies={movies}
              isAuthenticated={isAuthenticated}
            />
          }
        />
        <Route path="/result" element={<ResultsSearch />} />
        <Route
          path="/movies-filtered"
          element={<MoviesFiltered moviesFiltered={moviesFiltered} />}
        />
        <Route path="/detail" element={<DetailMovies />} />
        <Route path="/users" element={<Users user={user} />} />
        <Route path="/password-reset" element={<PasswordRecovery />} />
        <Route path="/reset-password" element={<PasswordResetForm />} />
      </Routes>
    </>
  );
};

export default App;
