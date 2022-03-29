// NOTE adicionando uma categoria
(async () => { 
  const categoriesList = await getCategories();
  let buffer;
  console.log(categoriesList);
  for (let index = 0; index < 4; index += 1) {
    // buffer = new StaticCube('#categories');
    buffer = new StaticCube('#categories', categoriesList[index].name, () => renderProducts(categoriesList[index].id));
    categoriesList.push(buffer);
  }
})();

// NOTE adicionando itens na lista de produtos
/* (() => {
  const itemListElm = document.getElementsByClassName('itemList')[0];
  for (let index = 0; index < 6; index += 1) {
    let buffer = new Item();
    itemListElm.appendChild(buffer.getContainer());
  }
  // itemListElm.appendChild(item.getContainer());
})(); */
const addItemToProductList = (container, element) => {
  let buffer = new Item(element.title, element.description, element.thumbnail, element.price, 12);
  container.appendChild(buffer.getContainer());
};

// NOTE adicionando item ao carrinho
(() => {
  const containerCart = document.getElementsByClassName('cart-itemSection')[0];
  const testItemCart = new itemCart('MLB');
  containerCart.appendChild(testItemCart.getContainer());
})();

// NOTE função para carregar a lista de produtos
const renderProductsList = (productsList) => {
  const itemListElm = document.getElementsByClassName('itemList')[0];
  itemListElm.innerHTML = '';
  productsList.forEach(element => addItemToProductList(itemListElm, element));
}

// NOTE adicionando a oferta
const renderProducts = async (categoryId) => {
  let categoriesList = categoryId || await getCategories();
  categoriesList = typeof categoriesList === 'string' ? [{id: categoryId}]: categoriesList;
  let productsList = await getProductsList(categoriesList[0].id);
  console.log(productsList.results[0]);
  productsList = productsList.results;
  firstItem = productsList[0];

  const titleProductElm = document.getElementsByClassName('saleProduct-nameContent')[0].children[0];
  titleProductElm.innerText = firstItem.title;

  const priceElm = document.getElementById('saleProduct-priceContent').children[1];
  priceElm.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(firstItem.price);

  const imageElm = document.getElementsByClassName('saleProduct-image')[0];
  imageElm.src = firstItem.thumbnail;

  renderProductsList(productsList.slice(1, undefined));
};

renderProducts();
