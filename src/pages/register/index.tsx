import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import { handleRegister } from '../../controllers/user.controllers';
import { registerForm } from '../../configs/type';

const RegisterSchema = Yup.object().shape({
  password: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  name: Yup.string()
    .trim()
    .matches(/[\p{Letter}\p{Mark}]+/gu, 'Invalid name')
    .required('Required'),
  rePassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match',
  ),
});
export default function RegisterPage() {
  const router = useRouter();
  const createAccount = async (values: registerForm) => {
    try {
      await handleRegister(values);
      router.push('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
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
          name: '',
          password: '',
          rePassword: '',
          email: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={createAccount}>
        {({ errors, touched }) => (
          <Form>
            <div className="field">
              <Field name="name" placeholder="Your name" />
              <ErrorMessage
                name="name"
                render={(msg) => <span className="error-message">{msg}</span>}
              />
            </div>
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
            <div className="field">
              <Field
                name="rePassword"
                placeholder="repeat Password"
                type="password"
              />
              <ErrorMessage
                name="rePassword"
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
            <span>Already have an account ? </span>
            <Link href="/login">Log in</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
