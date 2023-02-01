import {
  Product as ProductType,
  ResponseMessage,
} from "./../../../configs/type";
import Product from "../../../models/productModel";
import type { NextApiRequest, NextApiResponse } from "next";
import { handleError } from "../../../helpers";
import connectDB from "../../../configs/database";
import { ITEM_PER_PAGE } from "../../../configs/constants";

type Param = {
  currentProduct: string;
  test: string[];
};
export const searchProduct = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseMessage<ProductType[]> & { total: number }>
) => {
  let { category, query, page, sort } = req.query;
  let sortOption = {};
  let itemsSkip: number = 0;
  if (page) {
    itemsSkip = (parseInt(page as string) - 1) * ITEM_PER_PAGE;
  }
  let queryString = {};
  if (category)
    queryString = { ...queryString, category: parseInt(category as string) };
  if (query) {
    queryString = { ...queryString, $text: { $search: query as string } };

    if (sort === "-1" || sort === "1") {
      sortOption = {
        score: { $meta: "textScore" },
        price: sort,
        sold: 1,
        _id: 1,
      };
    } else {
      sortOption = { score: { $meta: "textScore" }, sold: 1, _id: 1 };
    }

    let data: { count: number; data: ProductType[] }[] =
      await Product.aggregate([
        {
          $match: queryString,
        },
        { $sort: sortOption },
        {
          $facet: {
            total: [{ $group: { _id: null, count: { $sum: 1 } } }],

            data: [{ $skip: itemsSkip }, { $limit: ITEM_PER_PAGE }],
          },
        },
        {
          $unwind: {
            path: "$total",
          },
        },
        {
          $project: {
            count: "$total.count",
            data: "$data",
          },
        },
      ]);
    if (data.length) {
      return res
        .status(200)
        .send({ message: "ok", data: data[0].data, total: data[0].count });
    } else {
      return res.status(200).send({ message: "ok", data: [], total: 0 });
    }
  }
  //////////////////////
  if (sort === "-1" || sort === "1") {
    sortOption = { price: parseInt(sort), sold: 1, _id: 1 };
  } else {
    sortOption = { sold: 1, _id: 1 };
  }
  console.log(sortOption);
  let data: { count: number; data: ProductType[] }[] = await Product.aggregate([
    {
      $match: queryString,
    },
    { $sort: sortOption },
    {
      $facet: {
        total: [{ $group: { _id: null, count: { $sum: 1 } } }],

        data: [{ $skip: itemsSkip }, { $limit: ITEM_PER_PAGE }],
      },
    },
    {
      $unwind: {
        path: "$total",
      },
    },
    {
      $project: {
        count: "$total.count",
        data: "$data",
      },
    },
  ]);
  if (data.length) {
    return res
      .status(200)
      .send({ message: "ok", data: data[0].data, total: data[0].count });
  } else {
    return res.status(200).send({ message: "ok", data: [], total: 0 });
  }
};

export default async function isAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse<ResponseMessage<ProductType[]>>
) {
  await connectDB();
  switch (req.method) {
    case "GET":
      await searchProduct(req, res);
      break;
    default:
      return handleError(req, res, {});
  }
}
