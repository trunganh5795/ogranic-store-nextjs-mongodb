import React, { useContext, useState, useRef } from "react";
import ShippingAddress from "../../components/shippingAddress";
import ClientTemplate from "../../templates/clientTemplate";
import { UserContent, UserContext } from "../_app";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { addNewsAddress, placeOrder } from "../../controllers/user.controllers";
import { formatProductPrice, reduceStringLength } from "../../helpers";
import { GetServerSideProps } from "next";
import User from "../../models/userModel";

const addressForm = Yup.object().shape({
  name: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  postcode: Yup.number().required("Required"),
  defaultAdd: Yup.boolean().required("Required"),
});
export interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  postcode?: number;
  defaultAdd: boolean;
}

export default function PurchasePage({ cart }: { cart: any[] }) {
  const formRef = useRef<FormikProps<Address>>(null);
  const [isShowAddList, setisShowAddList] = useState<boolean>(false);
  const [isAddForm, setIsAddForm] = useState<boolean>(false);
  const [addressIndex, setAddressIndex] = useState<number>(-1);
  const { setUserState, addressList } = useContext(UserContext);
  const subtotal = cart.reduce(
    (total, item, index) => (total += item.price * item.quantity),
    0
  );

  const handlePlaceOrder = async (address: Address | number) => {
    try {
      console.log(addressForm);
      // placeOrder(address);
      if (addressIndex !== -1) {
        //addressIndex !== -1 ,one address has been seleted
      } else {
        // no address seleted, please fill up this form
        formRef.current?.handleSubmit();
        if (formRef.current?.isValid) {
          console.log(formRef.current?.values);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddnewAddress = async (newAddress: Address) => {
    try {
      let { data } = await addNewsAddress(newAddress);
      let addList = data;
      console.log(addList);
      setUserState((prev: UserContent) => ({
        ...prev,
        addressList: addList,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="checkout spad">
      {isShowAddList ? <div className="layer"></div> : ""}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <h6>
              <span className="icon_tag_alt" /> Have a coupon?{" "}
              <a href="#">Click here</a> to enter your code
            </h6>
          </div>
        </div>
        <div className="checkout__form">
          <h4>Billing Details</h4>

          <div className="row">
            <div className="col-lg-8 col-md-6">
              {addressList.map((item, index) => {
                if (item.defaultAdd) {
                  return (
                    <ShippingAddress
                      setShowAddList={setisShowAddList}
                      key={index}
                      address={item}
                    />
                  );
                }
              })}
              {/* pop-up address list */}
              <div
                className="address__popup p-3 shadow-sm rounded border"
                style={{ display: `${isShowAddList ? "block" : "none"}` }}
              >
                {/* <div className="pb-2">
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
                </div> */}
                <div className="text-end">
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setisShowAddList(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
              {addressList.length ? (
                ""
              ) : (
                <div className="text-center">
                  <span className="error-message">
                    You don&rsquo;t have any addresses, please add one.
                  </span>
                </div>
              )}
              <button
                type="button"
                className="rounded site-btn"
                onClick={() => {
                  setIsAddForm(true);
                }}
              >
                + Add new address
              </button>
              <div style={{ display: `${isAddForm ? "block" : "none"}` }}>
                <Formik
                  initialValues={{
                    name: "",
                    address: "",
                    city: "",
                    state: "",
                    phone: "",
                    postcode: undefined,
                    defaultAdd: false,
                  }}
                  validationSchema={addressForm}
                  onSubmit={() => {}}
                  innerRef={formRef}
                >
                  {({ values, errors, touched }) => (
                    <Form>
                      <div className="row">
                        <div className="checkout__input">
                          <p>
                            Name<span>*</span>
                          </p>
                          <Field name="name" placeholder="Name" />
                          <ErrorMessage
                            name="name"
                            render={(msg) => (
                              <span className="error-message">{msg}</span>
                            )}
                          />
                        </div>
                      </div>
                      <div className="checkout__input">
                        <p>
                          Address<span>*</span>
                        </p>
                        <div className="mb-2">
                          <Field name="address" placeholder="Address" />
                          <ErrorMessage
                            name="address"
                            render={(msg) => (
                              <span className="error-message">{msg}</span>
                            )}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              Town/City<span>*</span>
                            </p>
                            <Field name="city" placeholder="City" />
                            <ErrorMessage
                              name="city"
                              render={(msg) => (
                                <span className="error-message">{msg}</span>
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              State<span>*</span>
                            </p>
                            <Field name="state" placeholder="State" />
                            <ErrorMessage
                              name="state"
                              render={(msg) => (
                                <span className="error-message">{msg}</span>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              Phone<span>*</span>
                            </p>
                            <Field
                              name="phone"
                              placeholder="Phone"
                              type="number"
                            />
                            <ErrorMessage
                              name="phone"
                              render={(msg) => (
                                <span className="error-message">{msg}</span>
                              )}
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="checkout__input">
                            <p>
                              Postcode / ZIP<span>*</span>
                            </p>
                            <Field
                              name="postcode"
                              placeholder="Postcode"
                              type="number"
                            />
                            <ErrorMessage
                              name="postcode"
                              render={(msg) => (
                                <span className="error-message">{msg}</span>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="checkout__input__checkbox">
                        <Field type="checkbox" name="defaultAdd" />
                        <label htmlFor="acc">Mark as default</label>
                      </div>
                      <div className="text-end">
                        <button
                          className="btn btn-warning me-3"
                          type="submit"
                          onClick={() => {
                            console.log(formRef.current);
                            if (
                              Object.keys(formRef.current!.errors).length === 0
                            ) {
                              handleAddnewAddress(formRef.current!.values);
                            }
                          }}
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => {
                            setIsAddForm(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
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
                  {cart.map((item, index) => (
                    <li key={index}>
                      {reduceStringLength(item.title, 30)}{" "}
                      <span>
                        {formatProductPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="checkout__order__subtotal">
                  Subtotal <span>{formatProductPrice(subtotal)}</span>
                  <br />
                  Shipping <span>{formatProductPrice(15000)}</span>
                </div>
                <div className="checkout__order__total">
                  Total <span>{formatProductPrice(subtotal + 15000)}</span>
                </div>
                <button
                  type="button"
                  className="site-btn"
                  onClick={() => {
                    handlePlaceOrder();
                  }}
                >
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
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // ...
  console.log(req.headers);
  if (req.headers.isauth === "0") {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  } else {
    let userId = req.headers._id;
    let user = await User.findOne({ _id: userId });
    if (user) {
      return {
        props: { cart: JSON.parse(JSON.stringify(user.cart)) },
      };
    } else {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }
};
