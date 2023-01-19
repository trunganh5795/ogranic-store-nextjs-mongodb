import Image from "next/image";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faRetweet,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { ProductCardType } from "../configs/type";
import { formatProductPrice } from "../helpers";
import Link from "next/link";
export default function ProductCard({
  title,
  price,
  imgs,
  _id,
}: ProductCardType) {
  return (
    <div className="featured__item">
      <div className="featured__item__pic set-bg">
        <Image src={imgs[0].img} alt="product" fill={true} sizes="50vh" />
        <ul className="featured__item__pic__hover">
          <li>
            <button>
              <i>
                <FontAwesomeIcon icon={faHeart} />
              </i>
            </button>
          </li>
          <li>
            <button>
              <i>
                <FontAwesomeIcon icon={faShoppingCart} />
              </i>
            </button>
          </li>
          <li>
            <button>
              <i>
                <FontAwesomeIcon icon={faRetweet} />
              </i>
            </button>
          </li>
        </ul>
      </div>
      <div className="featured__item__text">
        <h6>
          <Link href={`/product/${_id}`}>{title}</Link>
        </h6>
        <h5>{formatProductPrice(price)}</h5>
      </div>
    </div>
  );
}
