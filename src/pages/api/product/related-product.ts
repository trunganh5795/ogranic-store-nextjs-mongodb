import { ProductCardType } from './../../../configs/type';
import Product from '../../../models/productModel';
import type { NextApiRequest, NextApiResponse } from 'next';

import { handleError } from '../../../helpers';
import connectDB from '../../../configs/database';
type Data = {
  message: string;
  data?: ProductCardType[];
};
type param = {
  currentProduct: string;
};
export const getRelatedProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  let { currentProduct } = req.query as param;
  let data: ProductCardType[] = await Product.find(
    { $text: { $search: currentProduct } },
    { score: { $meta: 'searchScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .skip(1)
    .limit(4);
  return res.status(200).send({ message: 'ok', data });
};

export default async function isAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB();
  switch (req.method) {
    case 'GET':
      await getRelatedProducts(req, res);
      break;
    default:
      return handleError(req, res, {});
  }
}
