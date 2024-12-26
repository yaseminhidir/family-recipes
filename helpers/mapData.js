
export function mapRecipeData(data){
  if(Array.isArray(data)){
    for (const recipe of data) {
      mapRecipeData(recipe);
    }
    return
  }
  if(data.groups){
    data.groupIds = data.groups.map((x) => x.group.id);
    data.groups = data.groups.map((x) => x.group);
  }

  data.tags=JSON.parse(data.tags);
}

