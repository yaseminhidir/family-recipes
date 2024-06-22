import { doc, addDoc, getFirestore, collection, getDoc, setDoc } from "firebase/firestore";
import { useCollection } from "vuefire";

export const useAppStore = defineStore("websiteStore", () => {
  const db = getFirestore();
  const hasGroup = ref(true);
  const authUser = useCurrentUser();
  const portions = ref(["1-2", "4-6", "8-10"]);
  const units = ref([
    "Su bardağı",
    "Çay bardağı",
    "kase",
    "Yemek kaşığı",
    "Tatlı kaşığı",
    "Çay Kaşığı",
    "adet",
    "gr",
    "kg",
    "ml",
    "l",
    "tutam",
    "demet",
  ]);
  const user = useDocument(doc(db, "users", authUser.value.uid));

  const recipes = useCollection(collection(db, "recipes"));

  const categories = useCollection(collection(db, "categories"), {
    once: true,
  });

  const addRecipe = async (data) => {
    const recipeDocRef = doc(db, "recipes", data.id); 
    const recipeSnapshot = await getDoc(recipeDocRef);
    if (recipeSnapshot.exists()) {
      await setDoc(recipeDocRef, {
        ...data,
        category: doc(db, "categories", data.category.id),
        user: doc(db, "users", authUser.value.uid),
      });
    } else {
      await addDoc(collection(db, "recipes"), {
        ...data,
        category: doc(db, "categories", data.category.id),
        user: doc(db, "users", authUser.value.uid),
      });
    }
  };
  async function fetchRecipeById(id) {
    const res = useDocument(doc(db, "recipes", id));
    return res.value;
  }

  return {
    hasGroup,
    recipes,
    addRecipe,
    categories,
    portions,
    units,
    user,
    fetchRecipeById,
  };
});
