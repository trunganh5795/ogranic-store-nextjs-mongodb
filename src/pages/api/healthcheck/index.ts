/* eslint-disable @typescript-eslint/no-use-before-define */
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function isAuthAPI(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  return res.status(200).end('OK!');
}
