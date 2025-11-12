const { 
  createSaleRepository, 
  getAllSalesRepository, 
  getTodaySalesRepository, 
  getNextSaleNumber,
  checkProductStockRepository,
  decreaseProductStockRepository 
} = require("../repositories/salesRepository");

// Crea una venta verificando stock y descontándolo automáticamente
exports.createSaleService = async function(saleData) {
  try {
    if (!saleData.idUsuario || !saleData.items || saleData.items.length === 0) {
      throw new Error("Datos de venta inválidos");
    }

    try {
      for (let i = 0; i < saleData.items.length; i++) {
        const item = saleData.items[i];
        const stock = await checkProductStockRepository(item.idProducto);
        
        if (stock.CANTIDAD_SUCURSAL < item.cantidad) {
          throw new Error(`Stock insuficiente para el producto ID ${item.idProducto}. Stock disponible: ${stock.CANTIDAD_SUCURSAL}, Solicitado: ${item.cantidad}`);
        }
      }

      const numeroVenta = await getNextSaleNumber();
      const fecha = new Date();
      const results = [];

      for (let i = 0; i < saleData.items.length; i++) {
        const item = saleData.items[i];
        const saleItem = {
          idUsuario: saleData.idUsuario,
          idProducto: item.idProducto,
          cantidad: item.cantidad,
          precioUnitario: item.precioUnitario,
          total: item.cantidad * item.precioUnitario,
          fecha: fecha,
          numeroVenta: numeroVenta
        };
        
        const result = await createSaleRepository(saleItem);
        results.push(result);
        
        await decreaseProductStockRepository(item.idProducto, item.cantidad);
      }

      return { 
        success: true, 
        message: 'Venta registrada exitosamente', 
        numeroVenta: numeroVenta,
        results: results 
      };
    } catch (cashError) {
      if (cashError.message.includes("No hay caja abierta")) {
        throw new Error("No se puede realizar la venta. Debe abrir una caja antes de realizar ventas.");
      }
      throw cashError;
    }
  } catch (error) {
    throw Error("Error en Service - createSaleService - " + error.message);
  }
};

// Obtiene todas las ventas y las agrupa por transacción
exports.getAllSalesService = async function() {
  try {
    const salesData = await getAllSalesRepository();
    return groupSalesByTransaction(salesData);
  } catch (error) {
    throw Error("Error en Service - getAllSalesService - " + error);
  }
};

// Obtiene las ventas de la caja actual y las agrupa por transacción
exports.getTodaySalesService = async function() {
  try {
    const salesData = await getTodaySalesRepository();
    const groupedSales = groupSalesByTransaction(salesData);
    return groupedSales;
  } catch (error) {
    throw Error("Error en Service - getTodaySalesService - " + error);
  }
};

// Agrupa las ventas por número de transacción
function groupSalesByTransaction(salesData) {
  const grouped = [];
  
  salesData.forEach(row => {
    let transactionKey = "";
    
    if (row.NUMERO_VENTA) {
      transactionKey = row.NUMERO_VENTA.toString();
    } else {
      const date = new Date(row.FECHA);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      
      transactionKey = row.ID_USUARIO + "_" + year + "-" + month + "-" + day + "_" + hours + ":" + minutes;
    }
    
    let existingGroup = null;
    for (let j = 0; j < grouped.length; j++) {
      if (grouped[j].id === transactionKey) {
        existingGroup = grouped[j];
        break;
      }
    }
    
    if (!existingGroup) {
      const newGroup = {
        id: transactionKey,
        saleNumber: row.NUMERO_VENTA ? "Venta #" + row.NUMERO_VENTA : "S/N",
        date: row.FECHA,
        userId: row.ID_USUARIO,
        userName: row.USUARIO_NOMBRE || "Usuario " + row.ID_USUARIO,
        totalAmount: 0,
        itemCount: 0,
        details: []
      };
      grouped.push(newGroup);
      existingGroup = newGroup;
    }

    const detail = {
      id: existingGroup.details.length + 1,
      productId: row.ID_PRODUCTO,
      productName: row.PRODUCTO_NOMBRE,
      quantity: row.CANTIDAD,
      unitPrice: row.PRECIO_UNITARIO,
      subtotal: row.TOTAL
    };
    existingGroup.details.push(detail);

    existingGroup.totalAmount = existingGroup.totalAmount + row.TOTAL;
    existingGroup.itemCount = existingGroup.itemCount + row.CANTIDAD;
  });

  grouped.sort(function(a, b) {
    if (a.saleNumber.indexOf("#") !== -1 && b.saleNumber.indexOf("#") !== -1) {
      const numA = parseInt(a.saleNumber.replace("Venta #", ""));
      const numB = parseInt(b.saleNumber.replace("Venta #", ""));
      return numB - numA;
    }
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });

  return grouped;
}
