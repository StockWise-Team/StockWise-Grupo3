export interface Product {
  id: number;
  name: string;
  unitPrice: number;
  imageUrl?: string; // opcional, placeholder si no existe
}

export interface SaleItem {
  product: Product;
  quantity: number;
  subtotal: number; // quantity * unitPrice
}
