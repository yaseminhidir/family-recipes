import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    console.log("ID" , event.context.params?.id)
  const id = Number(event.context.params?.id); 
  try {
    const res = await prisma.recipe.findUnique({
      where: {
        id: id, 
      },
      include: {
        ingredients: {
            include:{
                unit:true
            }
        }, 
        groups:{
          include:{
            group:true
          }
        },
        category:true,
        level:true,
        portion:true,
      },
    });
    console.log("DB RECIPE" , res)
    return res;
  } catch (error) {
    console.error('Error fetching recipe:', error);
    throw createError({ statusCode: 500, message: 'Unable to fetch recipe.' });
  } finally {
    await prisma.$disconnect();  
  }
});
