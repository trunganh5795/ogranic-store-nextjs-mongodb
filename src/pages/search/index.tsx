import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Field, Form, Formik, FormikProps, FormikErrors } from 'formik';

import TopProducts from '../../components/lastestProduct';
import Paging from '../../components/paging';
import ProductCard from '../../components/productCard';
import ClientTemplate from '../../templates/clientTemplate';
import { ALL_DEPARTMENTS, SELECT_SORT } from '../../configs/constants';
import { ProductCardType } from '../../configs/type';
import { searchProduct } from '../../controllers/product.controllers';
import { getLatestProducts } from '../../controllers/server/product.controllers';
import connectDB from '../../configs/database';
// //
let isSubscribe = true;
const PriceRange = Yup.object().shape({
  min: Yup.number()
    .typeError('Min must be a number')
    .required('Min is required')
    .min(0),
  max: Yup.number()
    .typeError('Max must be a number')
    .required('Max is required')
    .max(1000000)
    .moreThan(Yup.ref('min'), 'Max must be greater than min'),
});
const showErrorOnInputPrice = (
  formikErrorsInstance: FormikErrors<{
    min: number | '';
    max: number | '';
  }>,
) => {
  let error: React.ReactNode;
  if (formikErrorsInstance.min) {
    error = <span className="error-message">{formikErrorsInstance.min}</span>;
  } else if (formikErrorsInstance.max) {
    error = <span className="error-message">{formikErrorsInstance.max}</span>;
  }
  return error;
};
// //
export default function SearchPage({
  latestProducts,
}: {
  latestProducts: ProductCardType[];
}) {
  const router = useRouter();
  const formikRef =
    useRef<FormikProps<{ min: number | ''; max: number | '' }>>(null);
  const [searchProducts, setSerachProducts] = useState<ProductCardType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'1' | '-1' | undefined>(undefined);
  const [forceRerender, setForceReRender] = useState<boolean>(false);

  const { category, query, page, min, max } = router.query;

  const handleSearchProduct = async (
    currentPage: number,
    minPrice?: number,
    maxPrice?: number,
  ) => {
    const data = await searchProduct(
      category,
      query,
      sortBy,
      currentPage,
      minPrice,
      maxPrice,
    );
    const products = data.data.data;
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { total } = data.data;
    if (isSubscribe) {
      setSerachProducts(products);
      setTotal(total);
    }
  };

  useEffect(() => {
    isSubscribe = true;
    if (router.isReady) {
      const currentPage = parseInt(page as string, 10);
      const minPrice = min ? parseInt(min as string, 10) : undefined;
      const maxPrice = max ? parseInt(max as string, 10) : undefined;
      handleSearchProduct(currentPage, minPrice, maxPrice);
    }

    return () => {
      console.log('unmount');
      isSubscribe = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceRerender, page, sortBy, min, max]);
  // reset sortby when change category or search

  useEffect(() => {
    isSubscribe = true;
    setSortBy(undefined);
    setForceReRender((prev) => !prev);
    formikRef.current?.resetForm();
    return () => {
      isSubscribe = false;
    };
  }, [category, query]);
  return (
    <div>
      <Head>
        <title>My page title</title>
      </Head>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-5">
              <div className="sidebar">
                <div className="sidebar__item">
                  <h4>Department</h4>
                  <ul>
                    {ALL_DEPARTMENTS.map((item, index) => (
                      <li
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                        className={`${
                          category === item.query.category ? 'active' : ''
                        }`}>
                        <Link
                          href={{ pathname: item.pathname, query: item.query }}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="sidebar__item">
                  <h4>Price</h4>
                  <div className="price-range-wrap">
                    <Formik
                      initialValues={{
                        min: '',
                        max: '',
                      }}
                      innerRef={formikRef}
                      validateOnChange={false}
                      validateOnBlur={false}
                      validationSchema={PriceRange}
                      onSubmit={({ min, max }) => {
                        router.push({
                          pathname: router.pathname,
                          query: {
                            ...router.query,
                            min,
                            max,
                          },
                        });
                      }}>
                      {/* <div className="sidebar__item__form__price-range"> */}
                      {({ errors }) => (
                        <Form>
                          <div className="sidebar__item__form__price-range">
                            <Field name="min" placeholder="₫ Min" />
                            <span>-</span>
                            <Field name="max" placeholder="₫ Max" />
                          </div>
                          {showErrorOnInputPrice(errors)}
                          <button className="site-btn p-2 w-100" type="submit">
                            Apply
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
                <div className="sidebar__item">
                  <TopProducts
                    items={latestProducts}
                    header="Latest Products"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-7">
              <div className="filter__item">
                <div className="row">
                  <div className="col-lg-4 col-md-5">
                    <div className="filter__sort">
                      <span className="me-2">Sort By</span>
                      <select
                        className="form-select form-select-sm d-inline"
                        aria-label=".form-select-sm example"
                        onChange={(e) => {
                          setSortBy(e.target.value as '1' | '-1' | undefined);
                        }}>
                        {SELECT_SORT.map((item, index) => (
                          <option
                            value={item.value}
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            selected={sortBy === item.value}>
                            {item.title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <div className="filter__found">
                      <h6>
                        <span>{total}</span> Products found
                      </h6>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-3">
                    <div className="filter__option">
                      <span className="icon_grid-2x2" />
                      <span className="icon_ul" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {searchProducts.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                    <ProductCard {...item} />
                  </div>
                ))}
              </div>
              <div className="product__pagination">
                <Paging
                  currentPage={parseInt(page as string, 10)}
                  total={total}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
SearchPage.getLayout = (page: React.ReactElement) => (
  <ClientTemplate>{page}</ClientTemplate>
);

export async function getStaticProps() {
  await connectDB();
  let latestProducts = await getLatestProducts();
  latestProducts = JSON.parse(JSON.stringify(latestProducts));

  return {
    props: {
      latestProducts,
    }, // will be passed to the page component as props
  };
}
