import type { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcrypt';

import User from '../../../models/userModel';
import connectDB from '../../../configs/database';
import { handleError } from '../../../helpers';
import { saltRounds } from '../../../configs/constants';
import { ResponseMessage } from '../../../configs/type';

export default async function registerAPI(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMessage<null>>,
) {
  await connectDB();
  switch (req.method) {
    case 'POST':
      await register(req, res);
      break;
    default:
      return handleError(req, res, {});
  }
}

const register = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseMessage<null>>,
) => {
  try {
    const { name, email, password } = req.body;
    const errMsg = validator.isEmail(email);
    if (!errMsg) return handleError(req, res, { code: 400 });

    const user = await User.findOne({ email });
    if (user)
      return handleError(req, res, {
        code: 409,
        message: 'This email already exists.',
      });

    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: passwordHash,
    });
    await newUser.save();
    res.status(200).send({ message: 'Register Success!' });
  } catch (err) {
    return handleError(req, res, {});
  }
};
