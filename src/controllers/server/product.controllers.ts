import connectDB from '../../configs/database';
import Product from '../../models/productModel';

export const getProductHomePage = async () => {
  const products = await Product.find().limit(12);
  return products;
};
export const getTopRatedProduct = async () => {
  const products = await Product.find()
    .sort({ rate: 1, numOfRate: 1 })
    .limit(6);
  return products;
};
export const getLatestProducts = async () => {
  const products = await Product.find().sort({ $natural: -1 }).limit(6);
  return products;
};
// nhiều bình luận nhất
export const getTopReviewProducts = async () => {
  const products = await Product.aggregate([
    {
      $project: {
        _id: 1,
        title: 1,
        imgs: 1,
        price: 1,
        unit: 1,
        discount: 1,
        length: { $size: '$comments' },
      },
    },
    { $sort: { length: -1 } },
    { $limit: 6 },
  ]);
  return products;
};

export const getProductDetail = async (id: string) => {
  await connectDB();
  const product = await Product.findOne({ _id: id });
  return product;
};
