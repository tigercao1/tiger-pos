import { connection } from './connection.js';
import { AddItemMutationResponse, Item } from './generated/graphql';
import { ItemDbObject } from './types.js';

export class StoreDataSource {
  async getItems(): Promise<Item[]> {
    const [rows] = await connection.query<ItemDbObject[]>(
      'SELECT * from items'
    );
    console.log('Show Data:', rows);
    return rows;
  }

  async addItem({
    name,
    price,
    quantity,
  }: Item): Promise<AddItemMutationResponse> {
    console.log('adding item');
    const [rows] = await connection.query(
      'INSERT INTO items (name, price, quantity) VALUES (?, ?, ?)',
      [name, price, quantity]
    );

    console.log('Add data:', rows);

    return {
      code: '200',
      success: true,
      message: 'New item added!',
    };
  }
}
