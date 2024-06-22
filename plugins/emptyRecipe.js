export default defineNuxtPlugin((nuxtApp) => {
  const emptyRecipe = {
    id: "",
    category: "",
    description: "",
    group_ids: [1, 2, 3],
    image: "",
    ingredients: [],
    portion: "",
    tite: "",
    user: "",
    username: "",
  };
  return {
    provide: {
      emptyRecipe,
    },
  };
});
