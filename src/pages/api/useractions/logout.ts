import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../configs/database';
// import { serialize } from 'cookie';
import { handleError } from '../../../helpers';
type Data = {
  message: string;
};
export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectDB();
  switch (req.method) {
    case 'POST':
      // res.setHeader(
      //   'set-cookie',
      //   serialize('accessToken', ``, {
      //     maxAge: 0,
      //     path: '/',
      //   })
      // );
      res.removeHeader('accessToken');
      res.send({ message: 'OK' });
      //   res.redirect(200,'/') // redirect chỉ works với form action="/...."
      break;
    default:
      return handleError(req, res, {});
  }
}
