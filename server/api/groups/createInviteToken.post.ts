import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const newToken = await prisma.inviteTokens.create({
      data:{
        inviteToken:body.inviteToken,
        expireDate:body.expireDate,
        group: {
            connect:{ id: parseInt(body.groupId) },
        },
      },
    });

    return { success: true, newToken };
  } catch (error) {
    console.error("Error in tokenlink creation :", error);
    return { success: false, error: error.message };
  }
});
