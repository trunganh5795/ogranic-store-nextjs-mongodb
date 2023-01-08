/* eslint-disable @next/next/no-img-element */
import { useContext, useEffect, useState } from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
} from 'react-icons/fa';
import { BsSuitHeartFill } from 'react-icons/bs';
import Slider from 'react-slick';
import Image from 'next/image';
import ProductCard from '../../components/productCard';
import { ParsedUrlQuery } from 'querystring';
import { ProductCardType } from '../../configs/type';
import ClientTemplate from '../../templates/clientTemplate';
import { formatProductPrice } from '../../helpers/index';
import { GetServerSideProps } from 'next';
import { getProductDetail } from '../../controllers/server/product.controllers';
import { getRelatedProduct } from '../../controllers/product.controllers';
import { addToCart } from '../../controllers/user.controllers';
import { UserContent, UserContext } from '../_app';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { ProductDetailsNavTabs } from '../../configs/constants';
const fakeProductList: ProductCardType[] = [
  {
    title: 'Product1',
    price: 30,
    img: 'https://picsum.photos/200/200',
  },
  {
    title: 'Product2',
    price: 30,
    img: 'https://picsum.photos/200/200',
  },
  {
    title: 'Product3',
    price: 30,
    img: 'https://picsum.photos/200/200',
  },
  {
    title: 'Product4',
    price: 30,
    img: 'https://picsum.photos/200/200',
  },
  {
    title: 'Product5',
    price: 30,
    img: 'https://picsum.photos/200/200',
  },
];
fakeProductList.length = 4;
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
interface imgageObject {
  id: string;
  img: string;
}
interface Props {
  product: ProductCardType;
}
export default function ProductDetails({ product }: Props) {
  const [relatedProduct, setRelatedProduct] = useState<ProductCardType[]>([]);
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const { setUserState } = useContext(UserContext);
  const handleAddtoCart = async (id: string) => {
    try {
      let { data } = await addToCart(id, quantity);

      setUserState((prev: UserContent) => ({
        ...prev,
        cart: data.cart,
      }));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let isSubscribe = true;
    const getRelatedProducts = async () => {
      let data = await getRelatedProduct(product.title);
      setRelatedProduct(data.data.data);
    };
    getRelatedProducts();
    setQuantity(1);
    return () => {
      isSubscribe = false;
    };
  }, [product._id]);

  return (
    <>
      <section className="product-details spad">
        <ToastContainer className="p-5" position={'top-center'}>
          <Toast show={isShowMessage}>
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
                      {product.imgs.map((item: imgageObject, index: number) => (
                        <div className="col-3 position-relative" key={index}>
                          <img src={item.img} alt="product-img" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Slider {...settings}>
                      {product.imgs.map((item: imgageObject, index: number) => (
                        <div className="owl-item" key={index}>
                          <img src={item.img} alt="product-img" />
                        </div>
                      ))}
                    </Slider>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="product__details__text">
                <h3>{product.title}</h3>
                <div className="product__details__rating">
                  {/* <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star" />
                  <i className="fa fa-star-half-o" /> */}
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
                        className="qtybtn"
                        onClick={() => {
                          if (quantity <= 1) return;
                          setQuantity(quantity - 1);
                        }}>
                        -
                      </span>
                      <input
                        type="number"
                        value={quantity}
                        min={1}
                        onChange={() => {
                          setQuantity(quantity + 1);
                        }}
                      />
                      <span
                        className="qtybtn"
                        onClick={() => {
                          setQuantity(quantity + 1);
                        }}>
                        +
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  className="primary-btn"
                  onClick={() => {
                    handleAddtoCart(product._id);
                  }}>
                  ADD TO CARD
                </button>
                <a href="#" className="heart-icon">
                  {/* <span className="icon_heart_alt" /> */}
                  <BsSuitHeartFill />
                </a>
                <ul>
                  <li>
                    <b>Availability</b>
                    <span>{product.inStock} In Stock</span>
                  </li>
                  <li>
                    <b>Shipping</b>
                    <span>
                      01 day shipping. <samp>Free pickup today</samp>
                    </span>
                  </li>
                  <li>
                    <b>Unit</b>
                    <span>{product.unit}</span>
                  </li>
                  <li>
                    <b>Share on</b>
                    <div className="share">
                      <a href="#">
                        <FaFacebookF />
                      </a>
                      <a href="#">
                        <FaTwitter />
                      </a>
                      <a href="#">
                        <FaInstagram />
                      </a>
                      <a href="#">
                        <FaPinterestP />
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product__details__tab">
                <ul className="nav nav-tabs" role="tablist">
                  {ProductDetailsNavTabs.map((item, index) => (
                    <li className="nav-item" key={index}>
                      <button
                        onClick={() => {
                          setActiveKey(index);
                        }}
                        className={`nav-link ${
                          activeKey === index ? 'active' : ''
                        }`}
                        data-toggle="tab"
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
                    className={`tab-pane ${activeKey === 0 ? 'active' : ''}`}
                    id="tabs-1"
                    role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Description</h6>
                      <p>
                        {product.description
                          ? product.description
                          : `We're updating`}
                      </p>
                    </div>
                  </div>
                  <div
                    className={`tab-pane ${activeKey === 1 ? 'active' : ''}`}
                    id="tabs-2"
                    role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>We&apos;re updating</p>
                    </div>
                  </div>
                  <div
                    className={`tab-pane ${activeKey === 2 ? 'active' : ''}`}
                    id="tabs-3"
                    role="tabpanel">
                    <div className="product__details__tab__desc">
                      <h6>Products Infomation</h6>
                      <p>We&apos;re updating</p>
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
                <h2>Related Product</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {relatedProduct.map((item, index) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
ProductDetails.getLayout = (page: React.ReactElement) => {
  return <ClientTemplate>{page}</ClientTemplate>;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  let { id } = params as Params;
  let product = await getProductDetail(id);
  product = JSON.parse(JSON.stringify(product));
  return {
    props: {
      product,
    }, // will be passed to the page component as props
  };
};

/////////////////
export const config = {
  runtime: 'nodejs',
};

interface Params extends ParsedUrlQuery {
  id: string;
}
