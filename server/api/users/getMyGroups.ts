import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  try {
    const res = await prisma.user.findFirst({
      where: {
        id:session.user?.id,
      },
      include: {
        groups: {
          include: { group: true } // group bilgileri dahil ediliyor
        },
      },
    });
  
    return { success: true, groups:res.groups};
  } catch (error) {
    console.error("Error fetching groups:", error);
    return { success: false, message: error.message };
  }
});