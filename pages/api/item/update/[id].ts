import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

// UPDATE /api/item/update/:id
// Required fields in body: title
// Required fields in body: description
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const itemId = req.query.id;
  const { title, description } = req.body;

  const session = await getSession({ req });

  if (req.method === "UPDATE") {
    if (session) {
      const post = await prisma.item.updateMany({
        where: {
          author: { email: session?.user?.email },
          id: Number(itemId),
        },
        data: {
          title: title,
          description: description,
        },
      });

      res.json(post);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
