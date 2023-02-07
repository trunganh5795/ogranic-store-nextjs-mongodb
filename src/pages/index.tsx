import Head from 'next/head';
import { Inter } from '@next/font/google';
import { useRouter } from 'next/router';

import '../styles/Home.module.scss';
import ProductCard from '../components/productCard';
import { LOCALES, ProductCardType } from '../configs/type';
import ProductCarousel from '../components/productCarousel';
import HomeBanner from '../components/homeBanner';
import TopProducts from '../components/lastestProduct';
import ClientTemplate from '../templates/clientTemplate';
import connectDB from '../configs/database';
import {
  getLatestProducts,
  getProductHomePage,
  getTopRatedProduct,
  getTopReviewProducts,
} from '../controllers/server/product.controllers';
import { CATEGORIES, ProductCarouselSetting } from '../configs/constants';
import CategoryCard from '../components/categoryCard';
import { useTrans } from '../hooks/useTrans';

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
  const router = useRouter();
  const trans = useTrans(router.locale as LOCALES);

  return (
    <>
      <Head>
        <title>Oganic Store</title>
      </Head>
      <section className="categories">
        <div className="container">
          <div className="row">
            <ProductCarousel settings={ProductCarouselSetting}>
              {CATEGORIES.map((item, index) => {
                const titleTrans = trans!.home.menu[item.i18nKey];
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <CategoryCard {...item} title={titleTrans} key={index} />
                );
              })}
            </ProductCarousel>
          </div>
        </div>
      </section>
      <section className="featured spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>{trans?.home['featured-product']}</h2>
              </div>
              <div className="featured__controls">
                <ul>
                  <li className="active" data-filter="*">
                    {trans?.home.all}
                  </li>
                  <li data-filter=".oranges">
                    {trans?.home.menu['fresh-fruit']}
                  </li>
                  <li data-filter=".fresh-meat">
                    {trans?.home.menu['fresh-meat']}
                  </li>
                  <li data-filter=".vegetables">
                    {trans?.home.menu.vegetable}
                  </li>
                  <li data-filter=".fastfood">
                    {trans?.home.menu['fast-food']}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row featured__filter">
            {products.map((item: ProductCardType, index: number) => (
              <div
                className="col-lg-3 col-md-4 col-sm-6 mix oranges fresh-meat"
                // eslint-disable-next-line no-underscore-dangle
                key={item._id}>
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
            <div className="col-lg-4 col-md-6">
              <TopProducts
                items={latestProducts}
                header={trans!.home['latest-products']}
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <TopProducts
                items={topRatedProducts}
                header={trans!.home['top-rated']}
              />
            </div>
            <div className="col-lg-4 col-md-6">
              <TopProducts
                items={topReviewProducts}
                header={trans!.home['top-review']}
              />
            </div>
          </div>
        </div>
      </section>
      {/* LastestProduct */}
    </>
  );
}
Home.getLayout = (page: React.ReactElement) => (
  <ClientTemplate>{page}</ClientTemplate>
);

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
