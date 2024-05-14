

export const useAppStore = defineStore("websiteStore", () => {
  const hasGroup = ref(true);
  const userP=getCurrentUser();
  
  const units= ref(["Su bardağı" , "Çay bardağı" , "kase", "Yemek kaşığı" , "Tatlı kaşığı" , "Çay Kaşığı" , "adet", "gr", "kg" , "ml" , "l" ,  "tutam", "demet" , ])
  const getRecipes = async  () =>{
    const user=await userP;
    return [
      {
        title:"Tarhana Çorbası",
        ingredients:[
          {measurement: "2" , unit:"Yemek kaşığı" , type:"Toz tarhana"},
          {measurement: "1" , unit:"Yemek kaşığı" , type:"Toz tarhana" , description:"Su eklendikten sonra ilave edilecek"},
          {measurement: "1" , unit:"Yemek kaşığı" , type:"Tereyağı"},
          {measurement: "1" , unit:"Çay kaşığı" , type:"Sıvı yağ"},
          {measurement: "1" , unit:"Yemek kaşığı" , type:"Salça"},
          {measurement: "5" , unit:"Su Bardağı" , type:"Sıcak Su"},
        ],
        category:"Çorba",
        image:"https://www.kevserinmutfagi.com/wp-content/uploads/2008/11/tarhana_corbasi2-1.jpg",
        description:"",
        portion:"4-6",
        user_id:user.uid,
        username:user.displayName,
        group_ids:[1,2]
      },
    ]
  }
  return { hasGroup , getRecipes};
});
