import { pool } from '../configs';

export default {
  /*
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query(queryText: any, params: any) {
    return new Promise((resolve, reject) => {
      pool
        .query(queryText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err: Error) => {
          console.log('SQL error logs: ', err.message);
          reject(err);
        });
    });
  }
};
