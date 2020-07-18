import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { pool } from './config';
import { initialize } from './init';

pool.on('error', (err: any) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

initialize();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const getBooks = (_request: express.Request, response: express.Response) => {
  pool.query('SELECT * FROM books', (error: any, results: { rows: any }) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addBook = (request: express.Request, response: express.Response) => {
  const { author, title } = request.body;

  pool.query(
    'INSERT INTO books (author, title) VALUES ($1, $2)',
    [author, title],
    (error: any) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: 'success', message: 'Book added.' });
    }
  );
};

app
  .route('/books')
  // GET endpoint
  .get(getBooks)
  // POST endpoint
  .post(addBook);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening on port ${process.env.PORT || 3002}`);
});
