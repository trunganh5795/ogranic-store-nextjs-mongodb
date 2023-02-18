import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
} from 'react-icons/fa';

import { LOCALES } from '../configs/type';
import { useTrans } from '../hooks/useTrans';

export default function Footer() {
  const router = useRouter();
  const trans = useTrans(router.locale as LOCALES);
  return (
    <footer className="footer spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 col-sm-6">
            <div className="footer__about">
              <div className="footer__about__logo">
                <Link href="/">
                  <Image
                    src="/assets/img/logo.png"
                    alt="logo"
                    width="119"
                    height="50"
                  />
                </Link>
              </div>
              <ul>
                <li>{trans?.home.address}: 60-49 Nguyen Trai St, HCM</li>
                <li>{trans?.home.phone}: +84 99.688.888</li>
                <li>{trans?.home.email}: trunganhtruongngoc@gmail.com</li>
              </ul>
            </div>
          </div>
          {/* <div className="col-lg-4 col-md-6 col-sm-6"> */}
          <div className="col-lg-4 col-md-6 col-sm-6 flex-grow-1">
            <div className="footer__widget">
              <h6>Useful Links</h6>
              <ul>
                <li>
                  <Link href="/">{trans?.home['about-us']}</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link href="/">{trans?.home.contact}</Link>
                </li>
              </ul>
              <iframe
                className="w-100"
                title="Map"
                src="https://maps.google.com/maps?width=520&height=400&hl=en&q=%20Nha%20Trang+(Map)&t=&z=16&ie=UTF8&iwloc=B&output=embed"
              />
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="footer__widget">
              <h6>{trans?.home['join-now']}</h6>
              <p>{trans?.home.getnews}</p>
              <form action="#">
                <input
                  type="text"
                  placeholder={trans?.placeholder.enteryourmail}
                />
                <button type="submit" className="site-btn">
                  {trans?.button.subscribe}
                </button>
              </form>
              <div className="footer__widget__social">
                <Link href="https://github.com/trunganh5795" target="_blank">
                  <FaFacebookF />
                </Link>
                <Link href="https://github.com/trunganh5795" target="_blank">
                  <FaTwitter />
                </Link>
                <Link href="https://github.com/trunganh5795" target="_blank">
                  <FaLinkedinIn />
                </Link>
                <Link href="https://github.com/trunganh5795" target="_blank">
                  <FaPinterestP />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
