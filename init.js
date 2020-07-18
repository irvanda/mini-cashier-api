const {pool} = require('./config')

const initialize = () => {
  pool.on('connect', () => {
    console.log('connected to the db');
  });
  
  pool.on('error', (err) => {
    console.log('Error: ', err);
  });
  
  pool.query(
    `CREATE TABLE IF NOT EXISTS books (
      ID SERIAL PRIMARY KEY,
      author VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL
    );`,
    null,
    (error) => {
      if (error) {
        throw error
      }
    },
  )

  pool.query(
    `ALTER TABLE books
    ADD COLUMN IF NOT EXISTS test VARCHAR(255);`,
    null,
    (error) => {
      if (error) {
        throw error
      }
    },
  )
};

module.exports = {initialize};


