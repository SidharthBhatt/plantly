// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Redis from "ioredis";
import { setCookie } from "cookies-next";
import { randomUUID } from "crypto";

let redis = new Redis(6379);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  if (!req.method || req.method !== "POST") {
    return res.status(405);
  }
  const id = randomUUID();
  await redis.hset(`user:${req.body.username}`, 'users', JSON.stringify({ password: req.body.password }));
  await redis.hset(`rid:${id}`, 'users', JSON.stringify({ user: req.body.username }))
  setCookie('rid', id, { req, res });
  res.status(200).json(id);
}
