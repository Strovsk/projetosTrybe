export default function getValuesByPrefixKey(foodObj, ingredientKeyPrefix) {
  return Object.entries(foodObj)
    .filter(([key, value]) => (
      key.includes(ingredientKeyPrefix) && value !== '' && value !== null
    ))
    .map(([, item]) => item);
}
