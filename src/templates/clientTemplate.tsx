import React, {
  useEffect,
  Fragment,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

import Footer from '../components/footer';
import HeaderComponent from '../components/header';
import RightMenu from '../components/rightMenu';

export default function ClientTemplate({ children }: { children: ReactNode }) {
  const router = useRouter();
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
                      All Categories
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
                      SEARCH
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
                    <span>support 24/7 time</span>
                  </div>
                </div>
              </div>
              {router.asPath === '/' ? (
                <div className="hero__item set-bg">
                  <div className="hero__text">
                    <span>FRUIT FRESH</span>
                    <h2>
                      Vegetable <br />
                      100% Organic
                    </h2>
                    <p>Free Pickup and Delivery Available</p>
                    <a href="/" className="primary-btn">
                      SHOP NOW
                    </a>
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
