import {
  doc,
  addDoc,
  getFirestore,
  collection,
  getDoc,
  setDoc,
  query,
  where,
  updateDoc,
  getDocs,
  documentId,
  deleteDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useCollection } from "vuefire";
import { useRouter } from "vue-router";

export const useAppStore = defineStore("websiteStore", () => {
  const { loggedIn, user, clear: logout, fetch: fetchUser } = useUserSession();
  const router = useRouter();

  const db = getFirestore();
  const authUser = user;

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
  const visibility = ref([
    { value: null, title: "Tümü" },
    { value: true, title: "Herkese Açık" },
    { value: false, title: "Sadece Grup Üyeleri" },
  ]);
  const categories = ref(null);
  const options = ref(null);
  async function getOptions() {
    if (options.value != null) return options;
    const { data, error } = await useFetch("/api/options");
    if (error.value) {
      console.error("Error fetching options:", error.value);
    } else {
      options.value = data.value.data;
    }
    return options;
  }

  function generateInviteCode() {
    const inviteCode = uuidv4();
    return { inviteCode };
  }

  const hasGroup = computed(() => {
    return user?.value != null && user.value.groupIds.length > 0;
  });

  function recipes() {
    return useCollection(collection(db, "recipes"), {
      once: true,
    });
  }

  function fetchRecipesByVisibilty(value) {
    const res = query(
      collection(db, "recipes"),
      where("visibility", "==", value)
    );
    return useCollection(res, { once: true });
  }

  async function getCategories() {
    if (categories.value != null) return categories;
    const { data, error } = await useFetch("/api/categories");
    if (error.value) {
      console.log("Error fetching categories:", error.value);
    } else {
      categories.value = data.value.data;
    }
    return categories;
  }

  async function getCategory(id) {
    try {
      const { data, error } = await useFetch(`/api/categories/${id}`);
      if (error.value) {
        throw new Error("Error fetching category:", error);
      }
      return data.value;
    } catch (error) {
      console.error("Error in getCategory service:", error);
      throw error;
    }
  }
  async function getGroupById(id) {
    console.log("store grup id", id);
    try {
      const { data, error } = await useFetch(`/api/groups/getGroup?id=${id}`);
      if (error.value) {
        console.error("Error fetching groups:", error);
        throw new Error(data.message || "Failed to fetch groups");
      }
      console.log("store group", data.value.group);
      return data.value.group;
    } catch (error) {
      console.error("Error in getGroupById service:", error);
      throw error;
    }
  }
  async function getMyGroups() {
    try {
      const { data, error } = await useFetch(`/api/users/getMyGroups`);
      if (error.value) {
        console.error("Error fetching groups:", error);
        throw new Error(data.message || "Failed to fetch groups");
      }
      console.log("store group", data.value.groups);
      return data.value.groups.map((item) => item.group);
    } catch (error) {
      console.error("Error in getGroupById service:", error);
      throw error;
    }
  }
  async function getRecipeById(id) {
    try {
      const { data, error } = await useFetch(`/api/recipes/${id}`);
      if (error.value) {
        throw new Error("Error fetching recipe:", error);
      }
      console.log("GETRecıpe", data.value);
      data.value.groupIds = data.value.groups.map((x) => x.group.id);
      data.value.groups = data.value.groups.map((x) => x.group);
      return data.value;
    } catch (error) {
      console.error("Error in getRecipe service:", error);
      throw error;
    }
  }
  async function saveOrUpdateRecipe(data) {
    try {
      const url = data.id
        ? `/api/recipes/createOrUpdate?${new URLSearchParams({
            id: data.id,
          })}`
        : `/api/recipes/createOrUpdate`;
      const response = await $fetch(url, {
        method: "POST",
        body: { ...data },
      });
      if (response.success) {
        return response.recipe;
      } else {
        console.error("Error saving/updating recipe:", response.error);
        throw new Error(response.error);
      }
    } catch (error) {
      console.error("Error in saveOrUpdateRecipe function:", error);
      throw error;
    }
  }

  async function getMyRecipes() {
    try {
      const { data, error } = await useFetch("/api/recipes/getMine");
      if (error.value) {
        throw new Error("Error getMyRecipes:", error);
      }
      if (data.value.success) {
        return data.value.recipes;
      }
    } catch (error) {
      console.error("Error in getMyRecipes function:", error);
      throw error;
    }
  };

  const saveGroup = async (data) => {
    try {
      const url = data.id
        ? `/api/groups/createOrUpdate?${new URLSearchParams({
            id: data.id,
          })}`
        : `/api/groups/createOrUpdate`;
      const res = await $fetch(url, {
        method: "POST",
        body: { ...data },
      });
      if (res.success) {
        return res.group;
      } else {
        console.error("Error saving/updating group:", res.error);
        throw new Error(res.error);
      }
    } catch (error) {
      console.error("Error in saveOrUpdateGroup function:", error);
      throw error;
    }
  };

  const createInviteCode = async (groupId) => {
    const tokenData = {
      groupId,
      inviteToken: generateInviteCode().inviteCode,
      expireDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    };
    try {
      const { data, error } = await useFetch("/api/groups/createInviteToken", {
        method: "post",
        body: tokenData,
      });
      if (error.value) {
        throw new Error("Error invite link:", error);
      }
      if (data.value.success) {
        const inviteLink = `http://localhost:3000/invitation/${data.value.newToken.inviteToken}`;
        return inviteLink;
      }
    } catch (error) {
      console.error("Error in invite code function:");
      throw error;
    }
  };

  async function isTokenValid(token) {
    try {
      const { data, error } = await useFetch("/api/groups/isTokenValid", {
        method: "post",
        body: {token},
      });
      if (error.value) {
        throw new Error("Error isTokenValid link:", error);
      }
     return data.value;
   
    } catch (error) {
      console.error("Error in isTokenValid function:");
      throw error;
    }
  }
  async function joinGroup(token) {
    try{
      const {data, error} = await useFetch("/api/groups/joinGroup", {
        method:"post",
        body:{token}
      })
      return data.value.data
    }
    catch(error){
      console.log(error)
    }
  }
  async function leaveGroup(groupId) {
    try {
      const userRef = doc(db, "users", authUser.value.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        let groupIds = userData.groupIds || [];

        if (groupIds.includes(groupId)) {
          groupIds = groupIds.filter((id) => id !== groupId);
          await updateDoc(userRef, { groupIds });
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  async function register(user) {
    const res = await $fetch("/api/register", {
      method: "post",
      body: user,
    });
    fetchUser();
  }
  async function login(user) {
    const res = await $fetch("/api/login", {
      method: "post",
      body: user,
    });

    if (res.success) {
      fetchUser();
      router.push("/");
    }
    console.log("BODYUSER", res);
  }
  return {
    register,
    hasGroup,
    recipes,
    saveOrUpdateRecipe,
    getCategory,
    getOptions,
    getCategories,
    getGroupById,
    getRecipeById,
    getMyGroups,
    units,
    user,
    logout,
    login,
    fetchRecipesByVisibilty,
    getMyRecipes,
    visibility,
    saveGroup,
    createInviteCode,
    isTokenValid,
    joinGroup,
    leaveGroup,
  };
});
