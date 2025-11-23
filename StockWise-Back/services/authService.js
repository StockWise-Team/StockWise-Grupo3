const { authUserRepository } = require("../repositories/authRepository");


exports.authUsersService = async (email, contra) => {
  try {
    return await authUserRepository(email, contra);
  } catch (error) {
    res.status(404).send("Recurso no encontrado");
    throw Error("Error en Service - getAllProductsService - " + error);
  }
};