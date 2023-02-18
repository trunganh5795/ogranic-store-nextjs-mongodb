/* eslint-disable @typescript-eslint/no-use-before-define */
import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../configs/database';
import User from '../../../models/userModel';
import { handleError } from '../../../helpers';
import {
  ErrorMessage,
  ResponseMessage,
  User as UserType,
} from '../../../configs/type';

export default async function isAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse<
    Omit<UserType, 'password' | 'role'> | ResponseMessage<null> | ErrorMessage
  >,
) {
  await connectDB();
  switch (req.method) {
    case 'GET':
      return isAuth(req, res);
    default:
      return handleError(req, res, {});
  }
}

const isAuth = async (
  req: NextApiRequest,
  res: NextApiResponse<
    Omit<UserType, 'password' | 'role'> | ResponseMessage<null> | ErrorMessage
  >,
) => {
  try {
    if (req.headers.isauth === '0') {
      return handleError(req, res, { code: 401, message: 'unAuthorized' });
    }
    const user: Omit<UserType, 'password' | 'role'> | null = await User.findOne(
      { _id: req.headers._id },
      { password: 0, role: 0 },
    );
    if (user) {
      return res.status(200).send(user);
    }
    return handleError(req, res, { code: 404, message: 'unAuthorized' });
  } catch (err) {
    return handleError(req, res, {});
  }
};
