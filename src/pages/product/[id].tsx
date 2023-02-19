import { useContext, useEffect, useState } from 'react';
import { BsSuitHeartFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from 'react-icons/fa';
import Slider from 'react-slick';
import Image from 'next/image';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Link from 'next/link';

import { UserContext } from '../_app';
import ProductCard from '../../components/productCard';
import {
  Cart,
  LOCALES,
  Product,
  ProductCardType,
  ProductImgs,
} from '../../configs/type';
import ClientTemplate from '../../templates/clientTemplate';
import { formatProductPrice } from '../../helpers/index';
import { getProductDetail } from '../../controllers/server/product.controllers';
import { getRelatedProduct } from '../../controllers/product.controllers';
import { addToCart } from '../../controllers/user.controllers';
import { ProductDetailsNavTabs } from '../../configs/constants';
import { useTrans } from '../../hooks/useTrans';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  // slidesToScroll: 1,
  arrows: false,
  // autoplay: true,
  swipeToSlide: true,
};

export default function ProductDetails({
  product,
}: {
  product: Product | undefined;
}) {
  const [relatedProduct, setRelatedProduct] = useState<ProductCardType[]>([]);
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const router = useRouter();
  const trans = useTrans(router.locale as LOCALES);
  const userState = useContext(UserContext);

  const handleAddtoCart = async (id: string) => {
    try {
      const { data } = await addToCart(id, quantity);
      const { setUserState } = userState;

      setUserState({
        ...userState,
        cart: data.cart as Cart[],
      });
    } catch (error) {
      console.log(error);
    }
  };
  const changeQuantityByOne = (action: 'inc' | 'dec') => {
    switch (action) {
      case 'inc':
        setQuantity(quantity + 1);
        break;
      case 'dec':
        if (quantity <= 1) return;
        setQuantity(quantity - 1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let isSubscribe = true;
    if (product) {
      const getRelatedProducts = async () => {
        const data = await getRelatedProduct(product.title);
        if (isSubscribe) setRelatedProduct(data.data.data);
      };
      getRelatedProducts();
      setQuantity(1);
    }
    return () => {
      isSubscribe = false;
    };
  }, [product]);

  return (
    <div>
      {!product ? (
        <>{router.push('/notfound')}</>
      ) : (
        <div>
          <section className="product-details spad">
            <ToastContainer className="p-5" position="top-center">
              <Toast
                show={isShowMessage}
                autohide
                onClose={() => setIsShowMessage(false)}
                delay={3000}>
                <div className="alert alert-success mb-0" role="alert">
                  This product successfully added to cart
                </div>
              </Toast>
            </ToastContainer>
            <div className="container">
              <div className="row">
                <div className="col-lg-6 col-md-6">
                  <div className="product__details__pic">
                    <div className="product__details__pic__item">
                      <Image
                        className="product__details__pic__item--large"
                        src={product.imgs[0].img}
                        alt="product-img"
                        width="0"
                        height="0"
                        sizes="100vw"
                      />
                    </div>
                    <div className="product__details__pic__slider owl-carousel">
                      {product.imgs.length <= 4 ? (
                        <div className="row">
                          {product.imgs.map(
                            (item: ProductImgs, index: number) => (
                              <div
                                className="col-3 position-relative"
                                key={item.img}>
                                <img src={item.img} alt="product-img" />
                              </div>
                            ),
                          )}
                        </div>
                      ) : (
                        <Slider {...settings}>
                          {product.imgs.map(
                            (item: ProductImgs, index: number) => (
                              <div className="owl-item" key={item.img}>
                                <img src={item.img} alt="product-img" />
                              </div>
                            ),
                          )}
                        </Slider>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6">
                  <div className="product__details__text">
                    <h3>{product.title}</h3>
                    <div className="product__details__rating">
                      <span> ({product.comments.length} reviews)</span>
                    </div>
                    <div className="product__details__price">
                      {formatProductPrice(product.price)}
                    </div>
                    <p>{product.description}</p>
                    <div className="product__details__quantity">
                      <div className="quantity">
                        <div className="pro-qty">
                          <span
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                changeQuantityByOne('dec');
                              }
                            }}
                            className="qtybtn"
                            onClick={() => {
                              changeQuantityByOne('dec');
                            }}>
                            -
                          </span>
                          <input
                            type="number"
                            value={quantity}
                            min={1}
                            onChange={(e) => {
                              setQuantity(parseInt(e.target.value, 10));
                            }}
                          />
                          <span
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                changeQuantityByOne('inc');
                              }
                            }}
                            className="qtybtn"
                            onClick={() => {
                              changeQuantityByOne('inc');
                            }}>
                            +
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => {
                        handleAddtoCart(product._id);
                        setIsShowMessage(true);
                      }}>
                      {trans?.button.addToCart}
                    </button>
                    <button type="button" className="heart-icon">
                      <BsSuitHeartFill />
                    </button>
                    <ul>
                      <li>
                        <b className="text-capitalize">
                          {trans?.detail.availability}
                        </b>
                        <span>{`${product.inStock} ${product.unit}`}</span>
                      </li>
                      <li>
                        <b>{trans?.detail.shipping}</b>
                        <span>{formatProductPrice(15000)}</span>
                      </li>
                      <li>
                        <b>{trans?.detail.unit}</b>
                        <span>{product.unit}</span>
                      </li>
                      <li>
                        <b>{trans?.detail['share-on']}</b>
                        <div className="share">
                          <Link href="/">
                            <FaFacebookF />
                          </Link>
                          <Link href="/">
                            <FaTwitter />
                          </Link>
                          <Link href="/">
                            <FaInstagram />
                          </Link>
                          <Link href="/">
                            <FaPinterestP />
                          </Link>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="product__details__tab">
                    <ul className="nav nav-tabs" role="tablist">
                      {ProductDetailsNavTabs.map((item, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <li className="nav-item" key={index}>
                          <button
                            type="button"
                            onClick={() => {
                              setActiveKey(index);
                            }}
                            className={`nav-link ${
                              activeKey === index ? 'active' : ''
                            }`}
                            role="tab"
                            aria-selected="true">
                            {item.title}{' '}
                            {item.title === 'Reviews' ? (
                              <span>({product.comments.length})</span>
                            ) : (
                              ''
                            )}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <div className="tab-content">
                      <div
                        className={`tab-pane ${
                          activeKey === 0 ? 'active' : ''
                        }`}
                        id="tabs-1"
                        role="tabpanel">
                        <div className="product__details__tab__desc">
                          <h6>{trans?.detail['products-description']}</h6>
                          <p>
                            {product.description
                              ? product.description
                              : trans?.detail.updating}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`tab-pane ${
                          activeKey === 1 ? 'active' : ''
                        }`}
                        id="tabs-2"
                        role="tabpanel">
                        <div className="product__details__tab__desc">
                          <h6>{trans?.detail['products-infomation']}</h6>
                          <p>{trans?.detail.updating}</p>
                        </div>
                      </div>
                      <div
                        className={`tab-pane ${
                          activeKey === 2 ? 'active' : ''
                        }`}
                        id="tabs-3"
                        role="tabpanel">
                        <div className="product__details__tab__desc">
                          <h6>{trans?.detail['products-review']}</h6>
                          <p>{trans?.detail.updating}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Related Product */}
          <section className="related-product">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-title related__product__title">
                    <h2>{trans?.detail['related-product']}</h2>
                  </div>
                </div>
              </div>
              <div className="row">
                {relatedProduct.map((item, index) => (
                  <div className="col-lg-3 col-md-4 col-sm-6" key={item._id}>
                    <ProductCard {...item} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

ProductDetails.getLayout = (page: React.ReactElement) => (
  <ClientTemplate>{page}</ClientTemplate>
);

export const getStaticProps: GetStaticProps = async (context) => {
  // res.setHeader('Cache-Control', 'max-age=3600');
  let product = {};
  if (context.params) {
    const id = context.params.id as string;
    product = await getProductDetail(id);
    product = JSON.parse(JSON.stringify(product));
  }
  return {
    props: {
      product,
    }, // will be passed to the page component as props
    revalidate: 60,
  };
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '63b41c0376ae48b1ddff4c96' } }],
    fallback: true,
  };
}
/// //////////////
export const config = {
  runtime: 'nodejs',
};
