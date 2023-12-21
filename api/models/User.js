const db = require("../config");
const S = require("sequelize");
const bcrypt = require("bcrypt");

class User extends S.Model {}

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
      //unique: true,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "user", timestamps: false }
);

User.beforeCreate((user) => {
  user.salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, user.salt);
});

module.exports = User;
