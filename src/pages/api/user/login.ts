import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { serialize } from 'cookie';

import User from '../../../models/userModel';
import connectDB from '../../../configs/database';
import { encodeToken, handleError } from '../../../helpers';
import { Cart, ErrorMessage } from '../../../configs/type';

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
      await login(req, res);
      break;
    default:
      return handleError(req, res, {});
  }
}

const login = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorMessage>,
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne(
      { email },
      { _id: 1, name: 1, avatar: 1, cart: 1, password: 1 },
    );

    if (!user) {
      console.log('Hello:', user);
      return res.status(400).json({ message: 'This user does not exist.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Incorrect password.' });

    const access_token = await encodeToken({ id: user._id });
    const tookenExpire = new Date();
    tookenExpire.setDate(tookenExpire.getDate() + 30);
    res.setHeader(
      'set-cookie',
      serialize('accessToken', `${access_token}`, {
        // maxAge: 5000,
        expires: tookenExpire,
        secure: true,
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
      }),
    );
    res.status(200).send({
      message: 'ok',
      img: user.avatar,
      cart: user.cart,
      name: user.name,
    });
  } catch (err) {
    console.log(err);
    return handleError(req, res, {});
  }
};
