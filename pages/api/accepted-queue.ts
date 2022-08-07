// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

let redis = new Redis({
  host: "https://e97a-65-57-82-58.ngrok.io/",
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.method || req.method !== "GET") {
    return res.status(405);
  }
  const user = await redis.hget(`rid:${req.cookies.rid}`, "users");
  if (!user) {
    return res.status(401);
  }
  console.log(user);
  const userQ = await redis.hget(`aq:${JSON.parse(user).user}`, "true");
  if (!userQ) {
    return res.status(200).json(false);
  }
  await redis.hdel(`aq:${JSON.parse(user).user}`, "true");
  res.status(200).json(true);
}
