module.exports = {
  getAllProductSQL: "SELECT * FROM Productos",
  getProductByIdSQL: `SELECT * FROM Productos WHERE ID = @ID`,
  deleteProductSQL: `UPDATE Productos SET ACTIVO = 0 WHERE ID = @ID`,
};
