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
