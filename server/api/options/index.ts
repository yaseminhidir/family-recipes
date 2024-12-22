
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
    const levels = await prisma.level.findMany();
    const portions = await prisma.portion.findMany();
    const units = await prisma.unit.findMany();
    return { success: true, data: {levels, portions,units} };  
}
)
