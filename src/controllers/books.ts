import express from 'express';
import { pool } from '../configs';
import * as books from '../models/books';

const getBooks = (_request: express.Request, response: express.Response) => {
  pool.query(books.getBooks, (error: any, results: { rows: any }) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addBook = (request: express.Request, response: express.Response) => {
  const { author, title } = request.body as { author: string; title: string };

  pool.query(books.insertBooks, [author, title], (error: any) => {
    if (error) {
      throw error;
    }
    response.status(201).json({ status: 'success', message: 'Book added.' });
  });
};

export { getBooks, addBook };
