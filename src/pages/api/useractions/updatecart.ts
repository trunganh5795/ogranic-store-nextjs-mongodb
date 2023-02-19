/* eslint-disable @typescript-eslint/no-use-before-define */
import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../configs/database';
import User from '../../../models/userModel';
import { handleError } from '../../../helpers';
import { Cart } from '../../../configs/type';

type Data = {
  message: string;
};

export default async function isAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  await connectDB();
  switch (req.method) {
    case 'POST':
      await updateCart(req, res);
      break;
    default:
      handleError(req, res, {});
  }
}

const updateCart = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req.headers.isauth === '0') {
      return handleError(req, res, { code: 401, message: 'unAuthorized' });
    }
    const cart = req.body.cart as Cart[];
    const user = await User.findOne({ _id: req.headers._id });
    if (user) {
      user.cart = cart;
      await user.save();
      return res.status(200).send({ message: 'ok' });
    }
    return handleError(req, res, { code: 404, message: 'user not found' });
  } catch (err) {
    return handleError(req, res, {});
  }
};
