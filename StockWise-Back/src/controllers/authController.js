const { authUsersService } = require("../services/authService");
const { CONTENT_TYPE, TYPE_JSON } = require("../config/const").constantes;

exports.authUsers = async (req, res) => {
  try {
    const {email, contra} = req.query
    if (!email || !contra){
      return res.status(400).json({meesage: "Falta el parametro mail"})
    }

    const result = await authUsersService(email, contra)

    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result[0])

    res.setHeader(CONTENT_TYPE, TYPE_JSON);
    res.status(200).send(await authUsersService());
  } catch (error) {
    res.status(404).send("Recurso no encontrado");
    throw Error("Error en CONTROLLER - getAllFrontendLanguajes - " + error);
  }
};