const urlSelector = (type, string) => ({
  ingredient: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${string}`,
  id: `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${string}`,
  name: `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${string}`,
  random: 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
  firstLetter: `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${string}`,
  getButtomCategories: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
  category: `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${string}`,
  oneRandom: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
}[type]);

export default async function searchDrinkBy(type, value, callback) {
  const url = urlSelector(type, value);
  const arrayMaxLen = 12;
  let results = await fetch(url)
    .then((result) => result.json())
    .then((data) => data)
    .catch((error) => error);

  results = results.drinks;

  if (!results) {
    callback(results);
    return null;
  }
  results = results.length > arrayMaxLen ? results.slice(0, arrayMaxLen) : results;

  callback(results);
  return results;
}
