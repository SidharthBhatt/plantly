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
  if (!req.method || req.method !== "POST") {
    return res.status(405);
  }
  const user = await redis.hget(`rid:${req.cookies.rid}`, "users");
  if (!user) {
    return res.status(401);
  }
  const post = {
    name: req.body.name,
    description: req.body.description,
    image: req.body.image,
    owner: req.body.owner,
    // geo: req.body.geo,
  };
  await redis.rpush("plants", JSON.stringify(post));
  res.status(200).send(post);
}
