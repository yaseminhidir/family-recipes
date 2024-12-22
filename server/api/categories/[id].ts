import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id); 
  try {
    const category = await prisma.category.findUnique({
      where: {
        id: id, 
      },
      include: {
        recipes: true, 
      },
    });
    console.log("DB CATEGORY" , category)
    return category;
  } catch (error) {
    console.error('Error fetching category:', error);
    throw createError({ statusCode: 500, message: 'Unable to fetch category.' });
  } finally {
    await prisma.$disconnect();  
  }
});
