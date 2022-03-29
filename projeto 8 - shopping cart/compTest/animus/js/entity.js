import { Vector } from "./vector.js";

export class Entity {
  constructor(px, py, v, vpx, vpy, direction, universeId) {
    /*
      px: posição x,
      py: posição y,
      vpx: resistência ao movimento natural horizontal (massa)
      vpy: resistência ao movimento natural vertical (massa)
      direction: ângulo do vetor movimento a ser aplicado;
    */
    this.x = px;
    this.y = py;
    this.vec = new Vector(v, direction);
    this.vpx = vpx; // resistência ao movimento natural (massa)
    this.vpy = vpy;
    this.boundingBox = undefined;
    this.boundingBoxOriginal = undefined;

    this.universeElm = document.querySelector(universeId);
    this.universe = this.universeElm.getContext('2d');
    this.universeBoundings = this.universeElm.getBoundingClientRect();
  }
  moveX() {
    this.x += this.vec.getCompX() / this.vpx;
  }
  moveY() {
    this.y += this.vec.getCompY() / this.vpy;
  }
  move() {
    this.moveX();
    this.moveY();
    this.updateBoundingBox();
  }
  draw(x, y) {
    this.x = !x ? this.x : x;
    this.y = !y ? this.y : y;
  }
  update() {
    this.move();
  }

  distanceFrom(object) {
    let dx = Math.abs(object.x - this.x);
    let dy = Math.abs(object.x - this.x);
    dx *= dx;
    dy *= dy;
    return Math.sqrt(dx + dy);
  }
  genBoundingBox(type, dimensions) {
    return ({

      circle: () => {
        const { centerX, centerY, radius } = dimensions;
        centerX += this.x;
        centerY += this.y;
        this.boundingBoxOriginal = { type, centerX, centerY, radius };
        this.boundingBox = this.boundingBoxOriginal;
      },

      pointer: () => undefined,

      square: () => undefined,

    })[type]();
  }
  updateBoundingBox() {
    switch (this.boundingBoxOriginal) {
      case 'circle':
        this.boundingBox.centerX += this.x;
        this.boundingBox.centerY += this.y;
        break;
    
      default:
        break;
    }
  }
  isColisionWallUniverse() {
    return ({
      leftWall: (size) => this.x < size,
      rightWall: (size) => this.x >= this.universeBoundings.width - size,
      topWall: (size) => this.y < size,
      bottomWall: (size) => this.y >= this.universeBoundings.height - size,
    });
  }
}