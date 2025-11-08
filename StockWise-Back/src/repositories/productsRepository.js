const { getConnectionSQL } = require("../database/connection");
const {
  getAllProductSQL,
  getProductByIdSQL,
  deleteProductSQL,
  createProductSQL,
} = require("../database/queries");
const sql = require("mssql");

exports.getAllProductsRepository = async () => {
  const pool = await getConnectionSQL();
  try {
    const result = await pool.request().query(getAllProductSQL);

    return JSON.stringify(result.recordset);
  } catch (error) {
    console.log("Error en REPOSITORY - getAllProductsRepository - " + error);
    throw Error("Error en REPOSITORY - getAllProductsRepository - " + error);
  } finally {
    pool.close();
  }
};

exports.getProductByIdRepository = async (id) => {
  const pool = await getConnectionSQL();
  try {
    const productoEncontrado = await pool
      .request()
      .input("id", sql.Int, id)
      .query(getProductByIdSQL);
    console.log(`REPOSITORY - getProductByIdRepository id:${id}`);

    return productoEncontrado.recordset;
  } catch (error) {
    console.log("Error en REPOSITORY - getProductByIdRepository - " + error);
    throw Error("Error en REPOSITORY - getProductByIdRepository - " + error);
  } finally {
    pool.close();
  }
};

exports.deleteProductRepository = async (id) => {
  const pool = await getConnectionSQL();

  try {
    console.log(`REPOSITORY - deleteProductRepository - id:${id}`);
    const productoEncontrado = await pool
      .request()
      .input("id", sql.Int, id)
      .query(getProductByIdSQL);

    if (productoEncontrado.recordset.length == 0) {
      console.log("Producto no encontrado");
    } else {
      console.log(productoEncontrado.recordset[0]);
      const productoBorrado = await pool
        .request()
        .input("id", sql.Int, id)
        .query(deleteProductSQL);

      console.log(
        `Producto Eliminado - NOMBRE: ${productoEncontrado.recordset[0].NOMBRE}`
      );

      return productoBorrado.rowsAffected[0];
    }
  } catch (error) {
    console.log("Error en REPOSITORY - deleteProductRepository - " + error);
    throw Error("Error en REPOSITORY - deleteProductRepository - " + error);
  } finally {
    pool.close();
  }
};

exports.createProductRepository = async (product) => {
  const { NOMBRE, DESCRIPCION, CATEGORIA, PRECIO, ACTIVO } = product;
  const pool = await getConnectionSQL();
  try {
    console.log(`REPOSITORY - createProductRepository producto:${product}`);

    await pool
      .request()
      .input("NOMBRE", sql.NVarChar, NOMBRE)
      .input("DESCRIPCION", sql.NVarChar, DESCRIPCION)
      .input("CATEGORIA", sql.NVarChar, CATEGORIA)
      .input("PRECIO", sql.Decimal, PRECIO)
      .input("ACTIVO", sql.Bit, ACTIVO)
      .query(createProductSQL);

    return product;
  } catch (error) {
    console.log("Error en REPOSITORY - createProductRepository - " + error);
    throw Error("Error en REPOSITORY - createProductRepository - " + error);
  } finally {
    pool.close();
  }
};
