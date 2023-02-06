export interface Product {
  id?: number;
  name: string;
  description?: string;
  sale_price: number;
  buy_price: number;
  stock: number;
  thresshold_value?: number;
  expirity_date?: Date;
  availability: string;
  supplier_id: number;
  category_id: number;
}
