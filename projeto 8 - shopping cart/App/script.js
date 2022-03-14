(() => {
  let buffer;
  const categoriesList = [];
  for (let index = 0; index < 4; index += 1) {
    buffer = new StaticCube('#categories');
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

(() => {
  const containerCart = document.getElementsByClassName('cart-itemSection')[0];
  const testItemCart = new itemCart('MLB');
  containerCart.appendChild(testItemCart.getContainer());
})();
