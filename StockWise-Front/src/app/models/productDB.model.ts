export interface ProductDB {
  NOMBRE: string;
  DESCRIPCION?: string;
  CATEGORIA?: string;
  PRECIO: number;
  ACTIVE: boolean; //  (true = Activo, false = Inactivo)
}
