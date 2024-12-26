export default defineNuxtPlugin((nuxtApp) => {
  const emptyRecipe = {
    id: "",
    categoryId: null,
    description: "",
    groupIds: [],
    image: "",
    ingredients: [],
    portionId: null,
    title: "",
    user: "",
    username: "",
    visibility:true,
    levelId:null,
    tags:[],
  };
  return {
    provide: {
      emptyRecipe,
    },
  };
});
