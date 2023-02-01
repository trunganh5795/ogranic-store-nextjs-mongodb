import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TopProducts from "../../components/lastestProduct";
import Paging from "../../components/paging";
import ProductCard from "../../components/productCard";
import InputRange from "react-input-range";
import { ALL_DEPARTMENTS } from "../../configs/constants";
import connectDB from "../../configs/database";
import { ProductCardType } from "../../configs/type";
import { searchProduct } from "../../controllers/product.controllers";
import { getLatestProducts } from "../../controllers/server/product.controllers";
import ClientTemplate from "../../templates/clientTemplate";

export default function SearchPage({
  latestProducts,
}: {
  latestProducts: ProductCardType[];
}) {
  const router = useRouter();
  const [searchProducts, setSerachProducts] = useState<ProductCardType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"1" | "-1" | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<any>({});
  let { category, query, page } = router.query;

  const handleSearchProduct = async (page: number, isSubscribe: boolean) => {
    console.log("object");
    let data = await searchProduct(category, query, sortBy, page);
    let products = data.data.data;
    let total = data.data.total;
    console.log(data);
    if (isSubscribe) {
      setSerachProducts(products);
      setTotal(total);
    }
  };

  useEffect(() => {
    let isSubscribe = true;
    console.log("mount");
    if (router.isReady) {
      let pageNumber = parseInt(page as string);
      handleSearchProduct(pageNumber, isSubscribe);
    }
    return () => {
      console.log("unmount");
      isSubscribe = false;
    };
    //
  }, [category, query, page, sortBy]);
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
                        key={index}
                        className={`${
                          category === item.query.category ? "active" : ""
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
                    <form
                      className="sidebar__item__form"
                      onSubmit={(e) => {
                        e.preventDefault();
                        console.log(priceRange);
                      }}>
                      <div className="sidebar__item__form__price-range">
                        <input
                          type="number"
                          placeholder="₫ min"
                          onChange={(e) => {
                            setPriceRange((prev: any) => ({
                              ...prev,
                              min: e.target.value,
                            }));
                          }}
                        />
                        <span>-</span>
                        <input
                          type="number"
                          placeholder="₫ max"
                          onChange={(e) => {
                            setPriceRange((prev: any) => ({
                              ...prev,
                              max: e.target.value,
                            }));
                          }}
                        />
                      </div>
                      <button className="site-btn p-2 w-100">Apply</button>
                    </form>
                  </div>
                </div>
                <div className="sidebar__item">
                  <TopProducts
                    items={latestProducts}
                    header={"Latest Products"}
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
                          setSortBy(e.target.value as "1" | "-1" | undefined);
                        }}>
                        <option value={undefined} selected>
                          No select
                        </option>
                        <option value={1}>Ascending </option>
                        <option value={-1}>Descending </option>
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
                  <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                    <ProductCard {...item} />
                  </div>
                ))}
              </div>
              <div className="product__pagination">
                <Paging currentPage={parseInt(page as string)} total={total} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
SearchPage.getLayout = (page: React.ReactElement) => {
  return <ClientTemplate>{page}</ClientTemplate>;
};
export async function getStaticProps() {
  await connectDB();
  let latestProducts = await getLatestProducts();
  latestProducts = JSON.parse(JSON.stringify(latestProducts));

  return {
    props: {
      latestProducts: latestProducts,
    }, // will be passed to the page component as props
  };
}
