const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const jwt = require("../utils/jwt.js");

function register(req, res) {
  const { nombre, cedula, correo, password, usuario } = req.body;

  if (!nombre || !cedula || !correo || !password || !usuario){
    res.status(400).send({ msg: "Todos los campos son obligatorios" });
  }

  const user = new User({
    nombre,
    cedula,
    correo: correo ? correo.toLowerCase() : "",
    usuario,
    role: "user",
    active: false, // Podría inicializarse como activo una vez se realice la activación del usuario.
  });

  // Genera el hash de la contraseña
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  user.password = hashPassword;

  user.save((error, userStorage) => {
    if (error) {
      console.error("Error al guardar el usuario:", error);
    return res.status(400).send({ msg: " Error al crear un usuario " });
    } else {
    res.status(200).send(userStorage)
    }
  })
}

// Inicio de sesión

function login(req, res) {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).send({ msg: "El email es obligatorio" });
  }

  const usuarioLowerCase = usuario.toLowerCase();

  User.findOne({ usuario: usuarioLowerCase }, (error, userStore) => {
    if (error) {
      return res.status(500).send({ msg: "Error del servidor" });
    }

    if (!userStore) {
      return res.status(400).send({ msg: "Usuario o contraseña incorrecta" });
    }

    bcrypt.compare(password, userStore.password, (bcryptError, check) => {
      if (bcryptError) {
        return res.status(500).send({ msg: "Error del servidor" });
      }

      if (!check) {
        return res.status(400).send({ msg: "Usuario o contraseña incorrecta" });
      }

      if (!userStore.active) {
        return res.status(401).send({ msg: "Usuario no autorizado o no activo" });
      }

      // Usuario válido y activo
      return res.status(200).send({
        access: jwt.createAccessToken(userStore),
        refresh: jwt.createRefreshToken(userStore),
      });
    });
  });
}


// Renovación de token de acceso

function refreshAccessToken(req, res) {
  const { token } = req.body;

  if (!token) res.status(400).send({ msg: "Error token Requerido" });

  const { user_id } = jwt.decode(token);

  User.findOne({ _id: user_id }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      res.status(200).send({
        accessToken: jwt.createAccessToken(userStorage),
      });
    }
  });
}

module.exports = {
  register,
  login,
  refreshAccessToken,
};
