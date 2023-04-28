import { createConnection } from 'mysql2/promise';

const dbName = 'Store';

export const connection = await createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: dbName,
});

export const initializeDB = async () => {
  await connection.connect();
};
