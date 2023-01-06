import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, Fragment } from 'react';
import Footer from '../components/footer';
import HeaderComponent from '../components/header';
import RightMenu from '../components/rightMenu';
import { useRouter } from 'next/router';
export default function ClientTemplate(props: any) {
  const { asPath } = useRouter();
  useEffect(() => {
    console.log(asPath);

    return () => {};
  }, []);
  return (
    <Fragment>
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
                  <form action="#">
                    <div className="hero__search__categories">
                      All Categories
                      <span className="arrow_carrot-down" />
                    </div>
                    <input type="text" placeholder="What do you need?" />
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
                    <h5>+65 11.188.888</h5>
                    <span>support 24/7 time</span>
                  </div>
                </div>
              </div>
              {asPath === '/' ? (
                <div className="hero__item set-bg">
                  <div className="hero__text">
                    <span>FRUIT FRESH</span>
                    <h2>
                      Vegetable <br />
                      100% Organic
                    </h2>
                    <p>Free Pickup and Delivery Available</p>
                    <a href="#" className="primary-btn">
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
      {props.children}
      <Footer />
    </Fragment>
  );
}
