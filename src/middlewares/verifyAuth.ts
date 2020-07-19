/* eslint-disable max-len */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { status } from '../helpers/status';
import { BaseResponse } from '../interface/common';
import { User } from '../interface/user';

dotenv.config();

/*
 * Verify Token
 * @param {object} req
 * @param {object} res
 * @param {object} next
 * @returns {object|void} response object
 */

const verifyToken = async (req: any, res: any, next: any) => {
  if (process.env.SECRET) {
    const { token } = req.headers as { token: string };
    if (!token) {
      const response: BaseResponse<User> = {
        success: false,
        data: null,
        error: 'Token not provided'
      };
      return res.status(status.bad).send(response);
    }
    try {
      const decoded = jwt.verify(token, process.env.SECRET) as any;
      req.user = {
        email: decoded.email,
        user_id: decoded.user_id,
        is_admin: decoded.is_admin,
        first_name: decoded.first_name,
        last_name: decoded.last_name
      };
      next();
    } catch (error) {
      const response: BaseResponse<User> = {
        success: false,
        data: null,
        error: 'Authentication Failed'
      };
      return res.status(status.unauthorized).send(response);
    }
  } else {
    console.log('process.env.SECRET is undefined');
  }
};

export default verifyToken;
