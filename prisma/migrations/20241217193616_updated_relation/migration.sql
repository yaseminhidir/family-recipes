-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- CreateTable
CREATE TABLE "GroupRecipe" (
    "groupId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "GroupRecipe_pkey" PRIMARY KEY ("groupId","recipeId")
);

-- AddForeignKey
ALTER TABLE "GroupRecipe" ADD CONSTRAINT "GroupRecipe_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupRecipe" ADD CONSTRAINT "GroupRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
