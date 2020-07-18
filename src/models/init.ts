const createBooksTable = `CREATE TABLE IF NOT EXISTS books (
    ID SERIAL PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL
  );`;
const addColumnBooksTable =
  'ALTER TABLE books ADD COLUMN IF NOT EXISTS test VARCHAR(255);';

export { createBooksTable, addColumnBooksTable };
