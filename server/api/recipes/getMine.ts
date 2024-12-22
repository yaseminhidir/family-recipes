import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event);
  const recipes = await prisma.recipe.findMany( {
    where:{
        userId:session.user.id
    },
    include: {
      ingredients: {
          include:{
              unit:true
          }
      }, 
      category:true,
      level:true,
      portion:true,
    },
  });
  console.log("recipesres",recipes)

  if (!recipes) {
    throw createError({ statusCode: 404, message: 'Recipes not found' });
  }
  return { success: true, recipes };
});