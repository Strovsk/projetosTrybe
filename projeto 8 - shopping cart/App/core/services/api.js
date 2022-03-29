async function getCategories() {
  const prList = await fetch('https://api.mercadolibre.com/sites/MLB/categories#json').then(response => response.json());
  return prList;
}

async function getProductsList(categoryId) {
  const prList = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`).then(result => result.json());
  return prList;
}

async function searchProduct(search) {
  const prList = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${search}`).then(result => result.json());
  return prList;
}
