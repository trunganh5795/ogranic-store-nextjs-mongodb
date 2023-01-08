import React, { useContext, useState } from 'react';
import ShippingAddress from '../../components/shippingAddress';
import ClientTemplate from '../../templates/clientTemplate';
import { UserContext } from '../_app';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
let addressList: any[] = [];

const addressForm = Yup.object().shape({
  firstname: Yup.string().required('Required'),
  lastname: Yup.string().required('Required'),
  address: Yup.string().required('Required'),
  city: Yup.string().required('Required'),
  state: Yup.string().required('Required'),
  phone: Yup.number().required('Required'),
  postcode: Yup.number().required('Required'),
});

export default function PurchasePage() {
  const [isShowAddList, setisShowAddList] = useState<boolean>(false);
  const [isAddForm, setIsAddForm] = useState<boolean>(false);
  // const { addressList } = useContext(UserContext);
  return (
    <section className="checkout spad">
      {isShowAddList ? <div className="layer"></div> : ''}

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h6>
              <span className="icon_tag_alt" /> Have a coupon?{' '}
              <a href="#">Click here</a> to enter your code
            </h6>
          </div>
        </div>
        <div className="checkout__form">
          <h4>Billing Details</h4>

          <div className="row">
            <div className="col-lg-8 col-md-6">
              {addressList.find((item, index) => {
                if (item.default) {
                  return <ShippingAddress setShowAddList={setisShowAddList} />;
                }
              })}
              {/* pop-up address list */}
              <div
                className="address__popup p-3 shadow-sm rounded border"
                style={{ display: `${isShowAddList ? 'block' : 'none'}` }}>
                <div className="pb-2">
                  <ShippingAddress />
                </div>
                <div className="pb-2">
                  <ShippingAddress />
                </div>
                <div className="pb-2">
                  <ShippingAddress />
                </div>
                <div className="pb-2">
                  <ShippingAddress />
                </div>
                <div className="text-end">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setisShowAddList(false);
                    }}>
                    Close
                  </button>
                </div>
              </div>
              <div className="text-center">
                <span className="error-message">
                  You don&rsquo;t have any addresses, please add one.
                </span>
              </div>
              <button
                type="button"
                className="rounded site-btn"
                onClick={() => {
                  setIsAddForm(true);
                }}>
                + Add new address
              </button>
              <div style={{ display: `${isAddForm ? 'block' : 'none'}` }}>
                <Formik
                  initialValues={{
                    password: '',
                    email: '',
                  }}
                  validationSchema={addressForm}
                  onSubmit={() => {}}>
                  {({ errors, touched }) => (
                    <>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              Fist Name<span>*</span>
                            </p>
                            <input type="text" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              Last Name<span>*</span>
                            </p>
                            <input type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="checkout__input">
                        <p>
                          Address<span>*</span>
                        </p>
                        <input
                          type="text"
                          placeholder="Street Address"
                          className="checkout__input__add"
                        />
                        <input
                          type="text"
                          placeholder="Apartment, suite, unite ect (optinal)"
                        />
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              Town/City<span>*</span>
                            </p>
                            <input type="text" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              Country/State<span>*</span>
                            </p>
                            <input type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              Phone<span>*</span>
                            </p>
                            <input type="text" />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              Postcode / ZIP<span>*</span>
                            </p>
                            <input type="text" />
                          </div>
                        </div>
                      </div>
                      <div className="checkout__input">
                        <p>
                          Order notes<span>*</span>
                        </p>
                        <input
                          type="text"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                        />
                      </div>
                      <div className="checkout__input__checkbox">
                        <label htmlFor="acc">
                          Add to your address list
                          <input type="checkbox" id="acc" />
                          <span className="checkmark" />
                        </label>
                      </div>
                      <div className="text-end">
                        <button className="btn btn-warning me-3">Reset</button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            setIsAddForm(false);
                          }}>
                          Cancel
                        </button>
                      </div>
                    </>
                  )}
                </Formik>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="checkout__order">
                <h4>Your Order</h4>
                <div className="checkout__order__products">
                  Products <span>Total</span>
                </div>
                <ul>
                  <li>
                    Vegetable’s Package <span>$75.99</span>
                  </li>
                  <li>
                    Fresh Vegetable <span>$151.99</span>
                  </li>
                  <li>
                    Organic Bananas <span>$53.99</span>
                  </li>
                </ul>
                <div className="checkout__order__subtotal">
                  Subtotal <span>$750.99</span>
                </div>
                <div className="checkout__order__total">
                  Total <span>$750.99</span>
                </div>
                <button type="submit" className="site-btn">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
PurchasePage.getLayout = (page: React.ReactElement) => {
  return <ClientTemplate>{page}</ClientTemplate>;
};
``;
