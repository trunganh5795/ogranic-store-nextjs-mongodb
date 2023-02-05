import Image from 'next/image';
import React, { useContext } from 'react';
import { formatProductPrice } from '../../helpers';
import ClientTemplate from '../../templates/clientTemplate';
import { UserContext } from '../_app';
import { FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';
import { UserContent } from '../_app';
import { updateCart } from '../../controllers/user.controllers';

enum ChangeQuantityCart {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
}

export default function PurchasePage() {
  const { cart, setUserState } = useContext(UserContext);
  const subtotal = cart.reduce(
    (total, item, index) => (total += item.price * item.quantity),
    0,
  );
  const removeItemCart = async (id: string) => {
    try {
      let itemIdx = cart.findIndex((item, index: number) => item.id === id);
      if (itemIdx !== -1) {
        let newCart = [...cart];
        newCart.splice(itemIdx, 1);
        await updateCart(newCart);
        setUserState((prev: UserContent) => ({ ...prev, cart: newCart }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const changeQuanityByOne = async (action: ChangeQuantityCart, id: string) => {
    try {
      let item = cart.find((item, index: number) => item.id === id);
      if (item) {
        switch (action) {
          case ChangeQuantityCart.INCREASE:
            item.quantity += 1;
            break;
          case ChangeQuantityCart.DECREASE:
            if (item.quantity <= 1) return;
            item.quantity -= 1;
            break;
          default:
            return;
        }
        await updateCart(cart);
        setUserState((prev: UserContent) => ({ ...prev, cart: cart }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="shoping-cart spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping__cart__table">
              <table>
                <thead>
                  <tr>
                    <th className="shoping__product">Products</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th className="text-end">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={item.id}>
                      <td className="shoping__cart__item">
                        <Image
                          src={item.img}
                          alt="product-cart"
                          width={100}
                          height={100}
                        />
                        <Link href={`/product/${item.id}`}>
                          <h5>{item.title}</h5>
                        </Link>
                      </td>
                      <td className="shoping__cart__price">
                        {formatProductPrice(item.price)}
                      </td>
                      <td className="shoping__cart__quantity">
                        <div className="quantity">
                          <div className="pro-qty">
                            <span
                              className="qtybtn"
                              onClick={() => {
                                changeQuanityByOne(
                                  ChangeQuantityCart.DECREASE,
                                  item.id,
                                );
                              }}>
                              -
                            </span>
                            <input type="text" value={item.quantity} />
                            <span
                              className="qtybtn"
                              onClick={() => {
                                changeQuanityByOne(
                                  ChangeQuantityCart.INCREASE,
                                  item.id,
                                );
                              }}>
                              +
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="shoping__cart__total">
                        {formatProductPrice(item.price * item.quantity)}
                      </td>
                      <td className="shoping__cart__item__close">
                        <span
                          className="icon_close"
                          onClick={() => {
                            removeItemCart(item.id);
                          }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="shoping__cart__btns">
              <Link href="/" className="primary-btn">
                <FaArrowLeft /> CONTINUE SHOPPING
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="shoping__continue">
              <div className="shoping__discount">
                <h5>Discount Codes</h5>
                <form action="#">
                  <input type="text" placeholder="Enter your coupon code" />
                  <button type="submit" className="site-btn">
                    APPLY COUPON
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="shoping__checkout">
              <h5>Cart Total</h5>
              <ul>
                <li>
                  Subtotal <span>{formatProductPrice(subtotal)}</span>
                </li>
                <li>
                  Shipping fee{' '}
                  <span>{formatProductPrice(cart.length ? 15000 : 0)}</span>
                </li>
                <li>
                  Total{' '}
                  <span>
                    {formatProductPrice(subtotal + (cart.length ? 15000 : 0))}
                  </span>
                </li>
              </ul>
              <Link href="/checkout" className="primary-btn">
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
PurchasePage.getLayout = (page: React.ReactElement) => {
  return <ClientTemplate>{page}</ClientTemplate>;
};
