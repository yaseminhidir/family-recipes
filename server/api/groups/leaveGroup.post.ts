import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await requireUserSession(event);
  try {
    const res = await prisma.groupUser.delete({
      where: { groupId_userId:{groupId:parseInt(body.groupId),userId:session.user.id} },
    
    });
    return {success:true}
 
  } catch (error) {
    console.error("Error in joingrup creation :", error);
    return { success: false, error: error.message };
  }
});
