import { User } from "@nextui-org/react";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../../lib/prisma";

// DELETE /api/item/delete/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const itemId = req.query.id;
  const session = await getSession({ req });

  if (req.method === "DELETE") {
    if (session) {
      const post = await prisma.item.deleteMany({
        where: {
          author: { email: session?.user?.email },
          id: Number(itemId),
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
