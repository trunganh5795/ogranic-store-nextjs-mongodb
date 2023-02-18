/* eslint-disable @typescript-eslint/no-use-before-define */
import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../configs/database';
import User from '../../../models/userModel';
import { handleError } from '../../../helpers';

type Data = {
  message: string;
};

interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  postcode: number;
  defaultAdd: boolean;
}
interface AddressResponse {
  addList: Address[];
}
export default async function isAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data | (AddressResponse & Data)>,
) {
  await connectDB();
  switch (req.method) {
    case 'POST':
      return addNewAddress(req, res);
    default:
      return handleError(req, res, {});
  }
}

const addNewAddress = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | (AddressResponse & Data)>,
) => {
  try {
    if (req.headers.isauth === '0') {
      return handleError(req, res, { code: 401, message: 'unAuthorized' });
    }
    let { defaultAdd } = req.body as Address;
    const { name, address, city, state, postcode, phone } = req.body as Address;
    const userId = req.headers._id;
    const user = await User.findOne({ _id: userId });

    if (user.address?.length < 5) {
      if (user.address.length === 0) {
        defaultAdd = true;
      } else if (defaultAdd) {
        const defaultAddress = user.address.find(
          (item: Address) => item.defaultAdd === true,
        );
        if (defaultAddress) {
          defaultAddress.defaultAdd = false;
        }
      }
      user.address = [
        ...user.address,
        {
          name,
          address,
          city,
          state,
          phone,
          postcode,
          defaultAdd,
        },
      ];

      await user.save();
      return res
        .status(200)
        .send({ message: 'OK', addList: user.address as Address[] });
    }

    return handleError(req, res, {
      code: 400,
      message: 'The maximum number of addresses has been reached',
    });
  } catch (err) {
    return handleError(req, res, {});
  }
};
