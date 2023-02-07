import { OrderDetail } from "./order-detail.model";

export interface Order{
  order_code:string,
  client:number,
  order_detail:OrderDetail[]
}
