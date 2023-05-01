import { createConnection, RowDataPacket } from 'mysql2/promise';

const dbName = 'Store';

export const connection = await createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: dbName,
});

export const initializeDB = async () => {
  await connection.connect();

  const [dbRows] = await connection.query<RowDataPacket[]>(
    `SHOW DATABASES LIKE 'Store';`
  );

  if (dbRows.length < 1) {
    console.log('No database named Store was found, creating...');
    await connection.query('CREATE DATABASE Store;');
  }
};
