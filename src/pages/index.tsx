import Head from "next/head";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.scss";
import ProductCard from "../components/productCard";
import { ProductCardType } from "../configs/type";
import ProductCarousel from "../components/productCarousel";
import HomeBanner from "../components/homeBanner";
import TopProducts from "../components/lastestProduct";

import ClientTemplate from "../templates/clientTemplate";
import connectDB from "../configs/database";

import {
  getLatestProducts,
  getProductHomePage,
  getTopRatedProduct,
  getTopReviewProducts,
} from "../controllers/server/product.controllers";

const inter = Inter({ subsets: ["latin"] });
export interface ProductList {
  products: ProductCardType[];
  latestProducts: ProductCardType[];
  topRatedProducts: ProductCardType[];
  topReviewProducts: ProductCardType[];
}
export default function Home({
  products,
  latestProducts,
  topRatedProducts,
  topReviewProducts,
}: ProductList) {
  return (
    <>
      <section className="categories">
        <div className="container">
          <div className="row">
            <ProductCarousel />
          </div>
        </div>
      </section>
      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Featured Product</h2>
              </div>
              <div className="featured__controls">
                <ul>
                  <li className="active" data-filter="*">
                    All
                  </li>
                  <li data-filter=".oranges">Oranges</li>
                  <li data-filter=".fresh-meat">Fresh Meat</li>
                  <li data-filter=".vegetables">Vegetables</li>
                  <li data-filter=".fastfood">Fastfood</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {products.map((item: ProductCardType, index: number) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
                key={index}
              >
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <HomeBanner />
      {/* LastestProduct */}
      <section className="latest-product spad">
        <div className="container">
          <div className="row">
            <TopProducts items={latestProducts} header="Latest Products" />
            <TopProducts items={topRatedProducts} header="Top Rated" />
            <TopProducts items={topReviewProducts} header="Top Review" />
          </div>
        </div>
      </section>
      {/* LastestProduct */}
    </>
  );
}
Home.getLayout = (page: React.ReactElement) => {
  return <ClientTemplate>{page}</ClientTemplate>;
};
export async function getStaticProps() {
  await connectDB();
  let [products, latestProducts, topRatedProducts, topReviewProducts] =
    await Promise.all([
      getProductHomePage(),
      getLatestProducts(),
      getTopRatedProduct(),
      getTopReviewProducts(),
    ]);
  products = JSON.parse(JSON.stringify(products));
  latestProducts = JSON.parse(JSON.stringify(latestProducts));
  topRatedProducts = JSON.parse(JSON.stringify(topRatedProducts));
  topReviewProducts = JSON.parse(JSON.stringify(topReviewProducts));
  return {
    props: {
      products,
      latestProducts,
      topRatedProducts,
      topReviewProducts,
    }, // will be passed to the page component as props
  };
}

// const getLatestProduct = async () => {
//   let products = Product.find().sort({ $natural: -1 }).limit(6);
//   return products;
// };

// const getTopRatedProduct = async () => {
//   let products = Product.find().sort({ rate: 1, numOfRate: 1 }).limit(6);
//   return products;
// };
// //nhiều bình luận nhất
// const getTopReviewProducts = async () => {
//   let products = Product.aggregate([
//     {
//       $project: {
//         _id: 1,
//         title: 1,
//         imgs: 1,
//         price: 1,
//         unit: 1,
//         discount: 1,
//         length: { $size: '$comments' },
//       },
//     },
//     { $sort: { length: -1 } },
//     { $limit: 6 },
//   ]);
//   return products;
// };
