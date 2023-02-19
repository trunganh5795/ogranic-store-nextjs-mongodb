import Image from 'next/image';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faHeart,
  faCartShopping,
  faPowerOff,
} from '@fortawesome/free-solid-svg-icons';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { UserContext } from '../pages/_app';
import { logout } from '../controllers/user.controllers';
import {
  caculateSubTotal,
  caculateTotalCartItem,
  formatProductPrice,
} from '../helpers';
import { useTrans } from '../hooks/useTrans';
import { LOCALES } from '../configs/type';

export default function HeaderComponent() {
  const { isAuth, name, cart, setUserState } = useContext(UserContext);
  const router = useRouter();
  const trans = useTrans(router.locale as LOCALES);

  const subtotal = caculateSubTotal(cart);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
      setUserState({
        isAuth: false,
        cart: [],
        addressList: [],
        name: '',
        img: '',
        setUserState,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="humberger__menu__wrapper">
        <div className="humberger__menu__logo">
          <Link href="/">
            <Image
              src="/assets/img/logo.png"
              alt="logo"
              width={200}
              height={200}
            />
          </Link>
        </div>
        <div className="humberger__menu__cart">
          <ul>
            <li>
              <Link href="/">
                <i className="fa fa-heart" /> <span>1</span>
              </Link>
            </li>
            <li>
              <Link href="/">
                <i className="fa fa-shopping-bag" /> <span>3</span>
              </Link>
            </li>
          </ul>
          <div className="header__cart__price">
            item: <span>$150.00</span>
          </div>
        </div>
        <div className="humberger__menu__widget">
          <div className="header__top__right__language">
            <Image
              src={`/assets/img/language-${router.locale}.png`}
              alt="language"
              width="27"
              height="14"
            />
            {router.locale === 'vi' ? (
              <div>Vietnamese</div>
            ) : (
              <div>English</div>
            )}

            <span className="arrow_carrot-down" />
            <ul>
              <li>
                <Link
                  href={{
                    pathname: router.pathname,
                    query: { ...router.query },
                  }}
                  hrefLang="vn">
                  Vietnamese
                </Link>
              </li>
              <li>
                <Link
                  href={{
                    pathname: router.pathname,
                    query: { ...router.query },
                  }}
                  hrefLang="en">
                  English
                </Link>
              </li>
            </ul>
          </div>
          <div className="header__top__right__auth">
            {isAuth ? (
              <Link href="/">
                <FontAwesomeIcon icon={faUser} /> {name}
              </Link>
            ) : (
              <Link href="/login">
                <FontAwesomeIcon icon={faUser} /> Login
              </Link>
            )}
          </div>
        </div>
        <nav className="humberger__menu__nav mobile-menu">
          <ul>
            <li className="active">
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/">Shop</Link>
            </li>
            <li>
              <Link href="/">Pages</Link>
              <ul className="header__menu__dropdown">
                <li>
                  <Link href="/">Shop Details</Link>
                </li>
                <li>
                  <Link href="/shoppingcart">Shoping Cart</Link>
                </li>
                <li>
                  <Link href="/checkout">Check Out</Link>
                </li>
                <li>
                  <Link href="/">Blog Details</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/">Blog</Link>
            </li>
            <li>
              <Link href="/">Contact</Link>
            </li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap" />
        <div className="header__top__right__social">
          <Link
            href="/"
            style={{ '--color-hover': '#1e90ff' } as React.CSSProperties}>
            <i className="fa fa-facebook" />
          </Link>
          <Link href="/">
            <i className="fa fa-twitter" />
          </Link>
          <Link href="/">
            <i className="fa fa-linkedin" />
          </Link>
          <Link href="/">
            <i className="fa fa-pinterest-p" />
          </Link>
        </div>
        <div className="humberger__menu__contact">
          <ul>
            <li>
              <i className="fa fa-envelope" />
              {trans?.home.header['Welcome to Ogranic']}
            </li>
            <li>Free Shipping for all Order of $99</li>
          </ul>
        </div>
      </div>
      <header className="header">
        <div className="header__top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="header__top__left">
                  <ul>
                    <li>
                      <i className="fa fa-envelope" />{' '}
                      {trans?.home.header['Welcome to Ogranic']}
                    </li>
                    {/* <li>Free Shipping for all Order of $99</li> */}
                    <li>{trans?.home.header.desc}</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__social">
                    <Link
                      href="/"
                      style={
                        { '--color-hover': '#3b5999' } as React.CSSProperties
                      }>
                      <FaFacebookF />
                    </Link>
                    <Link
                      href="/"
                      style={
                        { '--color-hover': '#55acee' } as React.CSSProperties
                      }>
                      <FaTwitter />
                    </Link>
                    <Link
                      href="/"
                      style={
                        { '--color-hover': '#0077b5' } as React.CSSProperties
                      }>
                      <FaLinkedinIn />
                    </Link>
                    <Link
                      href="/"
                      style={
                        { '--color-hover': '#bd081c' } as React.CSSProperties
                      }>
                      <FaPinterestP />
                    </Link>
                  </div>
                  <div className="header__top__right__language">
                    <Image
                      src={`/assets/img/language-${router.locale}.png`}
                      alt="language"
                      width="27"
                      height="14"
                    />
                    {router.locale === 'vi' ? (
                      <div>Vietnamese</div>
                    ) : (
                      <div>English</div>
                    )}
                    <span className="arrow_carrot-down" />
                    <ul>
                      <li>
                        <Link
                          href={{
                            pathname: router.pathname,
                            query: { ...router.query },
                          }}
                          locale="vi">
                          Vietnamese
                        </Link>
                      </li>
                      <li>
                        <Link
                          href={{
                            pathname: router.pathname,
                            query: { ...router.query },
                          }}
                          locale="en">
                          English
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="header__top__right__auth user-nav position-relative">
                    {isAuth ? (
                      <>
                        <Link href="/">
                          <FontAwesomeIcon icon={faUser} className="pe-2" />{' '}
                          {name}
                        </Link>
                        <ul className="header__menu__dropdown">
                          <li>
                            <Link href="/">
                              <FontAwesomeIcon icon={faUser} className="pe-2" />{' '}
                              Account
                            </Link>
                          </li>
                          <li>
                            <Link href="/shoppingcart">
                              <FontAwesomeIcon
                                icon={faCartShopping}
                                className="pe-2"
                              />{' '}
                              My Cart
                            </Link>
                          </li>
                          <li>
                            <button
                              type="button"
                              onClick={() => {
                                handleLogout();
                              }}>
                              <FontAwesomeIcon
                                icon={faPowerOff}
                                className="pe-2"
                              />{' '}
                              Log out
                            </button>
                          </li>
                        </ul>
                      </>
                    ) : (
                      <Link href="/login">
                        <FontAwesomeIcon icon={faUser} /> Login
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="header__logo">
                <Link href="/">
                  <Image
                    src="/assets/img/logo.png"
                    alt="logo"
                    width={120}
                    height={50}
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="header__menu">
                <ul>
                  <li className="active">
                    <Link href="/">{trans?.navbar.home}</Link>
                  </li>
                  <li>
                    <Link href="/">{trans?.navbar.shop}</Link>
                  </li>
                  <li>
                    <Link href="/">{trans?.navbar.pages}</Link>
                    <ul className="header__menu__dropdown">
                      <li>
                        <Link href="/">{trans?.navbar['shop-detail']}</Link>
                      </li>
                      <li>
                        <Link href="/shoppingcart">
                          {trans?.navbar['shopping-cart']}
                        </Link>
                      </li>
                      <li>
                        <Link href="/checkout">{trans?.navbar.checkout}</Link>
                      </li>
                      <li>
                        <Link href="/">{trans?.navbar['blog-detail']}</Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link href="/">{trans?.navbar.blog}</Link>
                  </li>
                  <li>
                    <Link href="/">{trans?.navbar.contact}</Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__cart">
                <ul>
                  <li>
                    <Link href="/shoppingcart">
                      <FontAwesomeIcon icon={faHeart} />
                      {cart?.length === 0 ? (
                        ''
                      ) : (
                        <span>{caculateTotalCartItem(cart)}</span>
                      )}
                    </Link>
                  </li>
                  <li>
                    <Link href="/shoppingcart">
                      <FontAwesomeIcon icon={faCartShopping} />{' '}
                      {cart?.length === 0 ? (
                        ''
                      ) : (
                        <span> {caculateTotalCartItem(cart)}</span>
                      )}
                    </Link>
                  </li>
                </ul>
                <div className="header__cart__price">
                  {trans?.navbar.item}:{' '}
                  <span>{formatProductPrice(subtotal)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="humberger__open">
            <FontAwesomeIcon icon={faUser} />
          </div>
        </div>
      </header>
    </>
  );
}
