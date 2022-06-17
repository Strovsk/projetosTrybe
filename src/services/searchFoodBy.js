const urlSelector = (type, string) => ({
  ingredient: `https://www.themealdb.com/api/json/v1/1/filter.php?i=${string}`,
  id: `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${string}`,
  name: `https://www.themealdb.com/api/json/v1/1/search.php?s=${string}`,
  random: 'https://www.themealdb.com/api/json/v1/1/search.php?s=',
  firstLetter: `https://www.themealdb.com/api/json/v1/1/search.php?f=${string}`,
  getButtomCategories: 'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
  category: `https://www.themealdb.com/api/json/v1/1/filter.php?c=${string}`,
  nationality: `https://www.themealdb.com/api/json/v1/1/filter.php?a=${string}`,
  oneRandom: 'https://www.themealdb.com/api/json/v1/1/random.php',
}[type]);

export default async function searchFoodBy(type, value, callback) {
  const url = urlSelector(type, value);
  const arrayMaxLen = 12;
  let results = await fetch(url)
    .then((result) => result.json())
    .then((data) => data)
    .catch((error) => error);

  results = results.meals;
  if (!results) {
    callback(results);
    return null;
  }
  results = results.length > arrayMaxLen ? results.slice(0, arrayMaxLen) : results;

  callback(results);
  return results;
}
