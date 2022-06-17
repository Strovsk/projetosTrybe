function configLocalStorage() {
  // if (isConfigured()) return;
  if (!localStorage.getItem('mealsToken')) {
    localStorage.setItem('mealsToken', 1);
  }
  if (!localStorage.getItem('cocktailsToken')) {
    localStorage.setItem('cocktailsToken', 1);
  }
  if (!localStorage.getItem('user')) {
    localStorage.setItem('user', JSON.stringify({ email: '' }));
  }
  if (!localStorage.getItem('doneRecipes')) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  if (!localStorage.getItem('favoriteRecipes')) {
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
  }
  if (!localStorage.getItem('inProgressRecipes')) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      cocktails: {},
      meals: {},
    }));
  }
}

export function setEmailToLocalStorage(email) {
  configLocalStorage();
  localStorage.setItem('user', JSON.stringify({ email }));
}

export function getAllFromLocalStorage() {
  configLocalStorage();
  const toReturn = {};
  const keysList = Object.keys(localStorage);
  let key = '';
  for (let i = 0; i < localStorage.length; i += 1) {
    key = keysList[i];
    toReturn[`${key}LocalStorage`] = localStorage.getItem(key);
  }
  return toReturn;
}
