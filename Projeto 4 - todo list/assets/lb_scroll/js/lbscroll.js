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
        const newPos = this.ball.offsetTop + this.updateBallHeight();
        this.ball.style.top = `${newPos - this.miniBallHeight}px`;
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
}

var cScroll = new customScroll();