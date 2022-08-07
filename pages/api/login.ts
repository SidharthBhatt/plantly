// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import { setCookie } from "cookies-next";
import { randomUUID } from "crypto";

let redis = new Redis();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.method || req.method !== "POST") {
    return res.status(405);
  }
  const id = randomUUID();
  const user = await redis.hget(req.body.username, 'users');
  if (!user) {
    return res.status(401);
  }
  if (JSON.parse(user)!.password !== req.body.password) {
    return res.status(401);
  }
  await redis.hset(`rid:${id}`, { user: req.body.username })
  setCookie('rid', id, { req, res });
  res.status(200).json(id);
}
