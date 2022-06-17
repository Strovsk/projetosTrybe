export default class Lumins {
  constructor(idContainer, quantidade) {
    this.container_name = idContainer;
    this.universal_container = document.getElementById(this.container_name);
    console.log(this.universal_container);

    this.item = [];

    this.quantidade_de_lumins = quantidade;
  }

  gerarParOrdenado() {
    this.dimensoes = {
      x: this.universal_container.offsetWidth,
      y: this.universal_container.offsetHeight,
    };

    return {
      x: Math.floor(Math.random() * this.dimensoes.x),
      y: Math.floor(Math.random() * this.dimensoes.y),
    };
  }

  // sortear_direcao(){
  //     this.direction = {
  //         'vertical':0,
  //         'horizontal':1,
  //         'diagonalA': 2,
  //         'diagonalB':3
  //     }
  // }

  // descrever_container(){
  //     console.log(this.universal_container.offsetHeight + 'px de altura e '+ this.universal_container.offsetWidth + 'px de largura');
  // }

  renderizarLumins() {
    for (let i = 0; i < this.quantidade_de_lumins; i += 1) {
      this.par = this.gerarParOrdenado();
      this.item[i] = document.createElement('div');
      this.item[i].style.backgroundColor = 'rgb(255, 239, 69)';
      this.item[i].style.borderRadius = '50%';
      this.item[i].style.boxShadow = '0 1px 8px rgb(255, 239, 69)';
      this.item[i].style.height = '4px';
      this.item[i].style.position = 'absolute';
      this.item[i].style.width = '4px';
      // this.item[i].className = 'particula';
      // this.item[i].style.left = `${this.par.x}px`;
      // this.item[i].style.top = `${this.par.y}px`;
      this.universal_container.appendChild(this.item[i]);

      this.update(this.item[i]);
    }
  }

  update(semente) {
    // this.par = this.gerarParOrdenado()
    this.direcao = Math.floor(Math.random() * 2);
    this.semente = semente;

    const minAnimationDuration = 2000;
    const maxAnimationDuration = 3000;

    this.semente.animate(
      [
        {
          left: `${this.gerarParOrdenado().x}px`,
          top: `${this.gerarParOrdenado().y}px`,
          backgroundColor: 'rgba(255, 239, 69, 0)',
        },
        {
          top: '0px',
          // backgroundColor: 'transparent',
          backgroundColor: 'rgba(255, 239, 69, 1)',
        },
      ],

      {
        duration: Math.floor(
          (Math.random() * minAnimationDuration) + maxAnimationDuration,
        ),
        iterations: Infinity,
      },
    );

    this.semente.style.left = `${this.par.x}px`;
    this.semente.style.top = `${this.par.y}px`;
  }
}
