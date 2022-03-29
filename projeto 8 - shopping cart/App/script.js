// NOTE adicionando uma categoria
(async () => { 
  const categoriesList = await getCategories();
  let buffer;
  console.log(categoriesList);
  for (let index = 0; index < 4; index += 1) {
    // buffer = new StaticCube('#categories');
    buffer = new StaticCube('#categories', categoriesList[index].name);
    categoriesList.push(buffer);
  }
})();

// NOTE adicoinando item ao carrinho
(() => {
  const itemListElm = document.getElementsByClassName('itemList')[0];
  for (let index = 0; index < 6; index += 1) {
    let buffer = new Item();
    itemListElm.appendChild(buffer.getContainer());
  }
  // itemListElm.appendChild(item.getContainer());
})();

// NOTE adicionando item ao carrinho
(() => {
  const containerCart = document.getElementsByClassName('cart-itemSection')[0];
  const testItemCart = new itemCart('MLB');
  containerCart.appendChild(testItemCart.getContainer());
})();

// NOTE função para carregar a lista de produtos


// NOTE adicionando a oferta
(async () => {
  const categoriesList = await getCategories();
  let firstItem = await getProductsList(categoriesList[0].id);
  console.log(firstItem.results[0]);
  firstItem = firstItem.results[0];
  const containerOfferElm = document.getElementsByClassName('saleProduct-textContent')[0];

  const titleProductElm = document.getElementsByClassName('saleProduct-nameContent')[0].children[0];
  titleProductElm.innerText = firstItem.title;

  const priceElm = document.getElementById('saleProduct-priceContent').children[1];
  priceElm.innerText = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(firstItem.price);

  const imageElm = document.getElementsByClassName('saleProduct-image')[0];
  imageElm.src = firstItem.thumbnail;
})();
