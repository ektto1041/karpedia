import type { NextApiRequest, NextApiResponse } from 'next';

type ErrorRes = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string | ErrorRes>
) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const page = req.query.page as string

  try {
    await res.revalidate(`/${page}`);
    return res.json('revalidation success!');
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: 'Error revalidating' })
  }
}
