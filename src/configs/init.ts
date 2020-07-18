import { pool } from '.';
import * as init from '../models/init';
import { PoolClient } from 'pg';

const initialize = async () => {
  await pool.connect().then((client: PoolClient) => {
    return client
      .query(init.createBooksTable)
      .then((res) => {
        if (res) {
          console.log('DONE: Create books table IF NOT EXISTS');
        }
        return client
          .query(init.addColumnBooksTable)
          .then((res) => {
            client.release();
            if (res) {
              console.log('DONE: add column test on table books IF NOT EXISTS');
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
