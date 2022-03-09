class Item {
  constructor(
    title = 'Type something greater with too information', 
    subtitle = 'This a breafly description about this item. I think we need to do something together...', 
    imgUrl = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.h4robmSvgFH6_zN7wnArsQHaE7%26pid%3DApi&f=1',
     price = 29.9,
     pmt = 12,
  ) {
    this.containerElm = document.createElement('div');
    this.priceElm = document.createElement('h1');
    this.imgElm = document.createElement('img');
    this.titleElm = document.createElement('h1');
    this.subtitleElm = document.createElement('p');
    this.separatorElm = document.createElement('span');
    this.pmtElm = document.createElement('h1');
    this.addCart = document.createElement('button');
    this.title = title;
    this.subtitle =subtitle;
    this.imgUrl = imgUrl;
    this.price = price;
    this.pmt = pmt;
   
    this.loadClasses();
    this.loadStructure();
    this.loadContent();
   // console.log(this.n);
  }
  loadClasses () {
    this.containerElm.classList.add('item');
    this.priceElm.classList.add('item-price');
    this.imgElm.classList.add('item-thumb');
    this.titleElm.classList.add('item-title');
    this.subtitleElm.classList.add('item-subtitle');
    this.separatorElm.classList.add('item-separator');
    this.pmtElm.classList.add('item-pmt');
    this.addCart.classList.add('item-addCart');
  }
  
  loadStructure() {
    this.containerElm.appendChild(this.priceElm);
    this.containerElm.appendChild(this.imgElm);
    this.containerElm.appendChild(this.titleElm);
    this.containerElm.appendChild(this.subtitleElm);
    this.containerElm.appendChild(this.separatorElm);
    this.containerElm.appendChild(this.pmtElm);
    this.containerElm.appendChild(this.addCart);
  }
  
  loadContent() {
    this.priceElm.innerText = `R$ ${(this.price).toFixed(2)}`;
    this.imgElm.src = this.imgUrl;
    this.titleElm.innerText = this.title;
    this.subtitleElm.innerText = this.subtitle;
    this.pmtElm.innerText = `${this.pmt}x de R$ ${(this.price / this.pmt).toFixed(2)}`
    this.addCart.innerText = 'Adicionar ao carrinho';
  }
  
  getContainer() {
    return this.containerElm;
  }
}

const objTest = new item();
document.body.appendChild(objTest.getContainer());