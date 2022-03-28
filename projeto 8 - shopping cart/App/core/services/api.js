async function getCategories() {
  const prList = await fetch('https://api.mercadolibre.com/sites/MLB/categories#json').then(response => response.json());
  return prList;
}