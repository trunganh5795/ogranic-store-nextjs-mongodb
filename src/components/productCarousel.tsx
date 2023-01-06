import React from 'react';
import Slider from 'react-slick';
import { CATEGORIES } from '../configs/constants';
import CategoryCard from './categoryCard';
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  // autoplay: true,
};
export default function ProductCarousel() {
  return (
    <div className="categories__slider owl-carousel">
      <Slider {...settings}>
        {CATEGORIES.map((item, index) => (
          <CategoryCard {...item} key={index} />
        ))}
      </Slider>
    </div>
  );
}
