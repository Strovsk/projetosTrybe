(async () => { // adicionando uma categoria
  const categoriesList = await getCategories();
  let buffer;
  console.log(categoriesList);
  for (let index = 0; index < 4; index += 1) {
    // buffer = new StaticCube('#categories');
    buffer = new StaticCube('#categories', categoriesList[index].name);
    categoriesList.push(buffer);
  }
})();

(() => {
  const itemListElm = document.getElementsByClassName('itemList')[0];
  for (let index = 0; index < 6; index += 1) {
    let buffer = new Item();
    itemListElm.appendChild(buffer.getContainer());
  }
  // itemListElm.appendChild(item.getContainer());
})();

(() => { // adicionando item ao carrinho
  const containerCart = document.getElementsByClassName('cart-itemSection')[0];
  const testItemCart = new itemCart('MLB');
  containerCart.appendChild(testItemCart.getContainer());
})();
