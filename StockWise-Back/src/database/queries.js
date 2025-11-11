module.exports = {

  // Consulta para obtener todos los productos con su stock en sucursal
  getAllProductSQL: `
    SELECT 
      p.ID,
      p.NOMBRE,
      p.DESCRIPCION,
      p.CATEGORIA,
      p.PRECIO,
      p.ACTIVE,
      COALESCE(s.CANTIDAD_SUCURSAL, 0) as STOCK_SUCURSAL,
      COALESCE(s.CANTIDAD_DEPOSITO, 0) as STOCK_DEPOSITO
    FROM PRODUCTOS p
    LEFT JOIN STOCK s ON p.ID = s.ID_PRODUCTO
  `,
  
  // Consulta para obtener productos con stock disponible en sucursal (para ventas)
  getProductsWithStockSQL: `
    SELECT 
      p.ID,
      p.NOMBRE,
      p.DESCRIPCION,
      p.CATEGORIA,
      p.PRECIO,
      COALESCE(s.CANTIDAD_SUCURSAL, 0) as STOCK_SUCURSAL
    FROM PRODUCTOS p
    LEFT JOIN STOCK s ON p.ID = s.ID_PRODUCTO
    WHERE COALESCE(s.CANTIDAD_SUCURSAL, 0) > 0
      AND p.ACTIVE = 1
  `,
  
  getProductByIdSQL: `SELECT * FROM Productos WHERE ID = @ID`,
  deleteProductSQL: `UPDATE Productos SET ACTIVO = 0 WHERE ID = @ID`,
  createProductSQL: `INSERT INTO PRODUCTOS (NOMBRE, DESCRIPCION, CATEGORIA, PRECIO, ACTIVO) 
  VALUES (@NOMBRE, @DESCRIPCION, @CATEGORIA, @PRECIO, @ACTIVO)`,
  updateProductSQL: `UPDATE Productos 
  SET NOMBRE = @NOMBRE, DESCRIPCION = @DESCRIPCION, CATEGORIA = @CATEGORIA, PRECIO = @PRECIO, ACTIVO = @ACTIVO
  WHERE ID = @ID`,
  getAuthUser: "SELECT * FROM USUARIOS WHERE MAIL = @EMAIL",
  createSaleSQL: `INSERT INTO VENTAS (ID_USUARIO, ID_PRODUCTO, CANTIDAD, PRECIO_UNITARIO, TOTAL, FECHA, NUMERO_VENTA) 
  VALUES (@idUsuario, @idProducto, @cantidad, @precioUnitario, @total, @fecha, @numeroVenta)`,
  
  // Consultas para obtener ventas agrupadas
  getAllSalesSQL: `
    SELECT 
      v.ID_USUARIO,
      u.NOMBRE_COMPLETO as USUARIO_NOMBRE,
      v.FECHA,
      v.ID_PRODUCTO,
      p.NOMBRE as PRODUCTO_NOMBRE,
      v.CANTIDAD,
      v.PRECIO_UNITARIO,
      v.TOTAL,
      v.NUMERO_VENTA
    FROM VENTAS v
    INNER JOIN PRODUCTOS p ON v.ID_PRODUCTO = p.ID
    LEFT JOIN USUARIOS u ON v.ID_USUARIO = u.ID
    ORDER BY v.FECHA DESC, v.ID_USUARIO
  `,
  
  // Consulta para ventas de la caja abierta actual
  getTodaySalesSQL: `
    SELECT 
      v.ID_USUARIO,
      u.NOMBRE_COMPLETO as USUARIO_NOMBRE,
      v.FECHA,
      v.ID_PRODUCTO,
      p.NOMBRE as PRODUCTO_NOMBRE,
      v.CANTIDAD,
      v.PRECIO_UNITARIO,
      v.TOTAL,
      v.NUMERO_VENTA
    FROM VENTAS v
    INNER JOIN PRODUCTOS p ON v.ID_PRODUCTO = p.ID
    LEFT JOIN USUARIOS u ON v.ID_USUARIO = u.ID
    INNER JOIN CIERRE_CAJA cc ON cc.FECHA_CIERRE IS NULL
    WHERE v.FECHA >= cc.FECHA_APERTURA
    ORDER BY v.FECHA DESC, v.NUMERO_VENTA DESC
  `,

  // Consulta para obtener el último número de venta de la caja abierta actual
  getLastSaleNumberSQL: `
    SELECT TOP 1 v.NUMERO_VENTA 
    FROM VENTAS v
    INNER JOIN CIERRE_CAJA cc ON cc.FECHA_CIERRE IS NULL
    WHERE v.FECHA >= cc.FECHA_APERTURA
      AND v.NUMERO_VENTA IS NOT NULL 
    ORDER BY v.FECHA DESC, v.ID DESC
  `,

  // Consultas para gestión de caja
  // Abrir nueva caja
  openCashSQL: `
    INSERT INTO CIERRE_CAJA (ID_EMPLEADO, FECHA_APERTURA) 
    VALUES (@idEmpleado, @fechaApertura)
  `,

  // Obtener caja abierta actual (sin FECHA_CIERRE significa que está abierta)
  getOpenCashSQL: `
    SELECT TOP 1 * 
    FROM CIERRE_CAJA 
    WHERE FECHA_CIERRE IS NULL 
    ORDER BY FECHA_APERTURA DESC
  `,

  // Obtener total de ventas de la caja abierta
  getTotalSalesOpenCashSQL: `
    SELECT 
      COALESCE(SUM(v.TOTAL), 0) as TOTAL_VENTAS,
      COUNT(DISTINCT v.NUMERO_VENTA) as CANTIDAD_VENTAS
    FROM VENTAS v
    INNER JOIN CIERRE_CAJA cc ON cc.FECHA_CIERRE IS NULL
    WHERE v.FECHA >= cc.FECHA_APERTURA
  `,

  // Cerrar caja
  closeCashSQL: `
    UPDATE CIERRE_CAJA 
    SET FECHA_CIERRE = @fechaCierre,
        MONTO_FINAL = @montoFinal,
        ID_EMPLEADO = @idEmpleado
    WHERE ID = @idCaja
  `,

  // Obtener historial de cierres de caja
  getCashHistorySQL: `
    SELECT 
      cc.*,
      u.NOMBRE_COMPLETO as EMPLEADO_NOMBRE
    FROM CIERRE_CAJA cc
    LEFT JOIN USUARIOS u ON cc.ID_EMPLEADO = u.ID
    ORDER BY cc.FECHA_APERTURA DESC
  `,

  // Consultas para manejo de stock
  // Obtener stock actual de un producto
  getProductStockSQL: `
    SELECT CANTIDAD_SUCURSAL, CANTIDAD_DEPOSITO 
    FROM STOCK 
    WHERE ID_PRODUCTO = @idProducto
  `,

  // Descontar stock de sucursal cuando se realiza una venta
  decreaseStockSQL: `
    UPDATE STOCK 
    SET CANTIDAD_SUCURSAL = CANTIDAD_SUCURSAL - @cantidad 
    WHERE ID_PRODUCTO = @idProducto
  `
};
