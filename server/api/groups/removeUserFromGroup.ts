import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log("remove user body" , body)
  try {
    const res = await prisma.groupUser.delete({
      where: { groupId_userId:{groupId:body.groupId,userId:body.userId} },
    });
    return {success:true}
  } catch (error) {
    console.error("Error in joingrup creation :", error);
    return { success: false, error };
  }
});
