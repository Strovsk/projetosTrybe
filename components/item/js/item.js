class Item {
  constructor(
    title = 'Type something greater with too information', 
    subtitle = 'This a breafly description about this item. I think we need to do something together...', 
    imgUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.h4robmSvgFH6_zN7wnArsQHaE7%26pid%3DApi&f=1',
    price = 29.9,
    pmt = 12,
    productInfo,
  ) {
    // Elements
    this.containerElm;
    this.priceElm;
    this.imgContainerElm;
    this.imgElm;
    this.titleElm;
    this.subtitleElm;
    this.separatorElm;
    this.pmtElm;
    this.addCart;

    this.productInfo = productInfo;

    // Content
    this.title = title;
    this.subtitle = subtitle;
    this.imgUrl = imgUrl;
    this.price = price;
    this.pmt = pmt;
   
    this.genElements();
    this.loadClasses();
    this.loadStructure();
    this.loadContent();
  }

  genElements() {
    this.containerElm = document.createElement('div');
    this.priceElm = document.createElement('h1');
    this.imgContainerElm = document.createElement('div');
    this.imgElm = document.createElement('img');
    this.titleElm = document.createElement('h1');
    this.subtitleElm = document.createElement('p');
    this.separatorElm = document.createElement('span');
    this.pmtElm = document.createElement('h1');
    this.addCart = document.createElement('button');
  }

  loadClasses () {
    this.containerElm.classList.add('item');
    this.priceElm.classList.add('item-price');
    this.imgContainerElm.classList.add('item-thumbContainer');
    this.imgElm.classList.add('item-thumb');
    this.titleElm.classList.add('item-title');
    this.titleElm.classList.add('item-title--hidden');
    this.subtitleElm.classList.add('item-subtitle');
    this.separatorElm.classList.add('item-separator');
    this.pmtElm.classList.add('item-pmt');
    this.addCart.classList.add('item-addCart');
  }
  
  loadStructure() {
    this.containerElm.appendChild(this.priceElm);
    this.imgContainerElm.appendChild(this.imgElm);
    this.containerElm.appendChild(this.imgContainerElm);
    // this.containerElm.appendChild(this.imgElm);
    this.containerElm.appendChild(this.titleElm);
    this.containerElm.appendChild(this.subtitleElm);
    this.containerElm.appendChild(this.separatorElm);
    this.containerElm.appendChild(this.pmtElm);
    this.containerElm.appendChild(this.addCart);
  }
  
  loadContent() {
    this.priceElm.innerText = `R$ ${(this.price).toFixed(2).replace('.', ',')}`;
    this.imgElm.src = this.imgUrl;
    this.titleElm.innerText = this.title;
    this.subtitleElm.innerText = this.subtitle;
    this.pmtElm.innerText = `${this.pmt}x de R$ ${(this.price / this.pmt).toFixed(2).replace('.', ',')}`
    this.addCart.innerText = 'Adicionar ao carrinho';
  }

  getContainer() {
    return this.containerElm;
  }
}
