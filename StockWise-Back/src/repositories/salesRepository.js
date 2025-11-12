const { getConnectionSQL } = require("../database/connection");
const { 
  createSaleSQL, 
  getAllSalesSQL, 
  getTodaySalesSQL, 
  getLastSaleNumberSQL,
  getProductStockSQL,
  decreaseStockSQL 
} = require("../database/queries");
const sql = require("mssql");

// Obtiene el próximo número de venta verificando que haya caja abierta
exports.getNextSaleNumber = async function() {
  const pool = await getConnectionSQL();
  try {
    const openCashQuery = `
      SELECT TOP 1 * 
      FROM CIERRE_CAJA 
      WHERE FECHA_CIERRE IS NULL 
      ORDER BY FECHA_APERTURA DESC
    `;
    
    const cashResult = await pool.request().query(openCashQuery);
    
    if (cashResult.recordset.length === 0) {
      throw new Error("No hay caja abierta. Debe abrir una caja antes de realizar ventas.");
    }
    
    const result = await pool.request().query(getLastSaleNumberSQL);
    
    if (result.recordset.length === 0) {
      return "1";
    }
    
    const lastNumber = result.recordset[0].NUMERO_VENTA;
    if (!lastNumber) {
      return "1";
    }
    
    const numPart = parseInt(lastNumber);
    if (isNaN(numPart)) {
      return "1";
    }
    
    const nextNum = numPart + 1;
    return nextNum.toString();
    
  } catch (error) {
    console.log("Error en REPOSITORY - getNextSaleNumber - " + error);
    throw Error("Error en REPOSITORY - getNextSaleNumber - " + error);
  } finally {
    pool.close();
  }
};

// Crea un registro de venta en la base de datos
exports.createSaleRepository = async function(saleItem) {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request()
      .input('idUsuario', sql.Int, saleItem.idUsuario)
      .input('idProducto', sql.Int, saleItem.idProducto)
      .input('cantidad', sql.Int, saleItem.cantidad)
      .input('precioUnitario', sql.Decimal(10, 2), saleItem.precioUnitario)
      .input('total', sql.Decimal(10, 2), saleItem.total)
      .input('fecha', sql.DateTime, saleItem.fecha)
      .input('numeroVenta', sql.NVarChar(50), saleItem.numeroVenta)
      .query(createSaleSQL);

    return { success: true, message: 'Venta creada exitosamente' };
  } catch (error) {
    console.log("Error en REPOSITORY - createSaleRepository - " + error);
    throw Error("Error en REPOSITORY - createSaleRepository - " + error);
  } finally {
    pool.close();
  }
};

exports.getAllSalesRepository = async function() {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request().query(getAllSalesSQL);
    return result.recordset;
  } catch (error) {
    console.log("Error en REPOSITORY - getAllSalesRepository - " + error);
    throw Error("Error en REPOSITORY - getAllSalesRepository - " + error);
  } finally {
    pool.close();
  }
};

// Obtiene las ventas de la caja abierta actual
exports.getTodaySalesRepository = async function() {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request().query(getTodaySalesSQL);
    return result.recordset;
  } catch (error) {
    console.log("Error en REPOSITORY - getTodaySalesRepository - " + error);
    throw Error("Error en REPOSITORY - getTodaySalesRepository - " + error);
  } finally {
    pool.close();
  }
};

// Obtiene el stock disponible de un producto
exports.checkProductStockRepository = async function(idProducto) {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request()
      .input('idProducto', sql.Int, idProducto)
      .query(getProductStockSQL);
    
    if (result.recordset.length === 0) {
      return { CANTIDAD_SUCURSAL: 0, CANTIDAD_DEPOSITO: 0 };
    }
    
    return result.recordset[0];
  } catch (error) {
    console.log("Error en REPOSITORY - checkProductStockRepository - " + error);
    throw Error("Error en REPOSITORY - checkProductStockRepository - " + error);
  } finally {
    pool.close();
  }
};

// Descuenta el stock de sucursal cuando se realiza una venta
exports.decreaseProductStockRepository = async function(idProducto, cantidad) {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request()
      .input('idProducto', sql.Int, idProducto)
      .input('cantidad', sql.Int, cantidad)
      .query(decreaseStockSQL);
    
    return { success: true, rowsAffected: result.rowsAffected[0] };
  } catch (error) {
    console.log("Error en REPOSITORY - decreaseProductStockRepository - " + error);
    throw Error("Error en REPOSITORY - decreaseProductStockRepository - " + error);
  } finally {
    pool.close();
  }
};
