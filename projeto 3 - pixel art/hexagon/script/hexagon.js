class Hexagon {
  // anumation delay entre 3 e 7
  constructor(size = {w : 150, h : 135}, position = {x : 100, y : 100}, color='#e0e0e0'){
    this.size = {width: size.w, height: size.h};
    this.position = {x : position.x, y : position.y};
    this.color = color;
    this.cell = this.gen();
    this.positionObject = {
      0: this.getPos0(),
      1: this.getPos1(),
      2: this.getPos2(),
      3: this.getPos4(),
      4: this.getPos4(),
      5: this.getPos5(),
    }
  }
  gen() {
    const animationDuration = parseInt(4 + (Math.random() * 4));
    const animationDelay = parseInt(1 + (Math.random() * 4));
    let generic = document.createElement('div');
    generic.style.setProperty('--cell-height',  `${this.size.height}px`);
    generic.style.setProperty('--cell-width', `${this.size.width}px`);
    generic.style.setProperty('--animation-time', `${animationDuration}s`);
    generic.style.setProperty('--animation-delay', `${animationDelay}s`);
    generic.style.background = `${this.color}`;
    generic.classList.add('hexagon_cell');

    let generic_shadow_container = document.createElement('div');
    generic_shadow_container.classList.add('hexagon_cell_container_shadow');
    generic_shadow_container.style.setProperty('animation-duration', `${animationDuration}s`);
    generic_shadow_container.style.setProperty('animation-delay', `${animationDelay}s`);
    generic_shadow_container.style.left = `${this.position.x}px`;
    generic_shadow_container.style.top = `${this.position.y}px`;
    generic_shadow_container.appendChild(generic);
    return generic_shadow_container;
  }
  getElement() {
    return this.cell;
  }
  // getters para posição das arestas em sentido horário
  getPos0() {
    return {x: this.position.x, y: this.position.y - this.size.height};
  }
  getPos1() {
    let vertex1 = parseInt(window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--polygon-cell-pair-1').split(' ')[1].slice(0, -1));
    return {
      x: this.position.x + (this.size.width * vertex1 / 100) + 1,
      y: this.position.y - (this.size.height/2)
    };
  }
  getPos2() {
    let vertex1 = parseInt(window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--polygon-cell-pair-3').split(' ')[1].slice(0, -1));
    return {
      x: this.position.x + (this.size.width * vertex1 / 100) + 1,
      y: this.position.y + (this.size.height/2)
    };
  }
  getPos3() {
    return {x: this.position.x, y: this.position.y + this.size.height};
  }
  getPos4() {
    let vertex1 = parseInt(window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--polygon-cell-pair-3').split(' ')[1].slice(0, -1));
    return {
      x: this.position.x - (this.size.width * vertex1 / 100) + 1,
      y: this.position.y + (this.size.height/2)
    };
  }
  getPos5() {
    let vertex1 = parseInt(window.getComputedStyle(document.querySelector(':root')).getPropertyValue('--polygon-cell-pair-1').split(' ')[1].slice(0, -1));
    return {
      x: this.position.x - (this.size.width * vertex1 / 100) + 1,
      y: this.position.y - (this.size.height / 2)
    };
  }
}

class HexagonField {
  constructor(containerId='hexagon_container', nMax = 40, deep = 5){
    this.containerId = containerId;
    this.container = document.getElementById(this.containerId);
    this.allElementsList = [];
    this.nMax = nMax;
    this.deep = deep;

    this.patternDefault = {
      '-1': (size, element, stopP) => {
        this.createFrom(size, element.getPos0(), 0, stopP-1);
        this.createFrom(size, element.getPos1(), 1, stopP-1);
        this.createFrom(size, element.getPos2(), 2, stopP-1);
        this.createFrom(size, element.getPos3(), 3, stopP-1);
        this.createFrom(size, element.getPos4(), 4, stopP-1);
        this.createFrom(size, element.getPos5(), 5, stopP-1);
      },
      0: (size, element, stopP) => {
        this.createFrom(size, element.getPos0(), 0, stopP-1);
      },
      3: (size, element, stopP) => {
        this.createFrom(size, element.getPos3(), 3, stopP-1);
      },
      4: (size, element, stopP) => {
        this.createFrom(size, element.getPos3(), 3, stopP-1);
        this.createFrom(size, element.getPos4(), 4, stopP-1);
        this.createFrom(size, element.getPos5(), 5, stopP-1);
      },
      2: (size, element, stopP) => {
        this.createFrom(size, element.getPos1(), 1, stopP-1);
        this.createFrom(size, element.getPos2(), 2, stopP-1);
        this.createFrom(size, element.getPos3(), 3, stopP-1);
      },
      5: (size, element, stopP) => {
        this.createFrom(size, element.getPos0(), 0, stopP-1);
        this.createFrom(size, element.getPos5(), 5, stopP-1);
      },
      1: (size, element, stopP) => {
        this.createFrom(size, element.getPos0(), 0, stopP-1);
        this.createFrom(size, element.getPos1(), 1, stopP-1);
      },
    }
    this.pattern2 = {
      '-1': (size, element, stopP) => {
        if (this.getAvailable()) this.createFrom2(size, element.getPos0(), 0, stopP-1);
        if (this.getAvailable()) this.createFrom2(size, element.getPos1(), 1, stopP-1);
        if (this.getAvailable()) this.createFrom2(size, element.getPos2(), 2, stopP-1);
        if (this.getAvailable()) this.createFrom2(size, element.getPos3(), 3, stopP-1);
        if (this.getAvailable()) this.createFrom2(size, element.getPos4(), 4, stopP-1);
        if (this.getAvailable()) this.createFrom2(size, element.getPos5(), 5, stopP-1);
      },
      0: (size, element, stopP) => {
        if (this.getAvailable()) this.createFrom2(size, element.getPos0(), 0, stopP-1);
      },
      3: (size, element, stopP) => {
        this.createFrom2(size, element.getPos3(), 3, stopP-1);
      },
      4: (size, element, stopP) => {
        this.createFrom2(size, element.getPos3(), 3, stopP-1);
        if (this.getAvailable()) this.createFrom2(size, element.getPos4(), 4, stopP-1);
        this.createFrom2(size, element.getPos5(), 5, stopP-1);
      },
      2: (size, element, stopP) => {
        this.createFrom2(size, element.getPos1(), 1, stopP-1);
        if (this.getAvailable()) this.createFrom2(size, element.getPos2(), 2, stopP-1);
        this.createFrom2(size, element.getPos3(), 3, stopP-1);
      },
      5: (size, element, stopP) => {
        if (this.getAvailable()) this.createFrom2(size, element.getPos0(), 0, stopP-1);
        this.createFrom2(size, element.getPos5(), 5, stopP-1);
      },
      1: (size, element, stopP) => {
        this.createFrom2(size, element.getPos0(), 0, stopP-1);
        this.createFrom2(size, element.getPos1(), 1, stopP-1);
      },
    }
    this.pattern3 = {
      '-1': (size, element, stopP) => {
        this.createFrom3(size, element.getPos0(), 0, stopP-1);
        this.createFrom3(size, element.getPos3(), 3, stopP-1);
        this.createFrom3(size, element.getPos5(), 5, stopP-1);
        this.createFrom3(size, element.getPos4(), 4, stopP-1);
      },
      0: (size, element, stopP) => {
        this.createFrom3(size, element.getPos0(), 0, stopP-1);
      },
      3: (size, element, stopP) => {
        this.createFrom3(size, element.getPos3(), 3, stopP-1);
      },
      4: (size, element, stopP) => {
        this.createFrom3(size, element.getPos4(), 4, stopP-1);
        this.createFrom3(size, element.getPos3(), 3, stopP-1);
      },
      5: (size, element, stopP) => {
        this.createFrom3(size, element.getPos0(), 0, stopP-1);
        this.createFrom3(size, element.getPos5(), 5, stopP-1);
      },
    }
  }

  createFrom(size = {w : 100, h : 90}, position={x : 250, y : 250}, identifier = -1, stopPoint = 3){
    if (stopPoint <= 0) return;

    let generic = new Hexagon(size, position);
    this.container.appendChild(generic.getElement());

    this.patternDefault[identifier](size, generic, stopPoint);
  }
  createFrom2(size = {w : 100, h : 90}, position={x : 250, y : 250}, identifier = -1, stopPoint = 4){
    if (stopPoint <= 0) return;

    let generic = new Hexagon(size, position);
    this.container.appendChild(generic.getElement());

    this.pattern2[identifier](size, generic, stopPoint);
  }
  createFrom3(size = {w : 80, h : 70}, position={x : this.container.getBoundingClientRect().width - size.w, y : this.container.getBoundingClientRect().height / 2}, identifier = -1, stopPoint = 10){ // Não quero fazer recursivamente
    if (stopPoint <= 0) return;
    if (
      position.y + this.container.getBoundingClientRect().top >= this.container.getBoundingClientRect().top - (size.h/2) &&
      position.y + this.container.getBoundingClientRect().top <= this.container.getBoundingClientRect().top - (size.h/2) + this.container.getBoundingClientRect().height &&
      position.x + this.container.getBoundingClientRect().left >= this.container.getBoundingClientRect().left &&
      position.x + this.container.getBoundingClientRect().left <= this.container.getBoundingClientRect().left - (size.w/2) + this.container.getBoundingClientRect().width
    ) {
        let generic = new Hexagon(size, position);
        this.container.appendChild(generic.getElement());
        this.pattern3[identifier](size, generic, stopPoint);
      } else { return; }
    if (identifier == -2) return;
  }

  getAvailable(){
    return Math.round(Math.random());
  }
}

let hf = new HexagonField();
hf.createFrom3();

// let test_hexagon = new Hexagon();
// document.querySelector('#hexagon_container').appendChild(test_hexagon.getElement());
// let test_hexagon2 = new Hexagon({w : 150, h : 135}, test_hexagon.getPos2());
// document.querySelector('#hexagon_container').appendChild(test_hexagon2.getElement());


/* pattern 3 function
    console.log('chamada no identifcador '+identifier);
    console.log('stop point '+stopPoint);
    console.log('stop point '+stopPoint);
    console.log(`position.y + this.container.getBoundingClientRect().top >= this.container.getBoundingClientRect().top = ${position.y + this.container.getBoundingClientRect().top >= this.container.getBoundingClientRect().top}`);
    console.log(`position.y + this.container.getBoundingClientRect().top <= this.container.getBoundingClientRect().top - size.h + this.container.getBoundingClientRect().height = ${position.y + this.container.getBoundingClientRect().top <= this.container.getBoundingClientRect().top - size.h + this.container.getBoundingClientRect().height}`);
    console.log(`position.x + this.container.getBoundingClientRect().left > this.container.getBoundingClientRect().left = ${position.x + this.container.getBoundingClientRect().left > this.container.getBoundingClientRect().left}`);
    console.log(`position.x + this.container.getBoundingClientRect().left < this.container.getBoundingClientRect().left - size.w + this.container.getBoundingClientRect().width = ${position.x + this.container.getBoundingClientRect().left < this.container.getBoundingClientRect().left - size.w + this.container.getBoundingClientRect().width}`);
    console.log(`this.container.getBoundingClientRect().left - size.w + this.container.getBoundingClientRect().width = ${this.container.getBoundingClientRect().left - size.w + this.container.getBoundingClientRect().width}`);
    console.log(`position.x + this.container.getBoundingClientRect().left = ${position.x + this.container.getBoundingClientRect().left}`);
*/
