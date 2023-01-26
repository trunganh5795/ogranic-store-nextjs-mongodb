import { Address, loginForm, registerForm } from "../configs/type";

import { axiosClient } from "./axiosClient";

export const handleRegister = ({ name, email, password }: registerForm) => {
  return axiosClient.post("user/register", { name, email, password });
};

export const handleLogin = ({ email, password }: loginForm) => {
  return axiosClient.post("user/login", { email, password });
};

export const getUserAuthentication = () => {
  return axiosClient.get("user/isauth");
};

export const addToCart = async (productId: string, quantity: number) => {
  return axiosClient.post("useractions/addtocart", {
    id: productId,
    quantity: quantity,
  });
};
export const updateCart = async (newCart: any[]) => {
  return axiosClient.post("useractions/updatecart", {
    cart: newCart,
  });
};

export const placeOrder = async (
  address: Omit<Address, "defaultAdd"> & { defaultAdd?: boolean }
) => {
  return axiosClient.post("useractions/placeorder", {
    address: address,
  });
};

export const addNewsAddress = async (address: Partial<Address>) => {
  return axiosClient.post("useractions/addnewaddress", {
    ...address,
  });
};

export const logout = async () => {
  return axiosClient.post("useractions/logout");
};
