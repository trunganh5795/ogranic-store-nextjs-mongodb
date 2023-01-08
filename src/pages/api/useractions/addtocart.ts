import connectDB from '../../../configs/database';
import User from '../../../models/userModel';
import Product from '../../../models/productModel';
import type { NextApiRequest, NextApiResponse } from 'next';

import { handleError } from '../../../helpers';

type Data = {
  message: string;
};

type ResponseData = {
  message: string;
  cart: any[];
};
export default async function isAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data | ResponseData>
) {
  await connectDB();
  switch (req.method) {
    case 'POST':
      await addToCart(req, res);
      break;
    default:
      return handleError(req, res, {});
  }
}

const addToCart = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | ResponseData>
) => {
  try {
    if (req.headers.isauth === '0') {
      return handleError(req, res, { code: 401, message: 'unAuthorized' });
    }
    const { id, quantity } = req.body;

    let [user, product] = await Promise.all([
      User.findOne({ _id: req.headers._id }),
      Product.findOne({
        _id: id,
        inStock: { $gt: 0 },
      }),
    ]);

    if (user && product) {
      let productInCart = user.cart.find((item: any) => item.id === id);
      console.log('object', id, quantity, productInCart);
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        user.cart = [
          ...user.cart,
          {
            id: product._id.toString(),
            title: product.title,
            price: product.price,
            quantity: quantity,
            img: product.imgs[0],
          },
        ];
      }
      console.log('first:', user.cart);
      await user.save();
    } else {
      handleError(req, res, { code: 500, message: 'something went wrong' });
    }
    return res.status(200).send({ message: 'ok', cart: user.cart });
  } catch (err) {
    return handleError(req, res, {});
  }
};
