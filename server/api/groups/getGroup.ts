import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id=Number(query.id)

  try {
    const group = await prisma.group.findUnique({
      where: {
        id
      },
      include: {
        users:{
          include:{
            user:true
          }
        },
        recipes: {
          include: {
            recipe:{
              include:{
                category:true,
                level:true,
                portion:true,
              }
            } 
          },
        
        },
      },
    });
    
    return { success: true, group };
  } catch (error) {
    console.error("Error fetching groups:", error);
    return { success: false, message: error.message };
  }
});