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

  async getItemByBarcode(barcode: number): Promise<Item> {
    const [rows] = await connection.query<ItemDbObject[]>(
      'SELECT * FROM items WHERE barcode = ?',
      barcode
    );
    console.log('Get item by barcode result:', rows);
    return rows[0];
  }

  async addNewItem({
    barcode,
    name,
    price,
    quantity,
  }: Item): Promise<AddItemMutationResponse> {
    console.log('adding item');
    const [rows] = await connection.query<ItemDbObject[]>(
      'INSERT INTO items (barcode, name, price, quantity) VALUES (?, ?, ?, ?)',
      [barcode, name, price, quantity]
    );
    console.log('Add new item', rows);

    return {
      code: '200',
      success: true,
      message: 'New item added!',
    };
  }

  async addExistingItem({
    barcode,
    quantity,
  }: {
    barcode: number;
    quantity: number;
  }): Promise<AddItemMutationResponse> {
    console.log('adding item');
    const thisItem = await this.getItemByBarcode(barcode);
    const oldquantity = thisItem.quantity;

    const [rows] = await connection.query<ItemDbObject[]>(
      'UPDATE items SET quantity = ? WHERE barcode = ?;',
      [oldquantity + quantity, barcode]
    );
    console.log('Add new item', rows);

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

  async addItem({
    barcode,
    name,
    price,
    quantity,
  }: Item): Promise<AddItemMutationResponse> {
    console.log('adding item');

    if (await this.getItemByBarcode(barcode)) {
      console.log('item exists');
      await this.addExistingItem({ barcode, quantity });
    } else {
      console.log('new item adding');
      await this.addNewItem({ barcode, name, price, quantity });
    }

    return {
      code: '200',
      success: true,
      message: 'Item added!',
    };
  }

  // TODO - delete an item
}
