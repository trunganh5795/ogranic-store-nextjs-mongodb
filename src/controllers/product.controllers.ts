import { axiosClient } from './axiosClient';

export const getRelatedProduct = (name: string) =>
  axiosClient.get('product/related-product', {
    params: { currentProduct: name },
  });
export const searchProduct = (
  category: string | string[] | undefined,
  query: string | string[] | undefined,
  sort: '1' | '-1' | undefined,
  page: number,
  min?: number,
  max?: number,
) =>
  axiosClient.get('/product/search-product', {
    params: {
      category,
      query,
      page,
      sort,
      min,
      max,
    },
  });
