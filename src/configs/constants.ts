import { CategoryType, LastestProductProp } from './type';

export const CATEGORIES: CategoryType[] = [
  {
    title: 'Fresh Fruit',
    img: '/assets/img/categories/cat-1.jpg',
    link: '',
  },
  {
    title: 'Dried Fruit',
    img: '/assets/img/categories/cat-2.jpg',
    link: '',
  },
  {
    title: 'Vegetables',
    img: '/assets/img/categories/cat-3.jpg',
    link: '',
  },
  {
    title: 'Drink fruits',
    img: '/assets/img/categories/cat-4.jpg',
    link: '',
  },
  {
    title: 'Drink fruits',
    img: '/assets/img/categories/cat-5.jpg',
    link: '',
  },
];

export const LATEST_PRODUCTS: LastestProductProp[] = [
  {
    title: 'Latest Product',
    fetchURL: '',
  },
  {
    title: 'Top Rated Products',
    fetchURL: '',
  },
  {
    title: 'Review Products',
    fetchURL: '',
  },
];
export const saltRounds = 10;
export const ALGORITHM = 'HS256';
export const ProductDetailsNavTabs = [
  {
    title: 'Description',
  },
  { title: 'Information' },
  { title: 'Reviews' },
];
