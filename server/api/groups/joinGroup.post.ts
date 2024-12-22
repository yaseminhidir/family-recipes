import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const session = await requireUserSession(event);
  try {
    const res = await prisma.inviteTokens.findFirst({
      where: { inviteToken: body.token },
      include: {
        group:true
      },

    });
    if(res){
        const groupUser=await prisma.groupUser.create({
            data:{
              groupId:res.groupId,
              userId:session.user.id,
            },
            include:{
                group:true
            }
        })
        await prisma.inviteTokens.deleteMany({
            where: { inviteToken: body.token },
        })
        return { success: true,  data:groupUser.group };
    }
    else{
        return { success: false, message:"geçersiz token" };
    }
 
  } catch (error) {
    console.error("Error in joingrup creation :", error);
    return { success: false, error: error.message };
  }
});
