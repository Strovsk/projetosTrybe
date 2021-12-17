// retorna o valor correto da luminancia em porcentagem para os valores do grupo 0 e 3
function lightLevel(position) {
  return (position === 0 || position === 3) ? 50 : 75;
}

// Cria 2 grupos de cores análogas em hsl randomicamente cada uma com o seu imediato tom monocromático
function fillColors() {
  const listColors = document.querySelectorAll('.color');
  const firstColor = parseInt(Math.random() * 361, 10);
  const colorGroup1 = firstColor;
  // 220 complementares, 30 análogas
  const tpMrgClr = 30;
  const colorGroup2 = firstColor + tpMrgClr > 360 ? firstColor - tpMrgClr : firstColor + tpMrgClr;
  let currentColor;
  let light;
  for (let index = 1; index < listColors.length; index += 1) {
    if (index < 2) currentColor = colorGroup1; else currentColor = colorGroup2;
    light = lightLevel(index);
    listColors[index].style.backgroundColor = `hsl(${currentColor}, ${100}%, ${light}%)`;
  }
}

// Ativa o color swatcher do html5 através do input escondido na tela
function rgbToHex(r, g, b) { // Não implementado
  const toChange = {
    10 : 'a',
    11 : 'b',
    12 : 'c',
    13 : 'd',
    14 : 'e',
    15 : 'f',
  }
  const r1 = parseInt(r) / 16 < 10 ? parseInt(parseInt(r) / 16) : toChange[parseInt(r / 16)];
  const r2 = parseInt(r) % 16 < 10 ? parseInt(parseInt(r) % 16) : toChange[parseInt(r % 16)];
  const g1 = parseInt(g) / 16 < 10 ? parseInt(parseInt(g) / 16) : toChange[parseInt(g / 16)];
  const g2 = parseInt(g) % 16 < 10 ? parseInt(parseInt(g) % 16) : toChange[parseInt(g % 16)];
  const b1 = parseInt(b) / 16 < 10 ? parseInt(parseInt(b) / 16) : toChange[parseInt(b / 16)];
  const b2 = parseInt(b) % 16 < 10 ? parseInt(parseInt(b) % 16) : toChange[parseInt(b % 16)];
  return `#${r1}${r2}${g1}${g2}${b1}${b2}`;
}

const aColor = { index: 0, color: '#000000' };
// Função para selecionar uma cor da paleta
function currentColorSelect() {
  const listColors = document.querySelectorAll('.color');
  const picker = document.querySelector('#color-picker');
  listColors[0].classList.add('selected');
  for (let index = 0; index < listColors.length; index += 1) {
    listColors[index].onclick = (e) => {
      listColors[aColor.index].classList.remove('selected');
      e.target.classList.add('selected');
      aColor.index = index;
      aColor.color = window.getComputedStyle(e.target).getPropertyValue('background-color');
      document.getElementsByClassName('cls-3')[0].style.fill = aColor.color;
      picker.value = rgbToHex(...aColor.color.slice(4, -1).split(','));
    };
  }
  picker.onchange = () => {
    listColors[aColor.index].style.backgroundColor = picker.value;
    aColor.color = picker.value;
    document.getElementsByClassName('cls-3')[0].style.fill = aColor.color;
  }
}

// Cria um pixel e o adiciona no pai
function createPixel(container) {
  const pixelTmp = document.createElement('div');
  pixelTmp.onclick = (e) => {
    e.target.style.backgroundColor = aColor.color;
  };
  pixelTmp.classList.add('pixel');
  container.appendChild(pixelTmp);
  return pixelTmp;
}

/* preenche a grade com os pixels de acordo com a quantidade de pixels selecionados pelo operador do código
e guarda esses valores dentro de uma matriz bidimensional. Ps: O modo de inserção no html e armazenamento
dos pixels no js são diferentes */
function fillBoard(arrest = 5) {
  const container = document.querySelector('#pixel-board');
  container.style.gridTemplateColumns = `repeat(${arrest}, 1fr)`;
  container.innerHTML = '';
  const inputSize = document.querySelector('#board-size');
  inputSize.value = arrest;
  let pixelW = window.getComputedStyle(document.body).getPropertyValue('--pixel-size');
  pixelW = parseInt(pixelW.slice(0, -2), 10);
  container.style.width = `${(arrest * pixelW)}px`;
  const pixelMatrix = [];
  let bufferPixel = [];
  for (let index = 0; index < arrest ** 2; index += 1) {
    bufferPixel.push(createPixel(container));
    if ((index + 1) % arrest === 0) {
      pixelMatrix.push(bufferPixel);
      bufferPixel = [];
    }
  }
  return pixelMatrix;
}

function updateBoardSize() {
  const inputSizeButton = document.querySelector('#generate-board');
  const inputSize = document.querySelector('#board-size');
  inputSizeButton.onclick = () => {
    if (inputSize.value > 50) pixels = fillBoard(50);
    if (inputSize.value === NaN) alert('Board inválido!'); else pixels = fillBoard(inputSize.value);
    if (inputSize.value < 5) pixels = fillBoard(5);
  };
}

fillColors();
currentColorSelect();
updateBoardSize();
let pixels = fillBoard(document.getElementById('board-size').value);

// limpa o treco das cores
function clearBoard() {
  const size = pixels.length;
  for (let line = 0; line < size; line += 1) {
    for (let column = 0; column < size; column += 1) {
      pixels[line][column].style.backgroundColor = 'rgb(255, 255, 255)';
    }
  }
}

document.querySelector('#clear-board').onclick = () => {
  clearBoard();
};

document.querySelector('#paint-all').onclick = () => {
  for (let indexI = 0; indexI < pixels.length; indexI += 1) {
    for (let indexJ = 0; indexJ < pixels.length; indexJ += 1){
      pixels[indexI][indexJ].style.backgroundColor = aColor.color;
    }
  }
}
