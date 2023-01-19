import connectDB from "../../../configs/database";
import User from "../../../models/userModel";
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
    case "GET":
      await isAuth(req, res);
      break;
    default:
      return handleError(req, res, {});
  }
}

const isAuth = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    if (req.headers.isauth === "0") {
      return handleError(req, res, { code: 401, message: "unAuthorized" });
    }
    const user = await User.findOne(
      { _id: req.headers._id },
      { password: 0, role: 0 }
    );
    res.status(200).send(user);
  } catch (err) {
    return handleError(req, res, {});
  }
};
