import type { NextApiRequest, NextApiResponse } from 'next';
import * as jose from 'jose';

import { ErrorMessage, TokenPayLoad, Cart } from '../configs/type';
import { ALGORITHM } from '../configs/constants';

const formatProductPrice = (price: number) =>
  new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'vnd',
  }).format(price);

const handleError = (
  req: NextApiRequest,
  res: NextApiResponse<any>,
  msg: ErrorMessage,
) => {
  let { code, message } = msg;
  code = code || 500;
  message = message || 'Something went wrong';

  res.status(code).send({ message });
};

const encodeToken = async (payload: TokenPayLoad): Promise<string> => {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const jwt = await new jose.SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setIssuer('truongngoctrunganh')
    .setAudience('urn:example:audience')
    .setExpirationTime('7d')
    .sign(secret);
  return jwt;
};
const decodeToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  const { payload } = await jose.jwtVerify(token, secret);
  return payload;
};
const reduceStringLength = (pattern: string, length: number) => {
  const newPattern =
    pattern.substring(0, length) + (pattern.length <= length ? '' : '...');
  return newPattern;
};

const caculateTotalCartItem = (cart: Cart[]) => {
  const total = cart?.reduce((total, item) => {
    const newTotal = total + item.quantity;
    return newTotal;
  }, 0);
  return total;
};

const caculateSubTotal = (cart: Cart[]) => {
  const subtotal = cart.reduce((total, item) => {
    const newTotal = total + item.price * item.quantity;
    return newTotal;
  }, 0);
  return subtotal;
};

export {
  formatProductPrice,
  handleError,
  encodeToken,
  decodeToken,
  reduceStringLength,
  caculateTotalCartItem,
  caculateSubTotal,
};
