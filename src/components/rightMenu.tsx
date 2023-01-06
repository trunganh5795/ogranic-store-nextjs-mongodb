import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineDown } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function RightMenu() {
  const ulRef = useRef<HTMLUListElement>(null);
  const { asPath } = useRouter();
  const [isShow, setIsShow] = useState(asPath === '/' ? true : false);
  useEffect(() => {
    setIsShow(asPath === '/' ? true : false);
    return () => {};
  }, [asPath]);

  return (
    <div className="hero__categories">
      <div className="hero__categories__all">
        <i>
          <FontAwesomeIcon icon={faBars} />
        </i>
        <span>All departments</span>
        <button
          onClick={() => {
            setIsShow((prev) => !prev);
          }}>
          <AiOutlineDown className={isShow ? '' : 'spin'} />
        </button>
      </div>
      <ul ref={ulRef} className={isShow ? '' : 'hide__menu'}>
        <li>
          <Link href="#">Fresh Fruit</Link>
        </li>
        <li>
          <Link href="#">Fresh meat</Link>
        </li>
        <li>
          <Link href="#">Seafood</Link>
        </li>
        <li>
          <Link href="#">Vegetable</Link>
        </li>
        <li>
          <Link href="#">Vegetable</Link>
        </li>
        <li>
          <Link href="#">Spice</Link>
        </li>
        <li>
          <Link href="#">Processed Food </Link>
        </li>
        <li>
          <Link href="#">Fresh Milk</Link>
        </li>
        <li>
          <Link href="#">Soft Drinks</Link>
        </li>
        <li>
          <Link href="#">Fast Food</Link>
        </li>
        <li>
          <Link href="#">Dry food</Link>
        </li>
      </ul>
    </div>
  );
}
