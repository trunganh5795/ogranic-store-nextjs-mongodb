import { Address, loginForm, registerForm } from '../configs/type';

import { axiosClient } from './axiosClient';

export const handleRegister = ({ name, email, password }: registerForm) =>
  axiosClient.post('user/register', { name, email, password });

export const handleLogin = ({ email, password }: loginForm) =>
  axiosClient.post('user/login', { email, password });

export const getUserAuthentication = () => axiosClient.get('user/isauth');

export const addToCart = async (productId: string, quantity: number) =>
  axiosClient.post('useractions/addtocart', {
    id: productId,
    quantity,
  });
export const updateCart = async (newCart: any[]) =>
  axiosClient.post('useractions/updatecart', {
    cart: newCart,
  });

export const placeOrder = async (
  address: Omit<Address, 'defaultAdd'> & { defaultAdd?: boolean },
) =>
  axiosClient.post('useractions/placeorder', {
    address,
  });

export const addNewsAddress = async (address: Partial<Address>) =>
  axiosClient.post('useractions/addnewaddress', {
    ...address,
  });

export const logout = async () => axiosClient.post('useractions/logout');
