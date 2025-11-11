const { getConnectionSQL } = require("../database/connection");
const {
  getAllProductSQL,
  getProductByIdSQL,
  deleteProductSQL,
  createProductSQL,
  updateProductSQL,
  activeProductSQL,
} = require("../database/queries");
const sql = require("mssql");

exports.getAllProductsRepository = async () => {
  const pool = await getConnectionSQL();
  //console.log("pool", pool);
  try {
    const result = await pool.request().query(getAllProductSQL);

    return result.recordset; // Devolver directamente el array sin stringify
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
    const foundProduct = await pool
      .request()
      .input("id", sql.Int, id)
      .query(getProductByIdSQL);
    console.log(`REPOSITORY - getProductByIdRepository id:${id}`);

    return foundProduct.recordset;
  } catch (error) {
    console.log("Error en REPOSITORY - getProductByIdRepository - " + error);
    throw Error("Error en REPOSITORY - getProductByIdRepository - " + error);
  } finally {
    pool.close();
  }
};

exports.deleteProductRepository = async (id) => {
  const pool = await getConnectionSQL();
  let result;

  try {
    console.log(`REPOSITORY - deleteProductRepository - id:${id}`);
    const foundProduct = await pool
      .request()
      .input("id", sql.Int, id)
      .query(getProductByIdSQL);

    if (foundProduct.recordset.length == 0) {
      console.log("Producto no encontrado");
    } else {
      if (foundProduct.recordset[0].ACTIVO) {
        result = await pool
          .request()
          .input("id", sql.Int, id)
          .query(deleteProductSQL);
      }
      if (!foundProduct.recordset[0].ACTIVO) {
        result = await pool
          .request()
          .input("id", sql.Int, id)
          .query(activeProductSQL);
      }

      console.log(
        `Producto Eliminado - NOMBRE: ${foundProduct.recordset[0].NOMBRE}`
      );

      return result.rowsAffected[0];
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

exports.updateProductRepository = async (id, product) => {
  const { NOMBRE, DESCRIPCION, CATEGORIA, PRECIO, ACTIVO } = product;
  const pool = await getConnectionSQL();
  try {
    console.log(
      `REPOSITORY - updateProductRepository id: ${id}  producto:${product}`
    );

    const foundProduct = await pool
      .request()
      .input("id", sql.Int, id)
      .query(getProductByIdSQL);

    if (foundProduct.recordset.length == 0) {
      console.log("Producto no encontrado");
    } else {
      const updatedProduct = await pool
        .request()
        .input("id", sql.Int, id)
        .input("NOMBRE", sql.NVarChar, NOMBRE)
        .input("DESCRIPCION", sql.NVarChar, DESCRIPCION)
        .input("CATEGORIA", sql.NVarChar, CATEGORIA)
        .input("PRECIO", sql.Decimal, PRECIO)
        .input("ACTIVO", sql.Bit, ACTIVO)
        .query(updateProductSQL);

      console.log(
        `Producto Actualizado - NOMBRE: ${foundProduct.recordset[0].NOMBRE}`
      );
      console.log(product);

      return updatedProduct.rowsAffected[0];
    }
  } catch (error) {
    console.log("Error en REPOSITORY - updateProductRepository - " + error);
    throw Error("Error en REPOSITORY - updateProductRepository - " + error);
  } finally {
    pool.close();
  }
};
