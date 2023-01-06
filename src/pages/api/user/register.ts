import connectDB from '../../../configs/database';
import User from '../../../models/userModel';
import type { NextApiRequest, NextApiResponse } from 'next';
import validator from 'validator';
import bcrypt from 'bcrypt';
import { handleError } from '../../../helpers';
import { saltRounds } from '../../../configs/constants';
connectDB();
type Data = {
  message: string;
};
export default async function registerAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      await register(req, res);
      break;
    default:
      return handleError(req, res, {});
  }
}

const register = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { name, email, password } = req.body;
    console.log('HHHHH');
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
