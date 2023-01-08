import { axiosClient } from './axiosClient';

export const getRelatedProduct = (name: string) => {
  return axiosClient.get('product/related-product', {
    params: { currentProduct: name, test: [1, 2, 3, 4, 5] },
  });
};
