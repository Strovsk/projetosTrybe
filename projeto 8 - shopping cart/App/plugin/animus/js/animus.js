import { Ball } from "./entity/ball.js";
import { Vector } from "./vector.js";

const canvasContainerElm = document.getElementsByClassName('mini-ball-container')[0];
const canvasContainerBoundings = () => canvasContainerElm.getBoundingClientRect();
const canvasElm = document.getElementById('mini-ballCvs');
const canvas = canvasElm.getContext('2d');
const canvasDimensions = () => canvasElm.getBoundingClientRect();

//  UpdateCanvasSize
(() => {
  canvasElm.width = canvasContainerBoundings().width;
  canvasElm.height = canvasContainerBoundings().height;
  console.log('rodada com sucesso');
})();

const gravity = new Vector(0.2, 270);
const impulse = new Vector(0.2, 60);
const fr = new Vector(.1, 0);

const randX = () => ((canvasContainerBoundings().width / 3) + ((canvasContainerBoundings().width / 2) * Math.random()));
const vecRand = () => 1 + (5 * Math.random());
const angleRand = (range = 180, min = 0) => min + Math.round(range * Math.random());
const radiusRand = () => 1 + (4 * Math.random());
const colorRand = () => ({
    0: '#1b1b1b',
    1: '#2C2A63dd',
    2: '#74B2A8dd',
  })[Math.round(2 * Math.random())];
const ballsList = [];
for (let index = 0; index < 100; index += 1) {
  let direction = angleRand();
  let minRangeImp = direction > 90 ? angleRand(150, 100) : angleRand(80, 30);
  let buffer = new Ball(randX(), -10, vecRand(), 10, 2, direction, radiusRand(), colorRand(), '#mini-ballCvs');
  buffer.vec.addForce('g', gravity);
  buffer.vec.addForce('imp', impulse);
  buffer.vec.getForces()['imp'].setAngle(minRangeImp);
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
  canvas.clearRect(0, 0, canvasDimensions().width, canvasDimensions().height);
  update(dt);
  draw(dt);
  requestAnimationFrame(main);
};

main();
