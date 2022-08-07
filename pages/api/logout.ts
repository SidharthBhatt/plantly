// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import { deleteCookie } from "cookies-next";

let redis = new Redis({
    host: "https://e97a-65-57-82-58.ngrok.io/",
  });

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.method || req.method !== "POST") {
    return res.status(405);
  }
  await redis.hdel(`rid:${req.cookies.rid}`, "users");
  deleteCookie("rid");
  res.status(200).json(true);
}
