class customScroll { // Esta classe controla o comportamento do scroll
  constructor(ballId = 'ball', contentAreaId = 'lista-tarefas', barContainerId = 'bar-container') {
    this.ballId = ballId;
    this.ball = document.getElementById(this.ballId);
    this.contentAreaId = contentAreaId;
    this.contentArea = document.getElementById(this.contentAreaId);
    this.barContainerId = barContainerId;
    this.barContainer = document.getElementById(this.barContainerId);

    this.ballBehavior();
    this.setScrollOnff();
  }
  ballBehavior() { // Esse método adiciona a propriedade de arrastar a bola
    $('#'+this.ballId).draggable({
      axis: 'y', 
      containment: 'parent',
      drag: (e, u) => {
        console.log(u.position);
      },
    });
  }
  isScrollHeightGreaterThanSizeHeight() {
    console.log(this.contentArea.scrollHeight > this.contentArea.getBoundingClientRect().height);
    return this.contentArea.scrollHeight > this.contentArea.getBoundingClientRect().height;
  }
  setScrollOnff() {
    if(!this.isScrollHeightGreaterThanSizeHeight()) this.barContainer.style.display = 'none';
    else this.barContainer.style.display = 'flex';
  }
}

var cScroll = new customScroll();