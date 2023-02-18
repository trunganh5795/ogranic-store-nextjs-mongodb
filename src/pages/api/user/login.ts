/* eslint-disable @typescript-eslint/no-use-before-define */
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';
import * as sanitize from 'mongo-sanitize';

import User from '../../../models/userModel';
import connectDB from '../../../configs/database';
import { encodeToken, handleError } from '../../../helpers';
import { Cart, ErrorMessage } from '../../../configs/type';

// let sanitize = require('mongo-sanitize');

interface Data {
  message: string;
  name: string;
  cart: Cart;
  img: string;
}
export default async function loginAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorMessage>,
) {
  await connectDB();
  switch (req.method) {
    case 'POST':
      return login(req, res);
    default:
      return handleError(req, res, {});
  }
}

const login = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorMessage>,
) => {
  try {
    const { email, password } = sanitize(req.body);

    const user = await User.findOne(
      { email },
      { _id: 1, name: 1, avatar: 1, cart: 1, password: 1 },
    );

    if (!user) {
      return res.status(400).json({ message: 'This user does not exist.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Incorrect password.' });

    const accessToken = await encodeToken({ id: user._id });
    const tookenExpire = new Date();
    tookenExpire.setDate(tookenExpire.getDate() + 30);
    res.setHeader(
      'set-cookie',
      serialize('accessToken', `${accessToken}`, {
        // maxAge: 5000,
        expires: tookenExpire,
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      }),
    );
    return res.status(200).send({
      message: 'ok',
      img: user.avatar,
      cart: user.cart,
      name: user.name,
    });
  } catch (err) {
    return handleError(req, res, {});
  }
};
