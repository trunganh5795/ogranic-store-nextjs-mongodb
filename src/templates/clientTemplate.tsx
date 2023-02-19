import React, { useState, useCallback, ReactNode } from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Footer from '../components/footer';
import HeaderComponent from '../components/header';
import RightMenu from '../components/rightMenu';
import { useTrans } from '../hooks/useTrans';
import { LOCALES } from '../configs/type';

export default function ClientTemplate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const trans = useTrans(router.locale as LOCALES);
  const [searchInput, setSearchInput] = useState<string>('');
  const handleSearch = useCallback(() => {
    if (searchInput) router.push(`/search?query=${searchInput}&page=1`);
  }, [searchInput, router]);
  // useEffect(() => {
  //   return () => {};
  // }, []);
  return (
    <>
      <section className="hero hero-normal">
        <HeaderComponent />
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <RightMenu />
            </div>
            <div className="col-lg-9">
              <div className="hero__search">
                <div className="hero__search__form">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      console.log('object:', searchInput);
                      handleSearch();
                    }}>
                    <div className="hero__search__categories">
                      {trans?.home.menu.title}
                      <span className="arrow_carrot-down" />
                    </div>
                    <input
                      type="text"
                      placeholder="What do you need?"
                      onChange={(e) => {
                        setSearchInput(e.target.value);
                      }}
                    />
                    <button type="submit" className="site-btn">
                      {trans?.button.search}
                    </button>
                  </form>
                </div>
                <div className="hero__search__phone">
                  <div className="hero__search__phone__icon">
                    <i>
                      <FontAwesomeIcon icon={faPhone} />
                    </i>
                  </div>
                  <div className="hero__search__phone__text">
                    <h5>+84 99.688.888</h5>
                    <span>{trans?.navbar.support}</span>
                  </div>
                </div>
              </div>
              {router.asPath === '/' ? (
                <div className="hero__item set-bg">
                  <div className="hero__text">
                    <span>{trans?.home.menu['fresh-fruit']}</span>
                    <h2>
                      {trans?.home.menu.vegetable} <br />
                      100% {trans?.home.organic}
                    </h2>
                    <p>{trans?.home.slogan}</p>
                    <Link href="/" className="primary-btn">
                      {trans?.button['shop-now']}
                    </Link>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </section>
      {children}
      <Footer />
    </>
  );
}
