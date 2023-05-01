import { connection } from './connection.js';
import {
  AddItemMutationResponse,
  DeleteItemMutationResponse,
  Item,
} from './generated/graphql';
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
    barcode,
  }: Item): Promise<AddItemMutationResponse> {
    console.log('adding item');
    const [rows] = await connection.query(
      'INSERT INTO items (name, price, quantity) VALUES (?, ?, ?, ?)',
      [name, price, quantity, barcode]
    );

    console.log('Add data:', rows);

    return {
      code: '200',
      success: true,
      message: 'New item added!',
    };
  }

  async deleteItemByBarcode(
    barcode: number
  ): Promise<DeleteItemMutationResponse> {
    console.log('deleting item ', barcode);

    const [itemRows] = await connection.query<ItemDbObject[]>(
      'SELECT * from items where barcode = ?',
      [barcode]
    );

    console.log('deleting item ', itemRows);

    if (itemRows.length > 0) {
      await connection.query('DELETE from items where barcode=?', [barcode]);

      return {
        code: '200',
        success: true,
        item: itemRows[0],
      };
    }

    return {
      code: '200',
      success: true,
      item: null,
    };
  }

  // TODO - delete an item
}
