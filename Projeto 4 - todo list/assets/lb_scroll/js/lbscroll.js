class customScroll { // Esta classe controla o comportamento do scroll
  constructor(ballId = 'ball', contentAreaId = 'lista-tarefas', barId = 'bar', barContainerId = 'bar-container') {
    this.ballId = ballId;
    this.ball = document.getElementById(this.ballId);
    this.miniBallHeight = window.getComputedStyle(this.ball).getPropertyValue('--scrollbar-width');
    this.miniBallHeight = this.miniBallHeight.slice(0, -2);
    this.miniBallHeight = parseInt(this.miniBallHeight, 10);
    this.contentAreaId = contentAreaId;
    this.contentArea = document.getElementById(this.contentAreaId);
    this.barContainerId = barContainerId;
    this.barContainer = document.getElementById(this.barContainerId);
    this.barId = barId;
    this.bar = document.getElementById(this.barId);

    // Para evitar conflito em que os eventos onmouseenter e onscroll executem suas funções juntos
    this.activeLeftMouseButton = false; 

    this.ballBehavior();
    this.setScrollOnff();
    this.updateBallHeight();
    this.ballActiveAction();

    this.contentArea.onscroll = () => {
      if(!this.activeLeftMouseButton) this.updateMiniBallPosition();
    }
  }
  // Esse método adiciona a propriedade de arrastar a bola
  ballBehavior() {
    $('#'+this.ballId).draggable({
      axis: 'y', 
      containment: 'parent',
      start: (e, u) => {
        this.ball.classList.add('hover-behavior');
        this.activeLeftMouseButton = true;
      },
      stop: (e, u) => {
        this.ball.classList.remove('hover-behavior');
        const deltaHeight = this.contentArea.scrollHeight - this.contentArea.getBoundingClientRect().height;
        const percent = this.contentArea.scrollTop / deltaHeight;
        const currentTopBall = this.barContainer.getBoundingClientRect().height;
        this.ball.style.top = `${percent * currentTopBall - (this.miniBallHeight / 2)}px`;
        this.activeLeftMouseButton = false;
      },
      drag: (e, u) => {
        // console.log(u.position, this.ball.offsetTop);
        this.syncScrollContent();
      },
    });
  }
  // checa se o scroll height é maior do que o tamanho atual da área de conteúdo
  isScrollHeightGreaterThanSizeHeight() {
    return this.contentArea.scrollHeight > this.contentArea.getBoundingClientRect().height;
  }
  // mostra ou remove da tela o scroll quando o conteúdo não cabe na área comum
  setScrollOnff(forceOff = false) {
    if(!this.isScrollHeightGreaterThanSizeHeight() || forceOff) this.barContainer.style.display = 'none';
    else this.barContainer.style.display = 'flex';
  }
  // atualiza proporcinalmente o tamanho da barra de acordo com o viewport da área de conteúdo
  updateBallHeight() {
    this.setScrollOnff();
    const contentScrollHeight = this.contentArea.scrollHeight;
    const contentHeight = this.contentArea.getBoundingClientRect().height;
    const barHeight = this.bar.getBoundingClientRect().height;
    
    const updatedBallSize = (contentHeight / contentScrollHeight) * barHeight;
    this.ball.style.setProperty('--scrollbar-height-on-hover', `${updatedBallSize}px`);
    return updatedBallSize;
    // console.log((contentHeight / contentScrollHeight) * barHeight);
  }
  // sincroniza a posição do scroll no container de acordo com a posição do ball
  syncScrollContent() {
    const contHeight = this.contentArea.getBoundingClientRect().height;
    const contMaxTopPosition = this.contentArea.scrollHeight - contHeight;
    const ballHeight = this.ball.getBoundingClientRect().height;
    const ballMaxTopPosition = this.bar.getBoundingClientRect().height - ballHeight;

    this.contentArea.scrollTo(0, this.ball.offsetTop / ballMaxTopPosition * contMaxTopPosition);
  }
  // atualiza a posição da bolinha de acordo com a posição do container
  updateMiniBallPosition() {
    const deltaHeight = this.contentArea.scrollHeight - this.contentArea.getBoundingClientRect().height;
    const percent = this.contentArea.scrollTop / deltaHeight;
    const barContainerHeight = this.barContainer.getBoundingClientRect().height;
    // console.log(percent, barContainerHeight);
    this.ball.style.top = `${percent * barContainerHeight - (this.miniBallHeight / 2)}px`;
  }
  // atualiza a posição da bola expandida de acordo com a posição do container
  updateExpandedBallPosition() {
    const percent = this.contentArea.scrollTop / this.contentArea.scrollHeight;
    const barContainerHeight = this.barContainer.getBoundingClientRect().height;
    // console.log(percent, barContainerHeight);
    this.ball.style.top = `${percent * barContainerHeight}px`;
  }
  ballActiveAction() {
    this.barContainer.onmouseenter = () => {
      this.updateExpandedBallPosition();
    }
  }
}

var cScroll = new customScroll();