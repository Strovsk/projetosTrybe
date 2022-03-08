class StaticCube {
  constructor(containerId, cubeName = 'category') {
    this.containerElm = document.querySelector(containerId);
    this.cubeContainerElm;
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
    this.cubeContainerElm = document.createElement('div');
    this.cubeElm = document.createElement('div');
    this.cubeFrontElm = document.createElement('div');
    this.cubeBackElm = document.createElement('div');
    this.cubeNameElm = document.createElement('h3');
    // this.cubeShadow = document.createElement('div');
  }
  _mountElements() {
    this.cubeElm.appendChild(this.cubeFrontElm);
    this.cubeElm.appendChild(this.cubeBackElm);
    this.cubeContainerElm.appendChild(this.cubeElm);
    this.cubeContainerElm.appendChild(this.cubeNameElm);
    this.containerElm.appendChild(this.cubeContainerElm);
    // this.containerElm.appendChild(this.cubeShadow);
  }
  _loadStyles() {
    this.cubeContainerElm.classList.add('cube');
    this.cubeElm.classList.add('cube-faceContainer');
    this.cubeFrontElm.classList.add('cube-face');
    this.cubeBackElm.classList.add('cube-face');
    // this.cubeShadow.classList.add('cube-face');
    // this.cubeShadow.classList.add('cube-shadow');
  }
  _fillContents() {
    this.cubeNameElm.innerText = this.cubeText;
  }
}