import type { NextApiRequest, NextApiResponse } from 'next';

import Product from '../../../models/productModel';
import { handleError } from '../../../helpers';
import connectDB from '../../../configs/database';
import { Product as ProductType, ResponseMessage } from '../../../configs/type';

type Param = {
  currentProduct: string;
  test: string[];
};
export const getRelatedProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseMessage<ProductType[]>>,
) => {
  const { currentProduct } = req.query as Param;
  const data: ProductType[] = await Product.find(
    { $text: { $search: currentProduct } },
    { score: { $meta: 'searchScore' } },
  )
    .sort({ score: { $meta: 'textScore' } })
    .skip(1)
    .limit(4);
  return res.status(200).send({ message: 'ok', data });
};

// eslint-disable-next-line consistent-return
export default async function isAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMessage<ProductType[]>>,
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
