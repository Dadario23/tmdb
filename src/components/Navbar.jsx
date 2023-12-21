import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import home from "../assets/home-alt.svg";
import user from "../assets/user.svg";
import heart from "../assets/heart.svg";
import Search from "./Search";

const Navbar = ({
  selectedYear,
  handleChangeYear,
  onLogout,
  isAuthenticated,
  handleSubmitPerYear,
}) => {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <Link className="navbar-brand" to="/">
        PELISPLUS
      </Link>
      <button
        className=" btn pb-3 navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              <img src={home} alt="" />
              <span className="ml-2">Home</span>
            </Link>
          </li>
          {isAuthenticated ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <img src={user} alt="" />
                  <span className="ml-2">Dashboard</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">
                  <img src={heart} alt="" />
                  <span className="ml-2">Favoritos</span>
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>

        {!isAuthenticated ? (
          <>
            <Link to="/login">
              <button
                className="btn btn-outline-primary my-2 my-sm-0 mr-2"
                type="submit"
              >
                Login
              </button>
            </Link>
            <Link to="/register">
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="btn"
              >
                Register
              </button>
            </Link>
          </>
        ) : (
          <>
            <Search
              selectedYear={selectedYear}
              handleChangeYear={handleChangeYear}
              handleSubmitPerYear={handleSubmitPerYear}
            />
            <LogoutButton onLogout={onLogout}>
              <Link to="/logout" />
            </LogoutButton>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

/* 

*/
