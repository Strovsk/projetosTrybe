import { Entity } from "../entity.js";

export class Ball extends Entity {
  constructor(px, py, v, vpx, vpy, direction, radius, color, universeId) {
    /*
      radius: raio da bola,
      color: cor da bola,
      universeId: id do canvas aonde a bola será desenhada,
    */
    super(px, py, v, vpx, vpy, direction, universeId);
    this.radius = radius;
    this.boundingBox = radius;
    this.color = color;

    this.wall = {
      LEFT: this.radius,
      RIGHT: this.universeBoundings.width - this.radius,
      TOP: this.radius,
      BOTTOM: this.universeBoundings.height - this.radius,
    };
  }
  draw(x, y) {
    super.draw(x, y);
    this.universe.fillStyle = this.color;
    this.universe.beginPath();
    this.universe.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    this.universe.fill();
  }
  onColisionWall() {
    return ({

      top: () => {
        if (this.isColisionWallUniverse().topWall(this.radius)) {
          return undefined;
        }
      },
      bottom: () => {
        if (this.isColisionWallUniverse().bottomWall(this.radius)) {
          this.vec.applyForce('imp');
          this.vec.magDecay(this.vec.mag * .02, 1);
          this.y -= (2 * this.radius);
        }
      },
      left: () => {
        if (this.isColisionWallUniverse().leftWall(this.radius)) {
          this.vec.reflect('x');
          this.vec.magDecay(this.vec.mag * .03, 1);
          this.vec.getForces()['imp'].reflect('x');
          this.x += (2 * this.radius);
        }
      },
      right: () => {
        if (this.isColisionWallUniverse().rightWall(this.radius)) {
          this.x -= (2 * this.radius);
          this.vec.magDecay(this.vec.mag * .04, 1);
          this.vec.reflect('x');
          this.vec.getForces()['imp'].reflect('x');
        }
      },

      all: () => {
        this.onColisionWall().top();
        this.onColisionWall().bottom();
        this.onColisionWall().left();
        this.onColisionWall().right();
      },

    });
  }
  addEventListener(event, object, callback) {
    return ({

      colisionWith: () => {
        if (this.distanceFrom(object) <= 2 * (this.radius + object.radius)) callback();
      }

    })[event]();
  }
}
