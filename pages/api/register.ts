// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

let redis = new Redis(process.env.REDIS_URL!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.method || req.method !== "POST") {
    return res.status(405);
  }
  await redis.hset(req.body.username, { password: req.body.password });
  res.status(200).json(true);
}
