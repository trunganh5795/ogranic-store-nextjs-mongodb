import connectDB from "../../../configs/database";
import User from "../../../models/userModel";
import Product from "../../../models/productModel";
import type { NextApiRequest, NextApiResponse } from "next";

import { handleError } from "../../../helpers";

type Data = {
  message: string;
};

interface Address {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  postcode: number;
  defaultAdd: boolean;
}
interface AddressResponse {
  addList: Address[];
}
export default async function isAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data | (AddressResponse & Data)>
) {
  await connectDB();
  switch (req.method) {
    case "POST":
      await addNewAddress(req, res);
      break;
    default:
      return handleError(req, res, {});
  }
}

const addNewAddress = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | (AddressResponse & Data)>
) => {
  try {
    if (req.headers.isauth === "0") {
      return handleError(req, res, { code: 401, message: "unAuthorized" });
    }
    let { name, address, city, state, postcode, defaultAdd, phone } =
      req.body as Address;
    let userId = req.headers._id;
    let user = await User.findOne({ _id: userId });
    console.log(name, address, city, state, postcode);
    if (user.address.length < 5) {
      if (user.address.length === 0) {
        defaultAdd = true;
      }
      user.address = [
        ...user.address,
        {
          name,
          address,
          city,
          state,
          phone,
          postcode,
          defaultAdd,
        },
      ];
      await user.save();
      res
        .status(200)
        .send({ message: "OK", addList: user.address as Address[] });
    } else {
      handleError(req, res, {
        code: 400,
        message: "The maximum number of addresses has been reached",
      });
    }
  } catch (err) {
    console.log(err);
    return handleError(req, res, {});
  }
};
