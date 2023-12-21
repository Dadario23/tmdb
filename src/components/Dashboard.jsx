import User from "./User";
import UserSearch from "./UserSearch";

const Dashboard = ({ user, isAuthenticated, users }) => {
  return (
    <div className="container">
      <div>
        {isAuthenticated && user ? (
          <div style={{ marginTop: "100px" }}>
            <User name={user.name} lastname={user.lastname} />
          </div>
        ) : (
          <p>cargando usuario...</p>
        )}
      </div>

      <div>
        <UserSearch users={users} user={user} />
      </div>
    </div>
  );
};

export default Dashboard;
