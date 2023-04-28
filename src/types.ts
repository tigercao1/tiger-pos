import { RowDataPacket } from 'mysql2';

export interface ItemDbObject extends RowDataPacket {
  __typename?: 'Item';
  id?: number;
  name: string;
  price: number;
  quantity: number;
}
