const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { User, Favorite } = require("../models");
const { generateToken } = require("../config/tokens");
const validateUser = require("../middlewares/auth");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

//ROUTES REGISTER & LOGIN USER

router.get("/users", (req, res, next) => {
  User.findAll({
    include: Favorite,
  })
    .then((users) => res.send(users))
    .catch((error) => next(error));
});

router.get("/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Realizamos una consulta para obtener los usuarios excluyendo al usuario actual y sus favoritos
    const users = await User.findAll({
      where: {
        id: {
          [Op.not]: userId,
        },
      },
      include: {
        model: Favorite,
        attributes: ["movieId", "userId", "id"],
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, lastname, name, password } = req.body;
    const user = await User.create({ email, lastname, name, password });
    res.status(201).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).send("Usuario o contraseña incorrecta");
    }
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).send("Password invalid");
    }

    const token = generateToken({
      email,
      name: user.name,
      lastname: user.lastname,
    });

    res.cookie("token", token);
    res.send({
      email,
      name: user.name,
      lastname: user.lastname,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/verify", validateUser, (req, res) => {
  User.findOne({
    where: { email: req.user.email },
  }).then((user) =>
    res.send({
      id: user.dataValues.id,
      name: user.dataValues.name,
      lastname: user.dataValues.lastname,
      email: user.dataValues.email,
    })
  );
});

router.post("/logout", (req, res) => {
  res.clearCookie("token"); // Eliminamos la cookie asociada al nombre "token".
  res.status(204).send();
});

//RECUPERO DE CONTRASEÑA
router.post("/password-reset", (req, res) => {
  const { email } = req.body;

  // Buscamos al usuario por su dirección de correo electrónico en la base de datos
  User.findOne({
    where: { email: email },
  })
    .then((user) => {
      if (!user) {
        // si el usuario no existe, respondemos con un error
        return res.status(404).json({ error: "Usuario no encontrado" });
      }

      // Generamos un token de recuperación de contraseña
      const token = jwt.sign({ userId: user.id }, "tu_secreto", {
        expiresIn: "1h",
      });

      // Enviamos el correo electrónico al usuario con el enlace de recuperación
      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "anproginformatica@gmail.com",
          pass: "nxtt daic dbib rfki",
        },
      });

      const mailOptions = {
        from: "anproginformatica@gmail.com",
        to: email,
        subject: "Recuperación de Contraseña",
        html: `Haz clic en el siguiente enlace para restablecer tu contraseña: <a href="http://localhost:3000/reset-password?token=${token}">Restablecer Contraseña</a>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          res
            .status(500)
            .json({ error: "Error al enviar el correo de recuperación" });
        } else {
          console.log("Correo de recuperación enviado: " + info.response);
          res.json({ message: "Correo de recuperación enviado con éxito" });
        }
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "Error al buscar al usuario" });
    });
});

// Ruta para completar el restablecimiento de contraseña
router.post("/complete-password-reset", async (req, res) => {
  console.log(req.body);
  const { token, newPassword } = req.body;

  try {
    // Verificamos y decodificamos el token
    const decoded = jwt.verify(token, "tu_secreto");

    // Buscamos al usuario por ID
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(403).json({ error: "Usuario no encontrado" });
    }

    // Hash de la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizamos la contraseña del usuario en la base de datos
    user.password = hashedPassword;
    await user.save();

    // Respondemos con un mensaje de éxito
    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la contraseña" });
  }
});

//FAVORITES

router.post("/favorites/:userId/:movieId", async (req, res, next) => {
  try {
    const { userId, movieId } = req.params;

    const userFav = await User.findOne({
      where: { id: userId },
    });

    if (!userId) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado." });
    }

    const favorite = await Favorite.create({
      movieId,
      userId: userFav.id,
    });

    return res
      .status(201)
      .json({ success: true, message: "Película agregada a favoritos." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error al agregar la película a favoritos.",
    });
  }
});

router.get("/favorites/:userId", (req, res, next) => {
  User.findOne({
    where: { id: req.params.userId },
    include: { model: Favorite },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
      res.status(200).json(user.favorites);
    })
    .catch((error) => {
      console.error("Error al obtener favoritos:", error);
      res.status(500).json({ error: "Error al obtener favoritos" });
    });
});

// Ruta para eliminar una película de la lista de favoritos de un usuario
router.delete("/favorites/:userId/:movieId", async (req, res, next) => {
  const id = req.params.userId;
  const movieId = req.params.movieId;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await Favorite.destroy({
      where: {
        userId: id,
        movieId: movieId,
      },
    });

    res.status(200).json({ message: "Película eliminada de favoritos" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

module.exports = router;
