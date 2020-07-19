/* eslint-disable camelcase */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
/*
 * Hash Password Method
 * @param {string} password
 * @returns {string} returns hashed password
 */
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const hashPassword = (password: string) => bcrypt.hashSync(password, salt);

/*
 * comparePassword
 * @param {string} hashPassword
 * @param {string} password
 * @returns {Boolean} return True or False
 */
const comparePassword = (hashedPassword: string, password: string) => {
  return bcrypt.compareSync(password, hashedPassword);
};

/*
 * isValidEmail helper method
 * @param {string} email
 * @returns {Boolean} True or False
 */
const isValidEmail = (email: string) => {
  const regEx = /\S+@\S+\.\S+/;
  return regEx.test(email);
};

/*
 * validatePassword helper method
 * @param {string} password
 * @returns {Boolean} True or False
 */
const validatePassword = (password: string) => {
  if (password.length <= 5 || password === '') {
    return false;
  }
  return true;
};

/*
 * Generate Token
 * @param {string} id
 * @returns {string} token
 */
const generateUserToken = (id: number, username: string, createdAt: number) => {
  if (process.env.SECRET) {
    const token = jwt.sign(
      {
        id,
        username,
        createdAt
      },
      process.env.SECRET,
      { expiresIn: '3d' }
    );
    return token;
  } else {
    console.log('process.env.SECRET is undefined');
    return '';
  }
};

/*
 * isEmpty helper method
 * @param {any} input
 * @returns {Boolean} True or False
 */
const isEmpty = (input: any) => {
  if (
    input === undefined ||
    input === '' ||
    input === null ||
    input === [] ||
    input === {}
  ) {
    return true;
  }
  return false;
};

export {
  hashPassword,
  comparePassword,
  isValidEmail,
  validatePassword,
  generateUserToken,
  isEmpty
};
