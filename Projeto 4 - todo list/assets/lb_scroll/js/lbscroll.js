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

    this.ballBehavior();
    this.setScrollOnff();
    this.updateBallHeight();
    this.updateMiniBallPosition();
  }
  ballBehavior() { // Esse método adiciona a propriedade de arrastar a bola
    $('#'+this.ballId).draggable({
      axis: 'y', 
      containment: 'parent',
      start: (e, u) => {
        this.ball.classList.add('hover-behavior');
      },
      stop: (e, u) => {
        this.ball.classList.remove('hover-behavior');
        const deltaHeight = this.contentArea.scrollHeight - this.contentArea.getBoundingClientRect().height;
        const percent = this.contentArea.scrollTop / deltaHeight;
        const currentTopBall = this.barContainer.getBoundingClientRect().height;
        this.ball.style.top = `${percent * currentTopBall - (this.miniBallHeight / 2)}px`;
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
  // mostra ou remove da tela o scroll quando não há todo o conteúdo cabe na área comum
  setScrollOnff() {
    if(!this.isScrollHeightGreaterThanSizeHeight()) this.barContainer.style.display = 'none';
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
  syncScrollContent() {
    const contHeight = this.contentArea.getBoundingClientRect().height;
    const contMaxTopPosition = this.contentArea.scrollHeight - contHeight;
    const ballHeight = this.ball.getBoundingClientRect().height;
    const ballMaxTopPosition = this.bar.getBoundingClientRect().height - ballHeight;

    this.contentArea.scrollTo(0, this.ball.offsetTop / ballMaxTopPosition * contMaxTopPosition);
  }
  updateMiniBallPosition() {
    this.barContainer.onmouseenter = () => {
      const percent = this.contentArea.scrollTop / this.contentArea.scrollHeight;
      const currentTopBall = this.barContainer.getBoundingClientRect().height;
      console.log(percent, currentTopBall);
      this.ball.style.top = `${percent * currentTopBall}px`;
    }
  }
}

var cScroll = new customScroll();