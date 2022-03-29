// NOTE adicionando uma categoria
(async () => { 
  const categoriesList = await getCategories();
  let buffer;
  console.log(categoriesList);
  for (let index = 0; index < 4; index += 1) {
    buffer = new StaticCube('#categories', categoriesList[index].name, () => renderProducts(categoriesList[index].id));
    categoriesList.push(buffer);
  }
})();

// NOTE adicionando item na lista de produtos
const addItemToProductList = (container, element) => {
  let buffer = new Item(element.title, element.shipping.free_shipping ? 'Entrega gratuita': 'Frete barato', element.thumbnail, element.price, element.installments.quantity);
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

// NOTE search products
async function searchAction() {
  document.getElementsByClassName('searchHeader-button')[0].addEventListener('click', async () => {
    const list = await searchProduct(target.value);
    list = list.results;
    console.log(list);
    renderProductsList(list);
    console.log(target.value);
  });
}

// NOTE validate button
function activeButtton() {
  document.getElementsByClassName('searchHeader-inputBar')[0].addEventListener('change', ({ target }) => {
    document.getElementsByClassName('searchHeader-button')[0].disabled = !(target.value.length > 0);
    console.log(target.value);
    console.log(document.getElementsByClassName('searchHeader-button')[0].disabled);
  });
}

renderProducts();
activeButtton();
