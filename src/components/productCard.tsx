import Image from 'next/image';
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeart,
  faRetweet,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { ProductCardType } from '../configs/type';
import { formatProductPrice, reduceStringLength } from '../helpers';
import Link from 'next/link';
import { Tooltip } from 'react-bootstrap';
import { addToCart } from '../controllers/user.controllers';
import { UserContent, UserContext } from '../pages/_app';
export default function ProductCard({
  title,
  price,
  imgs,
  _id,
}: ProductCardType) {
  const { setUserState } = useContext(UserContext);
  const handleAddtoCart = async (id: string) => {
    try {
      let { data } = await addToCart(id, 1);

      setUserState((prev: UserContent) => ({
        ...prev,
        cart: data.cart,
      }));
    } catch (error) {
      console.log(error);
    }
  };
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
            <button
              onClick={() => {
                handleAddtoCart(_id);
              }}>
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
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id={`tooltip-top}`}>
              <strong>{title}</strong>
            </Tooltip>
          }>
          <h6>
            <Link href={`/product/${_id}`}>
              {reduceStringLength(title, 30)}
            </Link>
          </h6>
        </OverlayTrigger>
        <h5>{formatProductPrice(price)}</h5>
      </div>
    </div>
  );
}
