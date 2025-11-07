export type SaleStatus = 'Completed' | 'Cancelled' | 'Pending';

export interface Sale {
  id: number;
  number: string; // human friendly code
  date: string;   // ISO string
  amount: number; // total amount
  status: SaleStatus;
}
