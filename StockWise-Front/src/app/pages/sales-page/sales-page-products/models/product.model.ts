export interface ProductDB {
  NOMBRE: string;
  DESCRIPCION?: string;
  CATEGORIA?: string;
  PRECIO: number;
  ACTIVE: boolean; // Campo que viene del backend (true = Activo, false = Inactivo)
}
