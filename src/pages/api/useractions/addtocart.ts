/* eslint-disable @typescript-eslint/no-use-before-define */
import type { NextApiRequest, NextApiResponse } from 'next';

import connectDB from '../../../configs/database';
import User from '../../../models/userModel';
import Product from '../../../models/productModel';
import { handleError } from '../../../helpers';
import { Cart } from '../../../configs/type';

type Data = {
  message: string;
};

type ResponseData = {
  message: string;
  cart: Cart[];
};
export default async function isAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data | ResponseData>,
) {
  await connectDB();
  switch (req.method) {
    case 'POST':
      return addToCart(req, res);
    default:
      return handleError(req, res, {});
  }
}

const addToCart = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | ResponseData>,
) => {
  try {
    if (req.headers.isauth === '0') {
      return handleError(req, res, { code: 401, message: 'unAuthorized' });
    }
    const { id, quantity } = req.body;

    const [user, product] = await Promise.all([
      User.findOne({ _id: req.headers._id }),
      Product.findOne({
        _id: id,
        inStock: { $gt: 0 },
      }),
    ]);

    if (user && product) {
      const productInCart = user.cart.find((item: Cart) => item.id === id);
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        user.cart = [
          ...user.cart,
          {
            id: product._id.toString(),
            title: product.title,
            price: product.price,
            quantity,
            img: product.imgs[0].img,
          },
        ];
      }
      await user.save();
    } else {
      return handleError(req, res, {
        code: 500,
        message: 'something went wrong',
      });
    }
    return res.status(200).send({ message: 'ok', cart: user.cart });
  } catch (err) {
    return handleError(req, res, {});
  }
};
