import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const categories = await prisma.category.findMany( {
    include:{
        _count: {
          select: { recipes:true },
        },
    }
  });
  if (!categories) {
    throw createError({ statusCode: 404, message: 'Categories not found' });
  }
  return { success: true, data: categories };
});