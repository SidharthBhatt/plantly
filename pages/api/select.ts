// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

let redis = new Redis();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.method || req.method !== "POST") {
    return res.status(405);
  }
  const user = await redis.hget(`rid:${req.cookies.rid}`, "users");
  if (!user) {
    return res.status(401);
  }
  await redis.lrem("plants", -1, JSON.stringify(req.body));
  console.log(req.body);
  await redis.hset(`aq:${req.body.owner}`, "true", "users");
  res.status(200).json(true);
}
