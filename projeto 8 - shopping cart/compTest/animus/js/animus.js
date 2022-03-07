import { Ball } from "./entity/ball.js";
import { Vector } from "./vector.js";

const canvasElm = document.getElementById('mini-ballCvs');
const canvas = canvasElm.getContext('2d');

const gravity = new Vector(0.2, 270);
const impulse = new Vector(0.2, 60);
const fr = new Vector(.1, 0);

const randX = () => (280 * Math.random());
const vecRand = () => 1 + (5 * Math.random());
const vecRand180 = () => Math.round(30 + (180 * Math.random()));
const radiusRand = () => 1 + (5 * Math.random());
const angleRand = () => (360 * Math.random());
const colorRand = () => ({
    0: '#1b1b1b',
    1: '#2c2a63',
  })[Math.round(1 * Math.random())];
const ballsList = [];
for (let index = 0; index < 100; index += 1) {
  let buffer = new Ball(randX(), -10, vecRand(), 10, 2, angleRand(), radiusRand(), colorRand(), '#mini-ballCvs');
  buffer.vec.addForce('g', gravity);
  buffer.vec.addForce('imp', impulse);
  buffer.vec.getForces()['imp'].setAngle(vecRand180());
  buffer.vec.addForce('friction', fr);

  ballsList.push(buffer);
}

const getDt = (now) => {
  let dt = Math.min(1, ( now - lastTime ) / 1000 );
  // console.log(now, lastTime, now-lastTime);
  lastTime = now;
  return dt;
};

function draw(dt) {
  ballsList.forEach((elm) => {
    elm.draw();
  });
}

function update(dt) {  
  ballsList.forEach((elm) => {
    elm.update();
    elm.vec.applyForce('g');
    elm.vec.applyForce('imp');
    elm.onColisionWall().all();
  });
}
let lastTime = 0;
let dt = 0;
function main(timeElapsed) {
  dt = getDt(timeElapsed);
  canvas.clearRect(0, 0, 300, 200);
  update(dt);
  draw(dt);
  requestAnimationFrame(main);
};

main();
