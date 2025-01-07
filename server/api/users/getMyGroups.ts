import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const session = await requireUserSession(event);
  try {
    const res = await prisma.user.findFirst({
      where: {
        id: session.user?.id,
      },
      include: {
        groups: {
          orderBy: {
            groupId: "desc",
          },
          include: {
            group: {
              include: {
                _count: {
                  select: { users: true, recipes: true },
                },
                recipes: {
                  include: {
                    recipe: {
                      include: {
                        category: true,
                        level: true,
                        portion: true,
                      },
                    },
                  },
                  take: 4,
                },
               
              },
            },
          },
        },
      },
    });

    return { success: true, groups: res.groups };
  } catch (error) {
    console.error("Error fetching groups:", error);
    return { success: false, message: error.message };
  }
});
