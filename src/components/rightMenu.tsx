import React, { useRef, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AiOutlineDown } from 'react-icons/ai';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { ALL_DEPARTMENTS } from '../configs/constants';
import { useTrans } from '../hooks/useTrans';
import { LOCALES } from '../configs/type';

export default function RightMenu() {
  const ulRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const trans = useTrans(router.locale as LOCALES);
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
        <span>{trans?.home.menu.title}</span>
        <button
          onClick={() => {
            setIsShow((prev) => !prev);
          }}>
          <AiOutlineDown className={isShow ? '' : 'spin'} />
        </button>
      </div>
      <ul ref={ulRef} className={isShow ? '' : 'hide__menu'}>
        {ALL_DEPARTMENTS.map((item) => (
          <li key={item.i18nKey}>
            <Link href={{ pathname: item.pathname, query: item.query }}>
              {trans?.home.menu[item.i18nKey]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
