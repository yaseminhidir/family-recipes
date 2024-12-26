import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event); 
  const query = getQuery(event); 
  const session = await requireUserSession(event);

  const data={
    title: body.title,
    description: body.description,
    image: body.image,
    userId: session.user.id,
    category: { connect: { id: body.categoryId } },
    portion: { connect: { id: body.portionId } },
    visibility: body.visibility ?? true,
    level: { connect: { id: body.levelId } },
    groups: {
      create: body.groupIds.map((groupId:number) => ({
        group: { connect: { id: groupId } },
      })),
    },
    tags:JSON.stringify(body.tags),
    ingredients: {
      create: body.ingredients.map((ingredient: any) => ({
        type: ingredient.type,
        autofocus: ingredient.autofocus,
        measurement: ingredient.measurement,
        unit: {
          connect: {
            id: ingredient.unitId ,
          },
        },
      })),
    },
  }

  try {
    if (query.id) {
      const deleteGroupRecipe = await prisma.groupRecipe.deleteMany({
        where: {
            recipeId:parseInt(query.id as string),
        },
      });
      const deleteIngredients = await prisma.ingredient.deleteMany({
        where: {
            recipeId:parseInt(query.id as string),
        },
      });
      const updatedRecipe = await prisma.recipe.update({
        where: { id: parseInt(query.id as string) },
        data: data,
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
        }
      });
      return { success: true, recipe: updatedRecipe };
    }
    const newRecipe = await prisma.recipe.create({
      data: {
        ...data,
        createdAt: new Date(Date.now()),
      },
    });

    return { success: true, recipe: newRecipe };
  } catch (error) {
    console.error('Error in recipe creation or update:', error);
    return { success: false, error: error.message };
  }
});