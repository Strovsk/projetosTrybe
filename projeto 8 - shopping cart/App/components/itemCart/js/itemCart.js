class itemCart {
  constructor(itemId) {
    this.containerElm;
    this.itemName;

    this.itemPriceQtdContainer;
    this.itemPrice;
    this.itemQtd;

    this.adjustBoxContainer;
    this.adjustBoxButtonMinus;
    this.adjustBoxButtonPlus;

    this.itemInfo = this.getItemInfo(itemId);

    this.build();
    /*
      <div class="AdjustBox">
        <div class="AdjustBox-button AdjustBox-button--minus"></div>
        <div class="AdjustBox-button AdjustBox-button--plus"></div>
      </div>
    */
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

    this.adjustBoxButtonPlusElm.classList.add('AdjustBox-button');
    this.adjustBoxButtonPlusElm.classList.add('AdjustBox-button--plus');

    this.itemPriceQtdContainerElm.classList.add('itemCart-priceQtdContainer');

    this.containerElm.classList.add('itemCart');
    this.itemNameElm.classList.add('itemCart-itemName');
    this.itemPriceElm.classList.add('itemCart-itemPrice');
    this.itemQtdElm.classList.add('itemCart-itemQtd');
  }

  loadContent() {
    const formatedPrice = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
    this.itemNameElm.innerText = this.itemInfo.name;
    this.itemQtdElm.innerText = `qtd. ${this.itemInfo.qtd}`;
    this.itemPriceElm.innerText = formatedPrice.format(this.itemInfo.price * this.itemInfo.qtd);
  }

  getContainer() {
    return this.containerElm;
  }

  getItemInfo() {
    return {
      name: 'Mock de produto',
      qtd: 2,
      price: 50,
    };
  }
}