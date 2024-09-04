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
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useCollection } from "vuefire";
import { useRouter } from "vue-router";

export const useAppStore = defineStore("websiteStore", () => {
  const router = useRouter();

  const db = getFirestore();
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
  const visibility = ref([
    { id: 1, name: "Herkese Açık" },
    { id: 2, name: "Sadece Grup Üyeleri" },
  ]);

  function generateInviteCode() {
    const inviteCode = uuidv4();
    return { inviteCode };
  }

  const user =
    authUser?.value == null
      ? null
      : useDocument(doc(db, "users", authUser.value.uid), {
          once: true,
        });

  const hasGroup = computed(() => {
    return user?.value != null && user.value.groupIds.length > 0;
  });

  const recipes = useCollection(collection(db, "recipes"), {
    once: true,
  });

  function fetchPublicRecipes() {
    const res = query(collection(db, "recipes"), where("visibility", "==", 1));
    return useCollection(res, { once: true });
  }

  const categories = useCollection(collection(db, "categories"), {
    once: true,
  });

  const addRecipe = async (data) => {
    if (data.id) {
      const recipeDocRef = doc(db, "recipes", data.id);
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

  function fetchRecipesByGroupId(id) {
    const groupDocRef = doc(db, "groups", id);
    const res = query(
      collection(db, "recipes"),
      where("group_ids", "array-contains", groupDocRef)
    );
    return useCollection(res);
  }

  async function fetchRecipesByUserId() {
    const userRef = doc(db, "users", authUser.value.uid);

    const recipesRef = collection(db, "recipes");
    const q = query(recipesRef, where("user", "==", userRef));

    return useCollection(q);
  }

  const saveGroup = async (data) => {
    // Group adı
    // auth user 'a group id kaydedilcek.
    // gorpuinvites 'a group oluşturan userin tokeni kaydedilcek.
    // pop up açılcak. Pop up 'ta link olcak.
    try {
      if (data.id) {
        const groupDocRef = doc(db, "groups", data.id);
        await setDoc(groupDocRef, {
          ...data,
        });
      } else {
        var newGroup = await addDoc(collection(db, "groups"), {
          ...data,
        });
        const user = useDocument(doc(db, "users", authUser.value.uid));
        await updateDoc(doc(db, "users", authUser.value.uid), {
          groupIds: [...user.value.groupIds, newGroup.id],
        });
      }
      hasGroup.value = true;
      router.push(`/group/${data.id || newGroup.id}`);
    } catch (e) {
      console.log(e);
    }
  };

  function fetchMembers(groupId) {
    const res = query(
      collection(db, "users"),
      where("groupIds", "array-contains", groupId)
    );
    return useCollection(res);
  }

  const createInviteCode = async () => {
    const inviteTokenRef = collection(db, "inviteTokens");
    const token = generateInviteCode();
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 3);

    await addDoc(inviteTokenRef, {
      token: token.inviteCode,
      expireDate: expireDate,
    });
    const inviteLink = `https://localhost:3000/invitation/${token.inviteCode}`;
    return inviteLink;
  };
  async function isTokenValid(token) {
    try {
      const inviteTokenRef = collection(db, "inviteTokens");
      const q = query(inviteTokenRef, where("token", "==", token));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docData = querySnapshot.docs[0].data();

        const expireDate = docData.expireDate.toDate();
        const now = new Date();

        if (expireDate > now) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (e) {
      console.log("Token is not valid:", e);
      return false;
    }
  }
  const fetchGroupById = async () => {
    var q = query(
      collection(db, "groups"),
      where("__name__", "in", user.value.groupIds)
    );
    var docs = await getDocs(q);

    return docs.docs.map((x) => {
      return {
        id: x.id,
        ...x.data(),
      };
    });
  };

  return {
    hasGroup,
    recipes,
    addRecipe,
    categories,
    portions,
    units,
    user,
    fetchRecipeById,
    fetchPublicRecipes,
    visibility,
    fetchRecipesByGroupId,
    fetchRecipesByUserId,
    saveGroup,
    fetchGroupById,
    fetchMembers,
    createInviteCode,
    isTokenValid,
  };
});
