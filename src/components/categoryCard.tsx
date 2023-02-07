import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import { CategoryType, LOCALES } from '../configs/type';
import { useTrans } from '../hooks/useTrans';

export default function CategoryCard({ title, link, img }: CategoryType) {
  const router = useRouter();
  const trans = useTrans(router.locale as LOCALES);
  return (
    <div className="px-3">
      <div className="categories__item set-bg">
        <Image src={img} fill alt="categories" />
        <h5>
          <h1>as1asad</h1>
          <Link href={link}>{title}</Link>
        </h5>
      </div>
    </div>
  );
}
