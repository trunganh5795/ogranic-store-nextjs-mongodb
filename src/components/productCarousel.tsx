import React from 'react';
import Slider, { Settings } from 'react-slick';

export default function ProductCarousel({
  settings,
  children,
}: React.PropsWithChildren<{ settings: Settings }>) {
  return (
    <div className="categories__slider owl-carousel">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
}
