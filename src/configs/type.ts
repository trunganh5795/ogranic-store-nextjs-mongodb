export interface ProductCardType {
  category: number;
  comments: [any];
  description: string;
  discount?: number;
  imgs: [{ img: string; id: string }];
  inStock: number;
  numOfRate: number;
  price: number;
  rate: number;
  sold: number;
  title: string;
  unit: string;
  _id: string;
}

export interface CategoryType {
  title: string;
  img: string;
  link: string;
}

export interface LastestProductProp {
  title: string;
  fetchURL: string;
}

export interface registerForm {
  name: string;
  email: string;
  password: string;
}

export interface loginForm {
  email: string;
  password: string;
}

export interface ErrorMessage {
  code?: number;
  message?: string;
}

export interface tokenPayLoad {
  [propName: string]: unknown;
}

enum Role {
  USER = 'user',
  ADMIN = 'admin',
}
export interface Cart {
  id: string;
  title: string;
  price: number;
  quantity: number;
  img: string;
}
export interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  postcode: number;
  defaultAdd: boolean;
}
export interface ProductImgs {
  img: string;
}
export interface Comment {
  userId: string;
  date: Date;
  content: string;
}
export interface Discount {
  value: number;
  startDate: Date;
  endDate: Date;
}
export interface User {
  name: string;
  required: true;
  email: string;
  password: string;
  role: Role;
  avatar: string;
  cart: Cart[];
  address: Address;
  order: any;
  default: any;
}
export interface Product {
  _id: string;
  title: string;
  price: number;
  unit: string;
  description: string;
  imgs: [ProductImgs];
  category: number;
  inStock: number;
  sold: {
    type: number;
    default: 0;
  };
  rate: number;
  numOfRate: {
    type: number;
    default: 0;
  };
  comments: [Comment];
  discount: Discount;
}

export interface ResponseMessage<T> {
  message: string;
  data?: T;
}
