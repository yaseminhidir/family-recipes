import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const recipes = await prisma.recipe.findMany({
    where: {
      visibility: body.filters.visibility,
    },
    include: {
      ingredients: {
        include: {
          unit: true,
        },
      },
      user: {
        select:{
          firstName:true,
          lastName:true
        }
      },
      category: true,
      level: true,
      portion: true,
    },
  });

  if (!recipes) {
    throw createError({ statusCode: 404, message: "Recipes not found" });
  }
  return { success: true, recipes };
});
