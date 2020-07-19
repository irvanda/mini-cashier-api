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
          console.log('check00: ', res);
          resolve(res);
        })
        .catch((err) => {
          console.log('check01: ', err);
          reject(err);
        });
    });
  }
};
