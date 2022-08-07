// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";

let redis = new Redis();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.method || req.method !== "GET") {
    return res.status(405);
  }
  // const user = await redis.hget(`rid:${req.cookies.rid}`, "users");
  // if (!user) {
  //   return res.status(401);
  // }
  const plants = await redis.lrange("plants", 0, -1);
  res.status(200).send(plants.map((plant) => JSON.parse(plant)));
}
