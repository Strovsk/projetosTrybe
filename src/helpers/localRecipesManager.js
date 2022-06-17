export function isDoneRecipe(foodId) {
  const doneRecipeItem = localStorage.getItem('doneRecipes');
  if (!doneRecipeItem) return false;
  const doneRecipes = JSON.parse(doneRecipeItem);
  return doneRecipes.some(({ id }) => foodId === id);
}

export function isInProgressRecipe(foodType, foodId) {
  const keyItem = localStorage.getItem('inProgressRecipes');
  if (!keyItem) return false;
  const inProgressRecipes = Object.keys(JSON.parse(keyItem)[foodType]);
  return inProgressRecipes.includes(foodId);
}

export function isFavoriteRecipe(foodId) {
  const keyItem = localStorage.getItem('favoriteRecipes');
  if (!keyItem) return false;
  const favoriteRecipes = JSON.parse(keyItem).map((element) => element.id);
  return favoriteRecipes.includes(foodId);
}

export function setDoneRecipe(foodInfo = {
  image: 'recipe image link',
  category: 'recipe category',
  name: 'recipe name',
  date: 'recipe date',
  id: 'recipe id',
  type: 'recipe type',
  nationality: 'recipe nationality',
  alcoholicOrNot: '',
  doneDate: 'done recipe date format(dd/mm/yyyy)',
  tags: ['food tags'],
}) {
  const currentDoneRecipesList = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
  if (!foodInfo.tags !== 'object') {
    foodInfo.tags = [];
  } else if (foodInfo === 'string') {
    foodInfo.tags = foodInfo.tags.split(',');
  }
  currentDoneRecipesList.push(foodInfo);
  localStorage.setItem('doneRecipes', JSON.stringify(currentDoneRecipesList));
}

export function getDoneRecipes() {
  return JSON.parse((localStorage.getItem('doneRecipes') || '[]'));
}

export function saveFavorite(foodFavorite = {
  id: 'food id',
  type: 'food type',
  nationality: 'food nationality',
  category: 'food category',
  alcoholicOrNot: 'is alcoholic',
  name: 'food name',
  image: 'imageThumb',
}) {
  const keyItem = JSON.parse(
    localStorage.getItem('favoriteRecipes') || JSON.stringify([]),
  );
  if (foodFavorite.id === 'food id') return;
  keyItem.push(foodFavorite);
  localStorage.setItem('favoriteRecipes', JSON.stringify(keyItem));
}

export function deleteFavoriteBy(key = 'id', value) {
  console.log('pedido para remover o elemento ', value);
  const keyItem = localStorage.getItem('favoriteRecipes');
  console.log('pedido obtido', keyItem);
  if (!keyItem) return;
  const favoriteRecipes = JSON.parse(keyItem);
  const filtered = favoriteRecipes.filter((item) => item[key] !== value);
  console.log(filtered);
  localStorage.setItem('favoriteRecipes', JSON.stringify(filtered));
}

export function deleteInPogressRecipeById(type, foodId) {
  const typeFormatted = ({ foods: 'meals', drinks: 'cocktails' }[type]);
  // console.log(typeFormatted);
  let result = localStorage.getItem('inProgressRecipes');
  if (!result) return;
  result = JSON.parse(result);
  if (!result[typeFormatted][foodId]) return;
  delete result[typeFormatted][foodId];
  localStorage.setItem('inProgressRecipes', JSON.stringify(result));
  // console.log(localStorage.getItem('inProgressRecipes'));
}

export function setInProgressRecipe(type, foodId, ingredients) {
  const typeFormatted = ({ foods: 'meals', drinks: 'cocktails' }[type]);
  // console.log(typeFormatted);
  const initialState = { cocktails: {}, meals: {} };
  const result = (
    JSON.parse((localStorage.getItem('inProgressRecipes') || initialState))
  );

  result[typeFormatted][foodId] = ingredients;

  if (ingredients.length === 0 || !ingredients) {
    return deleteInPogressRecipeById(type, foodId);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(result));

  // console.log(localStorage.getItem('inProgressRecipes'));
}

export function getInProgressRecipesById(type, foodId) {
  const typeFormatted = ({ foods: 'meals', drinks: 'cocktails' }[type]);
  const result = JSON.parse(localStorage.getItem('inProgressRecipes') || []);
  if (result.length === 0) return [];
  if (!result[typeFormatted]) return [];
  if (!result[typeFormatted][foodId]) return [];
  return result[typeFormatted][foodId];
}
