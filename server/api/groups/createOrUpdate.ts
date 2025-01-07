import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const id = Number(body.id);
  const session = await requireUserSession(event);
  const data = {
    name: body.name,
    users: {
      create: [{ userId: session.user.id , isOwner:true }],
    },
  };
  try {
    if (body.id) {
      const deleteGroupUser = await prisma.groupUser.deleteMany({
        where: {
          groupId: id,
        },
      });
      const updatedGroup = await prisma.group.update({
        where: { id: id },
        data: data,
        include: {
          users: true,
        },
      });
      return { success: true, message:"Grup ismi başarılı bir şekilde güncellendi", group: updatedGroup };
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
