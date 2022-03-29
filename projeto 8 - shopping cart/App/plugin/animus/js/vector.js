export class Vector {
  constructor(mag, ang) {
    this.originalAng = ang;
    this.originalMag = mag;
    this.ang = ang;
    this.mag = mag;
    this.radians = this.degToRad(this.ang);
    this.cos = this.getCos();
    this.sin = this.getSin();
    this.forces = {};
  }
  degToRad(deg) {
    return deg * Math.PI / 180;
  }
  radToDeg(rad) {
    return rad * 180 / Math.PI;
  }
  getCos() {
    return Math.cos(this.radians);
  }
  getSin() {
    return Math.sin(this.radians);
  }
  getCompX() {
    return this.mag * this.cos;
  }
  getCompY() {
    return this.mag * this.sin * (-1);
  }
  getForces() {
    return this.forces;
  }
  setAngle(newAngle) {
    this.ang = newAngle;
    this.radians = this.degToRad(this.ang);
    this.cos = this.getCos();
    this.sin = this.getSin();
  }
  setMag(newMag) {
    this.mag = newMag;
  }
  addForce(forceName, forceVector) {
    this.forces[forceName] = forceVector;
    // this.sum(forceVector);
  }
  removeForce(forceName) {
    delete this.forces[forceName];
    for (let vector of Object.values(this.forces)) this.sum(vector);
  }
  sum(vector, constMag) {
    let Rx = vector.getCompX() + this.getCompX();
    let Ry = vector.getCompY() + this.getCompY();
    let newMag = !constMag ? Math.sqrt(Math.pow(Rx, 2) + Math.pow(Ry, 2)) : this.mag;
    // let newMag = 1;
    let newAng = this.radToDeg(Math.atan(Ry / Rx));
    newAng = this.resolveQuadrant(Rx, Ry, newAng);
    this.setAngle(newAng);
    this.setMag(newMag);
  }
  applyForce(forceName, constMag = false) {
    this.sum(this.forces[forceName], constMag);
  }
  resolveQuadrant(x, y, ang) {
    if (x < 0) {
      if (y > 0) { // 2
        return 180 + ang;
      }
      if (y < 0) { // 3
        return 180 + ang;
      }
    } else if (x > 0) {
      if (y >= 0) { // 1
        return ang;
      }
      if (y < 0) { // 4
        return 360 + ang;
      }
    } else {
      if (y > 0) return 90;
      if (y < 0) return 270;
    }
    return ang;
  }
  resetVector() {
    this.setAngle(this.originalAng);
    this.setMag(this.originalMag);
    // this.resetForces();
  }
  resetForces() {
    this.forces = {};
  }
  resetMag() {
    this.mag = this.originalMag;
  }
  reflect(axys = 'x') {
    ({
        x: () => this.cos *= -1,
        y: () => this.sin *= -1,
    })[axys]();
    const newAngle = this.radToDeg(Math.atan(this.sin / this.cos));
    const resolved = this.resolveQuadrant(this.cos, this.sin, newAngle);
    this.setAngle(resolved);
  }
  magDecay(decay, min = 0) {
    this.mag -= decay;
    if (this.mag <= min) this.mag = min;
  }
  toString() {
    return `
    Vec Info:
    angle: ${this.ang},
    magnitude: ${this.mag},
    forces: ${Object.keys(this.forces)},
    cosine: ${this.cos},
    sine: ${this.sin},
    X Component: ${this.getCompX()},
    Y Component: ${this.getCompY()},
    `
  }
}