const { getConnectionSQL } = require("../database/connection");
const { createSaleSQL } = require("../database/queries");

exports.createSaleRepository = async (saleItem) => {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request()
      .input('idUsuario', saleItem.idUsuario)
      .input('idProducto', saleItem.idProducto)
      .input('cantidad', saleItem.cantidad)
      .input('precioUnitario', saleItem.precioUnitario)
      .input('total', saleItem.total)
      .input('fecha', saleItem.fecha)
      .query(createSaleSQL);

    return { success: true, message: 'Venta creada exitosamente' };
  } catch (error) {
    console.log("Error en REPOSITORY - createSaleRepository - " + error);
    throw Error("Error en REPOSITORY - createSaleRepository - " + error);
  }
};
