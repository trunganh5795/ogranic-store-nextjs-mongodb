import React from 'react';
import Slider from 'react-slick';

export default function ProductCarousel({
  settings,
  children,
}: React.PropsWithChildren<any>) {
  return (
    <div className="categories__slider owl-carousel">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
