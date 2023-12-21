import Navbar from "./Navbar";

const Header = ({
  selectedYear,
  handleChangeYear,
  onLogout,
  isAuthenticated,
  handleSubmitPerYear,
}) => {
  return (
    <div style={{ marginTop: "75px" }}>
      <Navbar
        handleChangeYear={handleChangeYear}
        onLogout={onLogout}
        isAuthenticated={isAuthenticated}
        selectedYear={selectedYear}
        handleSubmitPerYear={handleSubmitPerYear}
      />
    </div>
  );
};

export default Header;
