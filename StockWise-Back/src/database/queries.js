module.exports = {

  getAllProductSQL: "SELECT NOMBRE, DESCRIPCION, CATEGORIA, PRECIO, ACTIVO FROM PRODUCTOS",
  createSaleSQL: `
    INSERT INTO VENTAS (ID_USUARIO, ID_PRODUCTO, CANTIDAD, PRECIO_UNITARIO, TOTAL, FECHA)
    VALUES (@idUsuario, @idProducto, @cantidad, @precioUnitario, @total, @fecha)
  `,

};
