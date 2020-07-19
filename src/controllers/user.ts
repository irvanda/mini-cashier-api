/* eslint-disable camelcase */
import moment from 'moment';
import express from 'express';
import dbQuery from '../helpers/dbQuery';
import { BaseResponse } from '../interface/common';
import { User } from '../interface/user';
import {
  hashPassword,
  comparePassword,
  validatePassword,
  generateUserToken,
  isEmpty
} from '../helpers/validation';
import * as userQuery from '../models/user';
import { status } from '../helpers/status';

/*
 * Create A User
 * @param {object} req
 * @param {object} res
 * @returns {object} reflection object
 */
const createUser = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;

  const createdAt = moment(Date.now()).unix();
  if (isEmpty(username) || isEmpty(password)) {
    const response: BaseResponse<User> = {
      success: false,
      data: null,
      error: 'Email, password, first name and last name field cannot be empty'
    };
    return res.status(status.bad).send(response);
  }
  if (!validatePassword(password)) {
    const response: BaseResponse<User> = {
      success: false,
      data: null,
      error: 'Password must be more than five(5) characters'
    };
    return res.status(status.bad).send(response);
  }
  const hashedPassword = hashPassword(password);
  const createUserQuery = userQuery.createUser;
  const values = [username, hashedPassword, createdAt];

  try {
    const { rows } = (await dbQuery.query(createUserQuery, values)) as any;
    const dbResponse = rows[0];
    delete dbResponse.password;
    const token = generateUserToken(
      dbResponse.id,
      dbResponse.username,
      dbResponse.createdAt
    );
    const response: BaseResponse<User> = {
      success: true,
      data: dbResponse,
      error: null
    };
    (response.data as User).token = token;
    return res.status(status.created).send(response);
  } catch (error) {
    const response: BaseResponse<User> = {
      success: false,
      data: null,
      error: 'Operation was not successful. ' + error.message
    };
    return res.status(status.error).send(response);
  }
};

/*
 * Signin
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
const authSignin = async (req: express.Request, res: express.Response) => {
  const { username, password } = req.body;
  if (isEmpty(username) || isEmpty(password)) {
    const response: BaseResponse<User> = {
      success: false,
      data: null,
      error: 'Email or Password detail is missing'
    };
    return res.status(status.bad).send(response);
  }
  const signinUserQuery = userQuery.authSignin;
  try {
    const { rows } = (await dbQuery.query(signinUserQuery, [username])) as any;
    const dbResponse = rows[0];
    if (!dbResponse) {
      const response: BaseResponse<User> = {
        success: false,
        data: null,
        error: 'Username does not exist'
      };
      return res.status(status.notfound).send(response);
    }
    if (!comparePassword(dbResponse.password, password)) {
      const response: BaseResponse<User> = {
        success: false,
        data: null,
        error: 'The password you provided is incorrect'
      };
      return res.status(status.bad).send(response);
    }
    const token = generateUserToken(
      dbResponse.id,
      dbResponse.username,
      dbResponse.craetedAt
    );
    delete dbResponse.password;
    const response: BaseResponse<User> = {
      success: true,
      data: dbResponse,
      error: null
    };
    (response.data as User).token = token;
    return res.status(status.success).send(response);
  } catch (error) {
    const response: BaseResponse<User> = {
      success: false,
      data: null,
      error: 'Operation was not successful. ' + error.message
    };
    return res.status(status.error).send(response);
  }
};

export { createUser, authSignin };
