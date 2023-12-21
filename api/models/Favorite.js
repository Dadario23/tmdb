const db = require("../config");
const S = require("sequelize");

class Favorite extends S.Model {}

Favorite.init(
  {
    movieId: { type: S.INTEGER },
  },
  { sequelize: db, modelName: "favorite", timestamps: false }
);

module.exports = Favorite;
