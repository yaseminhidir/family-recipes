import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  try {
    await prisma.recipe.update({
      where: { id },
      data: {
        viewCount: { increment: 1 },
      },
    });
    const recipe = await prisma.recipe.findUnique({
      where: {
        id: id,
      },
      include: {
        ingredients: {
          include: {
            unit: true,
          },
        },
        groups: {
          include: {
            group: true,
          },
        },
        category: true,
        level: true,
        portion: true,
      },
    });

    return recipe;
  } catch (error) {
    throw createError({ statusCode: 500, message: "Unable to fetch recipe." });
  } finally {
    await prisma.$disconnect();
  }
});
