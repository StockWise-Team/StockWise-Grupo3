const { createSaleRepository } = require("../repositories/salesRepository");

exports.createSaleService = async (saleData) => {
  try {
    // Validar datos requeridos
    if (!saleData.idUsuario || !saleData.items || !Array.isArray(saleData.items) || saleData.items.length === 0) {
      throw new Error("Datos de venta inválidos");
    }

    // Insertar cada item de la venta (la tabla VENTAS guarda 1 fila por producto)
    const fecha = new Date();
    const results = [];

    for (const item of saleData.items) {
      const saleItem = {
        idUsuario: saleData.idUsuario,
        idProducto: item.idProducto,
        cantidad: item.cantidad,
        precioUnitario: item.precioUnitario,
        total: item.cantidad * item.precioUnitario,
        fecha: fecha
      };
      
      const result = await createSaleRepository(saleItem);
      results.push(result);
    }

    return { success: true, message: 'Venta registrada exitosamente', results };
  } catch (error) {
    throw Error("Error en Service - createSaleService - " + error);
  }
};
