import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

// POST /api/item/post
// Required fields in body: title
// Required fields in body: content
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, description } = req.body;
  const session = await getSession({ req });

  if (session) {
    const post = await prisma.item.create({
      data: {
        title: title,
        description: description,
        author: { connect: { email: String(session?.user?.email) } },
      },
    });
    res.json(post);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
