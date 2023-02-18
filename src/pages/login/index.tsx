import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';

import { handleLogin } from '../../controllers/user.controllers';
import { LoginForm } from '../../configs/type';
import { UserContext } from '../_app';

const SignupSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function LoginPage() {
  const router = useRouter();
  const userState = useContext(UserContext);
  const { isAuth, setUserState } = userState;
  const loginAction = async ({ email, password }: LoginForm) => {
    try {
      const { data } = await handleLogin({ email, password });
      const { name, img, cart } = data;
      setUserState({ ...userState, name, img, cart, isAuth: true });
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (isAuth) {
      router.push('/');
    }
    return () => {};
  }, [isAuth, router]);

  return (
    !isAuth && (
      <div className="login__form">
        <div className="logo">
          <Link href="/">
            <Image
              src="/assets/img/logo.png"
              alt="logo"
              width={120}
              height={50}
            />
          </Link>
        </div>
        <Formik
          initialValues={{
            password: '',
            email: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={loginAction}>
          {() => (
            <Form>
              <div className="field">
                <Field name="email" placeholder="Email" />
                <ErrorMessage
                  name="email"
                  render={(msg) => <span className="error-message">{msg}</span>}
                />
              </div>
              <div className="field">
                <Field name="password" placeholder="Password" type="password" />
                <ErrorMessage
                  name="password"
                  render={(msg) => <span className="error-message">{msg}</span>}
                />
              </div>
              <button className="btn btn-success btn-login mb-2" type="submit">
                Login
              </button>
            </Form>
          )}
        </Formik>
        <div>
          <ul>
            <li className="mb-2">
              <Link href="/">Forgot Username / Password?</Link>
            </li>
            <li className="mb-2">
              <span>Don’t have an account? </span>
              <Link href="/register">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  );
}
