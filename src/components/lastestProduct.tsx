import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan, faLessThan } from '@fortawesome/free-solid-svg-icons';
import { LastestProductProp, ProductCardType } from '../configs/type';
import { formatProductPrice } from '../helpers';
import Link from 'next/link';
const settings = {
  className: 'center',
  arrows: false,
  infinite: true,
  centerPadding: '60px',
  slidesToShow: 1,
  speed: 500,
  rows: 1,
};
export interface TopProduct {
  items: ProductCardType[];
  header: string;
}
export default function TopProducts({ items, header }: TopProduct) {
  let slideRef = useRef<HTMLDivElement>(null);
  useEffect(() => {});
  return (
    <div className="latest-product__text">
      <div className="row">
        <h4 className="col-7">{header}</h4>
        <div className="col-5">
          <button
            onClick={() => {
              if (slideRef.current) {
                slideRef.current.slickPrev();
              }
            }}>
            <FontAwesomeIcon icon={faLessThan} />
          </button>
          <button
            onClick={() => {
              if (slideRef.current) {
                slideRef.current.slickNext();
              }
            }}>
            <FontAwesomeIcon icon={faGreaterThan} />
          </button>
        </div>
      </div>
      <div className="latest-product__slider owl-carousel">
        <Slider {...settings} ref={slideRef}>
          <div className="latest-prdouct__slider__item">
            {items.slice(0, 3).map((item, index) => (
              <Link
                href={`/product/${item._id}`}
                className="latest-product__item"
                key={item._id}>
                <div className="latest-product__item__pic">
                  <img src={item.imgs[0].img} alt="logo" />
                </div>
                <div className="latest-product__item__text">
                  <h6>{item.title}</h6>
                  <span>{formatProductPrice(item.price)}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="latest-prdouct__slider__item">
            {items.slice(3, 6).map((item, index) => (
              <Link
                href={`/product/${item._id}`}
                className="latest-product__item"
                key={item._id}>
                <div className="latest-product__item__pic">
                  <img src={item.imgs[0].img} alt="logo" />
                </div>
                <div className="latest-product__item__text">
                  <h6>{item.title}</h6>
                  <span>{formatProductPrice(item.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </Slider>
      </div>
    </div>
  );
}
