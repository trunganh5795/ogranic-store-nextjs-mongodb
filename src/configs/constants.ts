import { CategoryType, LastestProductProp } from './type';

export const CATEGORIES: Readonly<CategoryType>[] = [
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

export const LATEST_PRODUCTS: Readonly<LastestProductProp>[] = [
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
export const ALL_DEPARTMENTS = [
  {
    title: 'Fresh Fruit',
    pathname: '/search',
    query: {
      category: '1',
      page: '1',
    },
  },
  {
    title: 'Fresh meat',
    pathname: '/search',
    query: {
      category: '2',
      page: '1',
    },
  },
  {
    title: 'Seafood',
    pathname: '/search',
    query: {
      category: '3',
      page: '1',
    },
  },
  {
    title: 'Vegetable',
    pathname: '/search',
    query: {
      category: '4',
      page: '1',
    },
  },
  {
    title: 'Vegetable',
    pathname: '/search',
    query: {
      category: '5',
      page: '1',
    },
  },
  {
    title: 'Spice',
    pathname: '/search',
    query: {
      category: '6',
      page: '1',
    },
  },
  {
    title: 'Processed Food',
    pathname: '/search',
    query: {
      category: '7',
      page: '1',
    },
  },
  {
    title: 'Fresh Milk',
    pathname: '/search',
    query: {
      category: '8',
      page: '1',
    },
  },
  {
    title: 'Soft Drinks',
    pathname: '/search',
    query: {
      category: '9',
      page: '1',
    },
  },
  {
    title: 'Fast Food',
    pathname: '/search',
    query: {
      category: '10',
      page: '1',
    },
  },
  {
    title: 'Dry food',
    pathname: '/search',
    query: {
      category: '11',
      page: '1',
    },
  },
];
export const ProductCarouselSetting = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  // autoplay: true,
};
export const saltRounds: Readonly<number> = 10;
export const ALGORITHM: Readonly<string> = 'HS256';
export const ITEM_PER_PAGE: Readonly<number> = 9;
export const ProductDetailsNavTabs: Readonly<{ title: string }[]> = [
  {
    title: 'Description',
  },
  { title: 'Information' },
  { title: 'Reviews' },
];
export const SELECT_SORT: Readonly<
  { title: string; value: '-1' | '1' | undefined }[]
> = [
  {
    title: 'No select',
    value: undefined,
  },
  {
    title: 'Ascending',
    value: '1',
  },
  {
    title: 'Descending',
    value: '-1',
  },
];
