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
import { UserContext } from '../pages/_app';
export default function HeaderComponent() {
  const { isAuth, name, img, cart } = useContext(UserContext);
  return (
    <>
      {console.log(isAuth, name, img, cart)}
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
              <Link href="#">
                <i className="fa fa-heart" /> <span>1</span>
              </Link>
            </li>
            <li>
              <Link href="#">
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
            {/* <Image src="img/language.png" alt="logo" /> */}
            <div>English</div>
            <span className="arrow_carrot-down" />
            <ul>
              <li>
                <a href="#">Spanis</a>
              </li>
              <li>
                <a href="#">English</a>
              </li>
            </ul>
          </div>
          <div className="header__top__right__auth">
            {isAuth ? (
              <Link href="#">
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
              <Link href="./shop-grid.html">Shop</Link>
            </li>
            <li>
              <Link href="#">Pages</Link>
              <ul className="header__menu__dropdown">
                <li>
                  <Link href="./shop-details.html">Shop Details</Link>
                </li>
                <li>
                  <Link href="./shoping-cart.html">Shoping Cart</Link>
                </li>
                <li>
                  <Link href="./checkout.html">Check Out</Link>
                </li>
                <li>
                  <Link href="./blog-details.html">Blog Details</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="./blog.html">Blog</Link>
            </li>
            <li>
              <Link href="./contact.html">Contact</Link>
            </li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap" />
        <div className="header__top__right__social">
          <Link href="#">
            <i className="fa fa-facebook" />
          </Link>
          <Link href="#">
            <i className="fa fa-twitter" />
          </Link>
          <Link href="#">
            <i className="fa fa-linkedin" />
          </Link>
          <Link href="#">
            <i className="fa fa-pinterest-p" />
          </Link>
        </div>
        <div className="humberger__menu__contact">
          <ul>
            <li>
              <i className="fa fa-envelope" /> hello@colorlib.com
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
                      <i className="fa fa-envelope" /> hello@colorlib.com
                    </li>
                    <li>Free Shipping for all Order of $99</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="header__top__right">
                  <div className="header__top__right__social">
                    <Link href="#">
                      <FaFacebookF />
                    </Link>
                    <Link href="#">
                      <FaTwitter />
                    </Link>
                    <Link href="#">
                      <FaLinkedinIn />
                    </Link>
                    <Link href="#">
                      <FaPinterestP />
                    </Link>
                  </div>
                  <div className="header__top__right__language">
                    <Image
                      src="/assets/img/language.png"
                      alt="language"
                      width="27"
                      height="14"
                    />
                    <div>English</div>
                    <span className="arrow_carrot-down" />
                    <ul>
                      <li>
                        <Link href="#">Spanis</Link>
                      </li>
                      <li>
                        <Link href="#">English</Link>
                      </li>
                    </ul>
                  </div>
                  <div className="header__top__right__auth user-nav position-relative">
                    {isAuth ? (
                      <>
                        <Link href="#">
                          <FontAwesomeIcon icon={faUser} className="pe-2" />{' '}
                          {name}
                        </Link>
                        <ul className="header__menu__dropdown">
                          <li>
                            <Link href="#">
                              <FontAwesomeIcon icon={faUser} className="pe-2" />{' '}
                              Account
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <FontAwesomeIcon
                                icon={faCartShopping}
                                className="pe-2"
                              />{' '}
                              My Cart
                            </Link>
                          </li>
                          <li>
                            <Link href="#">
                              <FontAwesomeIcon
                                icon={faPowerOff}
                                className="pe-2"
                              />{' '}
                              Log out
                            </Link>
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
                    <a href="./index.html">Home</a>
                  </li>
                  <li>
                    <a href="./shop-grid.html">Shop</a>
                  </li>
                  <li>
                    <a href="#">Pages</a>
                    <ul className="header__menu__dropdown">
                      <li>
                        <a href="./shop-details.html">Shop Details</a>
                      </li>
                      <li>
                        <a href="./shoping-cart.html">Shoping Cart</a>
                      </li>
                      <li>
                        <a href="./checkout.html">Check Out</a>
                      </li>
                      <li>
                        <a href="./blog-details.html">Blog Details</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="./blog.html">Blog</a>
                  </li>
                  <li>
                    <a href="./contact.html">Contact</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="header__cart">
                <ul>
                  <li>
                    <a href="#">
                      <FontAwesomeIcon icon={faHeart} />
                      {cart.length === 0 ? (
                        ''
                      ) : (
                        <span>
                          {cart.reduce(
                            (total, item, index) => (total += item.quantity),
                            0
                          )}
                        </span>
                      )}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FontAwesomeIcon icon={faCartShopping} />{' '}
                      {cart.length === 0 ? (
                        ''
                      ) : (
                        <span>
                          {' '}
                          {cart.reduce(
                            (total, item, index) => (total += item.quantity),
                            0
                          )}
                        </span>
                      )}
                    </a>
                  </li>
                </ul>
                <div className="header__cart__price">
                  item: <span>$150.00</span>
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
