module.exports = {
  getAllProductSQL: "SELECT * FROM Productos",
  getProductByIdSQL: `SELECT * FROM Productos WHERE ID = @ID`,
};
