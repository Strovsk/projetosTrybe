class StaticCube {
  constructor(containerId, cubeName = 'category', callback) {
    this.containerElm = document.querySelector(containerId);
    this.cubeContainerElm;
    this.cubeCallbackClick = callback;
    this.cubeElm;
    this.cubeFrontElm;
    this.cubeBackElm;
    this.cubeNameElm;
    // this.cubeShadow;

    this.cubeText = cubeName;
    
    this._createElements();
    this._fillContents();
    this._loadStyles();
    this._mountElements();
  }
  _createElements() {
    this.cubeIconElm = document.createElement('div');
    this.cubeContainerElm = document.createElement('div');
    this.cubeElm = document.createElement('div');
    this.cubeFrontElm = document.createElement('div');
    this.cubeBackElm = document.createElement('div');
    this.cubeNameElm = document.createElement('h3');
    // this.cubeShadow = document.createElement('div');
  }
  _mountElements() {
    // this.cubeElm.appendChild(this.cubeFrontElm);
    // this.cubeElm.appendChild(this.cubeBackElm);
    // this.cubeContainerElm.appendChild(this.cubeElm);
    // this.cubeContainerElm.appendChild(this.cubeNameElm);
    this.containerElm.appendChild(this.cubeIconElm);
    this.containerElm.appendChild(this.cubeNameElm);
    // this.containerElm.appendChild(this.cubeShadow);
  }
  _loadStyles() {
    this.cubeIconElm.classList.add('cube-icon');
    this.cubeIconElm.style.backgroundImage = 'url(/assets/pets.png)';

    this.cubeContainerElm.classList.add('cube');
    this.cubeElm.classList.add('cube-faceContainer');
    this.cubeFrontElm.classList.add('cube-face');
    this.cubeBackElm.classList.add('cube-face');
    this.cubeNameElm.classList.add('cube-title');
    // this.cubeShadow.classList.add('cube-face');
    // this.cubeShadow.classList.add('cube-shadow');
  }
  _fillContents() {
    this.cubeNameElm.innerText = this.cubeText;
    this.cubeContainerElm.addEventListener('click', this.cubeCallbackClick);
  }
}