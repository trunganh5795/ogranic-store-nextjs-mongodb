import connectDB from "../../../configs/database";
import User from "../../../models/userModel";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import { encodeToken, handleError } from "../../../helpers";
import { ErrorMessage } from "../../../configs/type";
connectDB();
type Data = {
  message: string;
  name: string;
  cart: any[];
  img: string;
};
export default async function loginAPI(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorMessage>
) {
  switch (req.method) {
    case "POST":
      await login(req, res);
      break;
    default:
      return handleError(req, res, {});
  }
}

const login = async (
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorMessage>
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne(
      { email },
      { _id: 1, name: 1, avatar: 1, cart: 1, password: 1 }
    );

    if (!user) {
      console.log("Hello:", user);
      return res.status(400).json({ message: "This user does not exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password." });

    const access_token = await encodeToken({ id: user._id });
    let tookenExpire = new Date();
    tookenExpire.setDate(tookenExpire.getDate() + 30);
    res.setHeader(
      "set-cookie",
      serialize("accessToken", `${access_token}`, {
        // maxAge: 5000,
        expires: tookenExpire,
        secure: true,
        httpOnly: true,
        sameSite: "lax",
        path: "/",
      })
    );
    res.status(200).send({
      message: "ok",
      img: user.avatar,
      cart: user.cart,
      name: user.name,
    });
  } catch (err) {
    console.log(err);
    return handleError(req, res, {});
  }
};
