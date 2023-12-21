import React, { useState } from "react";
import Select from "react-select";

const UserSearch = ({ users, user }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers =
    users !== null ? users.filter((us) => us.id !== user.id) : [];

  const userOptions =
    filteredUsers !== null
      ? filteredUsers.map((user) => ({
          label: `${user.name} ${user.lastname}`,
          value: user.id,
        }))
      : [];

  const handleUserChange = (selectedOption) => {
    setSelectedUser(selectedOption);
  };
  const userSelected =
    users !== null && selectedUser !== null
      ? users.find((user) => user.id === selectedUser.value)
      : [];

  return (
    <div className="col-md-6">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title">Search User</h1>
          <Select
            className="form-control w-50"
            value={selectedUser}
            onChange={handleUserChange}
            options={userOptions}
            isSearchable
            placeholder="Select a user"
          />
          {userSelected !== null && selectedUser ? (
            <div>
              <h2>{`${userSelected.name} ${userSelected.lastname}`}</h2>
              <p>Email: {userSelected.email}</p>

              {userSelected.favorites && userSelected.favorites.length > 0 && (
                <div>
                  <h3>Favoritos:</h3>
                  <ul>
                    {userSelected.favorites.map((favorite) => (
                      <li key={favorite.id}>Movie ID: {favorite.movieId}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
