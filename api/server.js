const express = require("express");
const app = express();
const routes = require("./routes/index");
const db = require("./config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const PORT = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));

app.use("/api", routes);

// autenticamos la conexión a la base de datos
db.authenticate()
  .then(() => {
    console.log("Conexión a la base de datos exitosa");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos:", error);
  });

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("Escuchando en el puerto ", PORT);
  });
});
