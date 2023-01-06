import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CategoryType } from '../configs/type';

export default function CategoryCard({ title, link, img }: CategoryType) {
  return (
    // <div className="col-lg-3">
    <div className="px-3">
      <div className="categories__item set-bg">
        <Image src={img} fill={true} alt="categories" />
        <h5>
          <Link href={link}>{title}</Link>
        </h5>
      </div>
    </div>
    // </div>
  );
}
