import { RowDataPacket } from 'mysql2';

export interface ItemDbObject extends RowDataPacket {
  __typename?: 'Item';
  barcode: number;
  name: string;
  price: number;
  quantity: number;
}

export interface Count extends RowDataPacket {
  count: number;
}
