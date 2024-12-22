import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await requireUserSession(event);

  try {
    const token = await prisma.inviteTokens.findFirst({
      where: { inviteToken: body.token },
      include:{
        group:true
      }
    });

    
    if (!token || token.expireDate < new Date(Date.now())) {
      return { valid: false, message: "Süresi dolmuş veya hatalı bir token kullanılmış olabilir." };
    }
    var existing=await prisma.groupUser.count({
      where:{groupId:token.group.id,userId:session.user.id }
    });
    if(existing>0){
      return { valid: false, message: "Zaten grup üyesisiniz" };
    }
    return { valid: true, data: { token } };
  } catch (error) {
    console.error("Error fetching token:", error);
    return { success: false, message: error.message };
  }
});
