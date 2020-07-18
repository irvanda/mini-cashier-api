const getBooks = 'SELECT * FROM books;';
const insertBooks = 'INSERT INTO books (author, title) VALUES ($1, $2);';

export { getBooks, insertBooks };
