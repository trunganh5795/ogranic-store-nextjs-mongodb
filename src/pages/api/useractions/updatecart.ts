import connectDB from "../../../configs/database";
import User from "../../../models/userModel";
import Product from "../../../models/productModel";
import type { NextApiRequest, NextApiResponse } from "next";

import { handleError } from "../../../helpers";

type Data = {
  message: string;
};

export default async function isAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB();
  switch (req.method) {
    case "POST":
      await updateCart(req, res);
      break;
    default:
      return handleError(req, res, {});
  }
}

const updateCart = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req.headers.isauth === "0") {
      return handleError(req, res, { code: 401, message: "unAuthorized" });
    }
    const cart = req.body.cart as any[];
    let user = await User.findOne({ _id: req.headers._id });
    if (user) {
      user.cart = cart;
      await user.save();
      return res.status(200).send({ message: "ok" });
    } else {
      handleError(req, res, { code: 404, message: "user not found" });
    }
  } catch (err) {
    return handleError(req, res, {});
  }
};
