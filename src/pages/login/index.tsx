import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { handleLogin } from '../../controllers/user.controllers';
import { loginForm } from '../../configs/type';
import { useRouter } from 'next/router';
import { UserContent, UserContext } from '../_app';

const SignupSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
});

export default function LoginPage() {
  const router = useRouter();
  const { isAuth, setUserState } = useContext(UserContext);
  const loginAction = async ({ email, password }: loginForm) => {
    try {
      let { data } = await handleLogin({ email, password });
      let { name, img, cart } = data;
      setUserState((prev: UserContent) => ({
        ...prev,
        name,
        cart,
        img,
        isAuth: true,
      }));
      router.push('/');
    } catch (error: any) {
      console.log(error.response?.data?.message);
    }
  };
  useEffect(() => {
    if (isAuth) {
      router.push('/');
    }
    return () => {};
  }, []);

  return (
    <>
      {isAuth ? (
        <></>
      ) : (
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
            {({ errors, touched }) => (
              <Form>
                <div className="field">
                  <Field name="email" placeholder="Email" />
                  <ErrorMessage
                    name="email"
                    render={(msg) => (
                      <span className="error-message">{msg}</span>
                    )}
                  />
                </div>
                <div className="field">
                  <Field
                    name="password"
                    placeholder="Password"
                    type="password"
                  />
                  <ErrorMessage
                    name="password"
                    render={(msg) => (
                      <span className="error-message">{msg}</span>
                    )}
                  />
                </div>
                <button
                  className="btn btn-success btn-login mb-2"
                  type="submit">
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
      )}
    </>
  );
}
