import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.scss";

import {
  ReactElement,
  ReactNode,
  createContext,
  useState,
  useEffect,
} from "react";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { getUserAuthentication } from "../controllers/user.controllers";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export const UserContext = createContext<UserContent>({
  name: "",
  img: "",
  isAuth: false,
  addressList: [],
  cart: [],
  setUserState: () => {},
});

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export type UserContent = {
  name: string;
  img?: string;
  isAuth: boolean;
  addressList: any[];
  cart: any[];
  setUserState: Function;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const setUserState = (userState: UserContent) => {
    setState(userState);
  };
  const [state, setState] = useState<UserContent>({
    isAuth: false,
    cart: [],
    addressList: [],
    name: "",
    img: "",
    setUserState,
  });
  useEffect(() => {
    async function getUserInfo() {
      try {
        let { data } = await getUserAuthentication();
        let { name, avatar, cart, address } = data;
        console.log("Data: ", data);
        setState({
          name,
          img: avatar,
          cart,
          isAuth: true,
          addressList: address,
          setUserState,
        });
      } catch (error) {}
    }
    getUserInfo();
    return () => {};
  }, []);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <UserContext.Provider value={state}>
        {getLayout(<Component {...pageProps} />)}
      </UserContext.Provider>
    </>
  );
}
