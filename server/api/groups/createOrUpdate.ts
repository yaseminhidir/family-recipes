import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const query = getQuery(event);
  const id = Number(query.id);
  const session = await requireUserSession(event);
  const data = {
    name: body.name,
    users: {
      create: [{ userId: session.user.id }],
    },
  };
  try {
    if (query.id) {
      const updatedGroup = await prisma.group.update({
        where: { id: parseInt(query.id as string) },
        data: data,
      });
      return { success: true, group: updatedGroup };
    }
    const newGroup = await prisma.group.create({
      data,
    });

    return { success: true, group: newGroup };
  } catch (error) {
    console.error("Error in group creation or update:", error);
    return { success: false, error: error.message };
  }
});
