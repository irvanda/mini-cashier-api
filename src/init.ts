import { PoolClient } from 'pg';
import { pool } from './config';

const initialize = () => {
  pool.connect().then((client: PoolClient) => {
    return client
      .query(
        `CREATE TABLE IF NOT EXISTS books (
        ID SERIAL PRIMARY KEY,
        author VARCHAR(255) NOT NULL,
        title VARCHAR(255) NOT NULL
      );`
      )
      .then((res) => {
        if (res) {
          console.log('DONE: Create books table IF NOT EXISTS');
          console.log(res);
        }
        return client
          .query(
            `ALTER TABLE books ADD COLUMN IF NOT EXISTS test VARCHAR(255);`
          )
          .then((res) => {
            client.release();
            if (res) {
              console.log('DONE: add column test on table books IF NOT EXISTS');
              console.log(res);
            }
          })
          .catch((err) => {
            client.release();
            console.log(err);
          });
      })
      .catch((err) => {
        client.release();
        console.log(err);
      });
  });
};

export { initialize };
