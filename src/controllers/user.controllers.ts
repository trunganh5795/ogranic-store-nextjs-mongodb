import { loginForm, registerForm } from '../configs/type';
import { axiosClient } from './axiosClient';

export const handleRegister = ({ name, email, password }: registerForm) => {
  return axiosClient.post('user/register', { name, email, password });
};

export const handleLogin = ({ email, password }: loginForm) => {
  return axiosClient.post('user/login', { email, password });
};

export const getUserAuthentication = () => {
  return axiosClient.get('user/isauth');
};

export const addToCart = async (productId: string, quantity: number) => {
  return axiosClient.post('useractions/addtocart', {
    id: productId,
    quantity: quantity,
  });
};
export const updateCard = async (newCart: any[]) => {
  return axiosClient.post('useractions/updatecart', {
    cart: newCart,
  });
};
