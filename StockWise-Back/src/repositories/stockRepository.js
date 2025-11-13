const { getConnectionSQL } = require("../database/connection");
const {
  getAllStock,
  getProductStockByIdSQL,
  updateProductStockSQL,
  createProductStockSQL,
  deleteProductStockByIdSQL,
} = require("../database/queries");
const sql = require("mssql");

const getAllStockRepository = async () => {
  const pool = await getConnectionSQL();

  try {
    const result = await pool.request().query(getAllStock);

    return result.recordset;
  } catch (error) {
    console.log("Error en REPOSITORY - getStockRepository - " + error);
    throw Error("Error en REPOSITORY - getStockRepository - " + error);
  } finally {
    pool.close();
  }
};

const createProductStockRepository = async (stockInfo) => {
  const { ID_PRODUCTO, CANTIDAD_DEPOSITO, CANTIDAD_SUCURSAL } = stockInfo;
  const pool = await getConnectionSQL();
  try {
    console.log(
      `REPOSITORY - createProductStockRepository producto:${stockInfo}`
    );

    await pool
      .request()
      .input("ID_PRODUCTO", sql.Int, ID_PRODUCTO)
      .input("CANTIDAD_DEPOSITO", sql.Int, CANTIDAD_DEPOSITO)
      .input("CANTIDAD_SUCURSAL", sql.Int, CANTIDAD_SUCURSAL)
      .query(createProductStockSQL);

    return stockInfo;
  } catch (error) {
    console.log(
      "Error en REPOSITORY - createProductStockRepository - " + error
    );
    throw Error(
      "Error en REPOSITORY - createProductStockRepository - " + error
    );
  } finally {
    pool.close();
  }
};

const updateProductStockRepository = async (id, productStock) => {
  const { ID_PRODUCTO, CANTIDAD_DEPOSITO, CANTIDAD_SUCURSAL } = productStock.body;

  const pool = await getConnectionSQL();
  try {
    console.log(
      `REPOSITORY - updateProductStockRepository id: ${id}  producto:${productStock}`
    );
    
    const foundProductStock = await pool
    .request()
    .input("idStock", sql.Int, id)
    .query(getProductStockByIdSQL);
    
    if (foundProductStock.recordset.length == 0) {
      console.log("Registro de stock de producto no encontrado");
    } else {
      console.log('stock prod:', ID_PRODUCTO, CANTIDAD_DEPOSITO, CANTIDAD_SUCURSAL)
      const updatedProductStock = await pool
        .request()
        .input("idStock", sql.Int, id)
        .input("idProducto", sql.Int, ID_PRODUCTO)
        .input("cantidadDeposito", sql.Int, CANTIDAD_DEPOSITO)
        .input("cantidadSucursal", sql.Int, CANTIDAD_SUCURSAL)
        .query(updateProductStockSQL);

      console.log(
        `Stock de producto Actualizado - ID_PRODUCTO: ${foundProductStock.recordset[0].ID_PRODUCTO}`
      );

      return updatedProductStock.rowsAffected[0];
    }
  } catch (error) {
    console.log(
      "Error en REPOSITORY - updateProductStockRepository - " + error
    );
    throw Error(
      "Error en REPOSITORY - updateProductStockRepository - " + error
    );
  } finally {
    pool.close();
  }
};

const deleteStockByIdRepository = async (id) => {
  const pool = await getConnectionSQL();
  try {
    const foundStock = await pool
      .request()
      .input("idStock", sql.Int, id)
      .query(getProductStockByIdSQL);

    if (foundStock.recordset.length === 0) {
      console.log("Registro de stock no encontrado");
      return;
    }
    const {CANTIDAD_DEPOSITO, CANTIDAD_SUCURSAL} = foundStock.recordset[0];
    if(CANTIDAD_DEPOSITO === 0 && CANTIDAD_SUCURSAL === 0){
      console.log(`El producto de id ${id} ya tiene el stock borrado.`)
      return;
    }

    console.log(`REPOSITORY - deleteStockByIdRepository id:${id}`);

    const deletedStock = await pool
      .request()
      .input("idStock", sql.Int, id)
      .query(deleteProductStockByIdSQL);

    console.log(
      `Stock de producto eliminado - ID: ${foundStock.recordset[0].ID}`
    );

    return deletedStock.rowsAffected[0] ? foundStock.recordset[0] : 0;
  } catch (error) {
    console.log("Error en REPOSITORY - deleteStockByIdRepository - " + error);
    throw Error("Error en REPOSITORY - deleteStockByIdRepository - " + error);
  } finally {
    pool.close();
  }
};

module.exports = {
  getAllStockRepository,
  createProductStockRepository,
  updateProductStockRepository,
  deleteStockByIdRepository,
};
