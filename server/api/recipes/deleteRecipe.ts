import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  try {
    const deleteGroupRecipe = prisma.groupRecipe.deleteMany({
      where: { recipeId: body.id },
    });

    const deleteIngredients = prisma.ingredient.deleteMany({
      where: { recipeId: body.id },
    });
    const deleteRecipe = prisma.recipe.deleteMany({
      where: {
        id: body.id,
      },
    });

    const transaction = await prisma.$transaction([
        deleteGroupRecipe,
        deleteIngredients,
      deleteRecipe,
     
    ]);
    return {
      success: true,
      message: "Recipe and related data deleted successfully.",
    };
  } catch (e) {
    console.error("error deleting recipe", e);
    return {
      success: false,
      message: "Failed to delete recipe and related data.",
    };
  }
});
