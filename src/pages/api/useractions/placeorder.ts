import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../configs/database';
import User from '../../../models/userModel';
import Product from '../../../models/productModel';
import Order from '../../../models/orderModel';
import { handleError } from '../../../helpers';
import { Address, Cart } from '../../../configs/type';

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
      await placeOrder(req, res);
      break;
    default:
      return handleError(req, res, {});
  }
}

const placeOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req.headers.isauth === '0') {
      return handleError(req, res, { code: 401, message: 'unAuthorized' });
    }
    const { address } = req.body as Omit<Address, 'defaultAdd'> & {
      defaultAdd?: boolean;
    };
    const user = await User.findOne({ _id: req.headers._id });
    if (user) {
      // decrease product quantity
      const bulkOps = user.cart.map((item: Cart) => ({
        updateOne: {
          filter: { _id: item.id, $gte: { inStock: 1 } },
          update: { $inc: { quanity: -item.quantity, sold: +item.quantity } },
        },
      }));
      await Promise.all([
        Product.bulkWrite(bulkOps, {}),
        user.update({ cart: [] }),
        Order.create({
          userId: user._id.toString(),
          shippingFee: 15000, // fixed price
          address,
          products: user.cart,
        }),
      ]);
      return res.status(200).send({ message: 'ok' });
    }
    handleError(req, res, { code: 404, message: 'user not found' });
  } catch (err) {
    console.log(err);
    return handleError(req, res, {});
  }
};
