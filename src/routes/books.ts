import express from 'express';
import * as books from '../controllers/books';

const router = express.Router();

router.get('/books', books.getBooks);
router.post('/books', books.addBook);

export default router;
