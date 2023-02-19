class itemCart {
  constructor(item) {
    this.containerElm;
    this.itemName;

    this.itemPriceQtdContainer;
    this.itemPrice;
    this.itemQtd;

    this.adjustBoxContainer;
    this.adjustBoxButtonMinus;
    this.adjustBoxButtonPlus;

    this.itemInfo = this.itemStore(item);
    this.build();
    /*
      <div class="AdjustBox">
        <div class="AdjustBox-button AdjustBox-button--minus"></div>
        <div class="AdjustBox-button AdjustBox-button--plus"></div>
      </div>
    */
  }

  getStore() {
    if (!localStorage.getItem('cart'))
      localStorage.setItem('cart', JSON.stringify({}));
    return JSON.parse(
      localStorage.getItem('cart'),
    );
  }

  saveStore(cartList) {
    localStorage.setItem('cart', JSON.stringify(cartList));
  }

  build() {
    this.createItems();
    this.loadStyles();
    this.loadContent();
    this.mountItems();
  }

  createItems() {
    this.containerElm = document.createElement('div');
    this.itemNameElm = document.createElement('h2');

    this.itemPriceQtdContainerElm = document.createElement('div');
    this.itemPriceElm = document.createElement('h3');
    this.itemQtdElm = document.createElement('h3');

    this.adjustBoxContainerElm = document.createElement('div');
    this.adjustBoxButtonMinusElm = document.createElement('div');
    this.adjustBoxButtonPlusElm = document.createElement('div');
  }

  mountItems() {
    this.containerElm.appendChild(this.itemNameElm);

    this.itemPriceQtdContainerElm.appendChild(this.itemQtdElm);
    this.itemPriceQtdContainerElm.appendChild(this.itemPriceElm);

    this.containerElm.appendChild(this.itemPriceQtdContainerElm);

    this.adjustBoxContainerElm.appendChild(this.adjustBoxButtonMinusElm);
    this.adjustBoxContainerElm.appendChild(this.adjustBoxButtonPlusElm);

    this.containerElm.appendChild(this.adjustBoxContainerElm);
  }

  loadStyles() {
    this.adjustBoxContainerElm.classList.add('AdjustBox');
    this.adjustBoxContainerElm.classList.add('AdjustBox');

    this.adjustBoxButtonMinusElm.classList.add('AdjustBox-button');
    this.adjustBoxButtonMinusElm.classList.add('AdjustBox-button--minus');
    this.adjustBoxButtonMinusElm.classList.add('is-deactivated');

    this.adjustBoxButtonPlusElm.classList.add('AdjustBox-button');
    this.adjustBoxButtonPlusElm.classList.add('AdjustBox-button--plus');
    if (this.itemInfo.available === 1) this.adjustBoxButtonPlusElm.classList.add('is-deactivated');

    this.itemPriceQtdContainerElm.classList.add('itemCart-priceQtdContainer');

    this.containerElm.classList.add('itemCart');
    this.itemNameElm.classList.add('itemCart-itemName');
    this.itemPriceElm.classList.add('itemCart-itemPrice');
    this.itemQtdElm.classList.add('itemCart-itemQtd');
  }

  updateTotalPrice() {
    const formatedPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
    this.itemPriceElm.innerText = formatedPrice.format(this.itemInfo.total);
  }

  loadContent() {
    this.itemNameElm.innerText = this.itemInfo.payload.title;
    this.itemQtdElm.innerText = `qtd. ${this.itemInfo.qtd}   disp. ${this.itemInfo.available}`;
    this.updateTotalPrice();

    this.adjustBoxButtonPlusElm.addEventListener('click', () => {
      if (this.itemInfo.qtd === this.itemInfo.available) return;
      this.itemInfo.qtd += 1;
      this.updateStore();
      this.adjustBoxButtonMinusElm.classList.remove('is-deactivated');
      this.itemQtdElm.innerText = `qtd. ${this.itemInfo.qtd}   disp. ${this.itemInfo.available}`;
      if (this.itemInfo.qtd === this.itemInfo.available) return this.adjustBoxButtonPlusElm.classList.add('is-deactivated');
    });

    this.adjustBoxButtonMinusElm.addEventListener('click', () => {
      if (this.itemInfo.qtd === 1) return;
      this.itemInfo.qtd -= 1;
      this.adjustBoxButtonPlusElm.classList.remove('is-deactivated');
      if (this.itemInfo.qtd === 1) this.adjustBoxButtonMinusElm.classList.add('is-deactivated');
      this.updateStore();
      this.itemQtdElm.innerText = `qtd. ${this.itemInfo.qtd} disp. ${this.itemInfo.available}`;
    });
  }

  getContainer() {
    return this.containerElm;
  }

  itemStore(item, qtd = 1) {
    const payload = item;
    const price = item.price;
    const available = item.available_quantity;
    const store = this.getStore();
    const itemInfo = {
      payload,
      price,
      available,
      qtd,
      total: price,
    };
    store[item.title] = itemInfo;
    this.saveStore(store);
    return itemInfo;
  }
  
  updateStore() {
    const store = this.getStore();
    this.itemInfo.total = this.itemInfo.price * this.itemInfo.qtd;
    store[this.itemInfo.payload.title] = this.itemInfo; 
    this.updateTotalPrice();
    this.saveStore(store);
  }
}