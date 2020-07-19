import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { pool } from './configs';
import * as routes from './routes';

pool.on('error', (err: any) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/v1', routes.books);

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening on port ${process.env.PORT || 3002}`);
});
