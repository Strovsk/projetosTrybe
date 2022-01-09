/* ToDo 
adiconar opção de edição da task
adicionar visualização de informações da task como data de criação e não só ultima atualização como está agora
chamar um popup como forma de alerta toda vez que o usuário tentar deletar e esse popup deve ter um checkbox dizendo 'Não me mostre essa mensagem de novo'
 */

class Task {
  constructor(title = 'No titled task', description = 'No description', creationDate = null, updateDate = null) {
    this.title = title;
    this.description = description;
    if (creationDate == undefined) this.creationDate = this.getDayInfo(); else this.creationDate = creationDate;
    if (updateDate == undefined) this.updateDate = this.creationDate; else this.updateDate = updateDate;

    this.isCompleted = false;
    this.isSelected = false;
    this.isExpanded = false;
    this.liSizeFromViewHeight = .15;
    
    // Elements section
    this.containerElm;
    this.titleDateElm;
    this.titleElm;
    this.dateElm;
    this.completeElm;
    this.descriptionElm;
    this.expandElm;
    this.iconsContainerElm;
    this.trashContainerElm;
    this.trashElm;
    this.doneContainerElm;
    this.infoContainerElm;
    this.doneElm;
    this.infoMdalElm;
    this.modalCloseButtonContainerElm;

    // Done icon svg
    this.doneIconSvgContainer;
    this.doneIconSvgG;
    this.doneIconSvgPath;
    this.doneIconSvgRect;
    this.createDoneSvg();

    // Trash icon svg
    this.trashIconSvgContainer;
    this.trashIconSvgG;
    this.trashIconSvgPathVaso;
    this.trashIconSvgGXC;
    this.trashIconSvgPathBarraA;
    this.trashIconSvgPathBarraB;
    this.trashIconSvgPathVasoDetalhe;
    this.trashIconSvgPathTampa;
    this.trashIconSvgRectBody;
    this.createTrashSvg();

    // info icon svg
    this.infoIconSvgContainer;
    this.infoIconSvgG;
    this.infoIconSvgBallPath;
    this.infoIconSvgBodyPath;
    this.createInfoSvg();

    // close icon svg
    this.closeIconSvgContainer;
    this.closeIconSvgG;
    this.closeIconSvgBarraA;
    this.closeIconSvgBarraB;
    this.createCloseSvg();
    
    this.genTaskInfoModal();
    this.genElement();
  }
  // atualiza o titulo de uma tarefa
  setTitle(title) {
      this.title = title;
  }
  // atualiza a descrição de uma tarefa
  setDescription(description) {
      this.description = description;
  }
  // atualiza o titulo e a descrição do card
  updateCard() {
    this.titleElm.innerText = this.title;
    this.descriptionElm.innerText = this.description;
    this.updateLastEdit();
    this.dateElm.innerText = this.formatDate();
    this.descriptionElm.classList.remove('expanded');
    this.expandElm.remove();
    this.genExpandButton();
    this.expandDescription();
    this.containerElm.insertBefore(this.expandElm, this.iconsContainerElm);
    this.checkTaskScrollHeight();
  }
  // retona as informações de dia e hora da criação/atualização de uma task
  getDayInfo() {
      const d = new Date();
      return {
          day: d.getDate(),
          month: d.getMonth() + 1,
          year: d.getFullYear(),
          hour: d.getHours(),
          min: d.getMinutes(),
          sec: d.getSeconds(),
          ms: d.getMilliseconds(),
      }
  }
  // retorna uma string formatada com a informação de data de criação ou de atualização
  formatDate(type = 'update', format = 'lineBreak') {
    const dayToPass = {
      'update': {
        day: this.updateDate.day < 10 ? '0' + this.updateDate.day : this.updateDate.day,
        month: this.updateDate.month < 10 ? '0' + this.updateDate.month : this.updateDate.month,
        year: this.updateDate.year < 10 ? '0' + this.updateDate.year : this.updateDate.year,
        hour: this.updateDate.hour < 10 ? '0' + this.updateDate.hour : this.updateDate.hour,
        min: this.updateDate.min < 10 ? '0' + this.updateDate.min : this.updateDate.min,
      },
      'creation': {
        day: this.creationDate.day < 10 ? '0' + this.creationDate.day : this.creationDate.day,
        month: this.creationDate.month < 10 ? '0' + this.creationDate.month : this.creationDate.month,
        year: this.creationDate.year < 10 ? '0' + this.creationDate.year : this.creationDate.year,
        hour: this.creationDate.hour < 10 ? '0' + this.creationDate.hour : this.creationDate.hour,
        min: this.creationDate.min < 10 ? '0' + this.creationDate.min : this.creationDate.min,
      },
    }
    const typeInfo = {
      'creation': 'criação',
      'update': 'atualização',
    }
    const result = dayToPass[type];
    if(format == 'lineBreak') return `Data ${typeInfo[type]}\n${result.day}/${result.month}/${result.year} ${result.hour}:${result.min}`;
    if(format == 'noLineBreak') return `Data de ${typeInfo[type]}: ${result.day}/${result.month}/${result.year} ${result.hour}:${result.min}`;
  }
  // atualiza a data da ultima atualização da task
  updateLastEdit() {
    this.updateDate = this.getDayInfo();
  }
  // se o texto for grande, será mostrado o botao 'exibir completo'
  checkTaskScrollHeight() {
    const bufferCheck = this.descriptionElm.scrollHeight <= Math.ceil(this.containerElm.innerHeight * this.liSizeFromViewHeight);
    if (bufferCheck) {
      this.expandElm.remove();
      this.descriptionElm.classList.add('expanded');
    }
  }
  // gera todas as informações no topo do card
  genTopTitleDate() {
    this.titleDateElm = document.createElement('section');
    this.titleDateElm.classList.add('task-date');
    this.titleElm = document.createElement('h1');
    this.titleElm.classList.add('task-title');
    this.titleElm.innerText = this.title;
    this.dateElm = document.createElement('p');
    this.dateElm.classList.add('date');
    this.dateElm.innerText = this.formatDate();
    this.titleDateElm.appendChild(this.titleElm);
    this.titleDateElm.appendChild(this.dateElm);
  }
  // gera todas as informações na parte central do card
  genMidCompleteDescription() {
    this.completeElm = document.createElement('p');
    this.completeElm.innerText = 'Tarefa Completa!';
    this.completeElm.classList.add('completed-task')
    this.descriptionElm = document.createElement('p');
    this.descriptionElm.classList.add('description');
    this.descriptionElm.innerText = this.description;
  }
  // gera todas as informações dispostas na parte inferior do card
  genBottomIcons() {
    this.trashContainerElm = document.createElement('span');
    this.trashContainerElm.classList.add('icon-background');
    this.deleteTaskButtonAction();

    this.doneContainerElm = document.createElement('span');
    this.doneContainerElm.classList.add('icon-background');
    this.doneTaskButtonAction();

    this.infoContainerElm = document.createElement('span');
    this.infoContainerElm.classList.add('icon-background');
    this.infoButtonAction();

    this.trashContainerElm.appendChild(this.trashIconSvgContainer);
    this.doneContainerElm.appendChild(this.doneIconSvgContainer);
    this.infoContainerElm.appendChild(this.infoIconSvgContainer);

    this.iconsContainerElm = document.createElement('section');
    this.iconsContainerElm.appendChild(this.trashContainerElm);
    this.iconsContainerElm.appendChild(this.doneContainerElm);
    this.iconsContainerElm.appendChild(this.infoContainerElm);
    this.iconsContainerElm.classList.add('icons');
  }
  // gera o botão que diz 'mostrar texto'
  genExpandButton () {
    this.expandElm = document.createElement('button');
    this.expandElm.innerText = 'ver texto';
    this.expandElm.classList.add('view-more');
  }
  // gera o card e adiciona todas as informações de top, mid e bottom 
  genElement() {
    this.containerElm = document.createElement('li');
    this.containerElm.classList.add('task-li');
    // this.selectSetIt();

    this.genTopTitleDate();
    this.containerElm.appendChild(this.titleDateElm);

    this.genMidCompleteDescription();
    this.containerElm.appendChild(this.completeElm);
    this.containerElm.appendChild(this.descriptionElm);
    this.genExpandButton();
    this.expandDescription();
    this.containerElm.appendChild(this.expandElm);

    this.genBottomIcons();
    this.containerElm.appendChild(this.iconsContainerElm);

    this.addCardAnimation();
  }
  // retorna o elemento HTML do card
  getLi() {
    return this.containerElm;
  }
  // retorna o elemento HTML do botão de concluir tarefa
  getCompleted() {
    return this.doneContainerElm;
  }
  // retorna o elemento HTML do botão de remover tarefa
  getTrashButton() {
    return this.trashContainerElm;
  }
  // calcula e adiciona a animação de movimento do card ao passar o mouse
  addCardAnimation() {
    this.containerElm.onmousemove = (e) => {
      // this.containerElm.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(238, 238, 238, 1),rgba(0, 0, 0, .1))`;
      let maxVariationX = 10;
      let relationalXIndex = (e.clientX - this.containerElm.getBoundingClientRect().x);
      let percentRelationalXIndex = (relationalXIndex / this.containerElm.getBoundingClientRect().width).toFixed(2);
      let maxDegX = (2 * percentRelationalXIndex * maxVariationX) - maxVariationX;
      
      let maxVariationY = 10;
      let relationalYIndex = (e.clientY - this.containerElm.getBoundingClientRect().y);
      let percentRelationalYIndex = (relationalYIndex / this.containerElm.getBoundingClientRect().height).toFixed(2);
      let maxDegY = (2 * percentRelationalYIndex * maxVariationY) - maxVariationY;
      
      this.containerElm.style.background = `radial-gradient(circle at ${relationalXIndex}px ${relationalYIndex}px, rgba(238, 238, 238, 1),rgba(0, 0, 0, .1))`;
      this.containerElm.style.transform = `rotateX(${maxDegY}deg) rotateY(${maxDegX}deg)`;
    };
    this.containerElm.onmouseleave = (e) => {
      this.containerElm.style.background = `transparent`;
      this.containerElm.style.transform = 'rotateX(0) rotateY(0)';
    };
  }
  // adiciona a ação de completar a tarefa quando clicamos no botão done
  doneTaskButtonAction() {
    this.doneContainerElm.onclick = () => {
      // console.log('tarefa marcada como concluída na classe task');
      this.doneSetIt();
      this.updateModal();
    }
  }
  // adiciona a ação de remover a tarefa quando clicamos no botão done
  deleteTaskButtonAction() {
    this.trashContainerElm.onclick = () => {
      this.containerElm.classList.add('to-delete');
      this.containerElm.addEventListener('animationend', () => {
        this.delLi();
        this.updateCustomScroll();
        this.infoModalElm.remove();
        this.infoModalElm = null;
      });
    }
  }
  infoButtonAction() {
    this.infoContainerElm.addEventListener('click', () => {
      this.changeTaskInfoModalState();
    });
  }
  closeModalButtonAction() {
    this.modalCloseButtonContainerElm.addEventListener('click', () => {
      this.changeTaskInfoModalState();
    });
  }
  // cria através do javascript o svg do botão de completar tarefa
  createDoneSvg() {
    this.doneIconSvgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.doneIconSvgContainer.setAttribute('width', '30');
    this.doneIconSvgContainer.setAttribute('height', '30');
    this.doneIconSvgContainer.setAttribute('viewBox', '0 0 200 200');
    // width="30" height="30" viewBox="0 0 201.5 201.25"
    this.doneIconSvgG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.doneIconSvgG.classList.add('done-icon');

    // <rect id="body-click" y="0.75" width="200" height="200"/>
    this.doneIconSvgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.doneIconSvgRect.classList.add('body-click');
    this.doneIconSvgRect.setAttribute('width', '200');
    this.doneIconSvgRect.setAttribute('height', '200');

    // <path id="done" data-name="done" d="M1.5,77.67s43.5,63.58,50,123.08c0,0,64.5-200.5,150-200,0,0-78.5-19.5-150,140C51.5,140.75,32,100.09,1.5,77.67Z"/>
    this.doneIconSvgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.doneIconSvgPath.classList.add('done');
    this.doneIconSvgPath.setAttribute('d', 'M1.5,77.67s43.5,63.58,50,123.08c0,0,64.5-200.5,150-200,0,0-78.5-19.5-150,140C51.5,140.75,32,100.09,1.5,77.67Z');

    this.doneIconSvgG.appendChild(this.doneIconSvgPath);
    this.doneIconSvgG.appendChild(this.doneIconSvgRect);
    this.doneIconSvgContainer.appendChild(this.doneIconSvgG);
  }
  // cria através do javascript o svg do botão de remover tarefa
  createTrashSvg() {
    this.trashIconSvgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    //width="30" height="30" viewBox="0 0 200 200"
    this.trashIconSvgContainer.setAttribute('width', '30');
    this.trashIconSvgContainer.setAttribute('height', '30');
    this.trashIconSvgContainer.setAttribute('viewBox', '0 0 200 200');
    // this.trashIconSvgContainer.classList.add('trash');

    this.trashIconSvgG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    this.trashIconSvgG.classList.add('trash');

    this.trashIconSvgPathVaso = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.trashIconSvgPathVaso.classList.add('vaso');
    this.trashIconSvgPathVaso.setAttribute('d', 'M180,52V161a35,35,0,0,1-35,35H57a35,35,0,0,1-35-35V52');
    
    this.trashIconSvgGXC = document.createElementNS(`http://www.w3.org/2000/svg`, `g`);
    this.trashIconSvgPathBarraA = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    // x1="75" y1="100" x2="123.5" y2="150"
    this.trashIconSvgPathBarraA.classList.add('x');
    this.trashIconSvgPathBarraA.setAttribute('x1', '75');
    this.trashIconSvgPathBarraA.setAttribute('y1', '100');
    this.trashIconSvgPathBarraA.setAttribute('x2', '124');
    this.trashIconSvgPathBarraA.setAttribute('y2', '150');
    this.trashIconSvgPathBarraB = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    // x1="125" y1="100" x2="75" y2="150"
    this.trashIconSvgPathBarraB.classList.add('x');
    this.trashIconSvgPathBarraB.setAttribute('x1', '125');
    this.trashIconSvgPathBarraB.setAttribute('y1', '100');
    this.trashIconSvgPathBarraB.setAttribute('x2', '75');
    this.trashIconSvgPathBarraB.setAttribute('y2', '150');
    this.trashIconSvgGXC.appendChild(this.trashIconSvgPathBarraA);
    this.trashIconSvgGXC.appendChild(this.trashIconSvgPathBarraB);
    
    this.trashIconSvgRectBody = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.trashIconSvgRectBody.classList.add('body-click');
    this.trashIconSvgRectBody.setAttribute('width', '200');
    this.trashIconSvgRectBody.setAttribute('height', '200');

    this.trashIconSvgPathTampa = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.trashIconSvgPathTampa.classList.add('tampa');
    this.trashIconSvgPathTampa.setAttribute('d', 'M201.5,34.5A8.5,8.5,0,0,1,193,43H10a8.5,8.5,0,0,1,0-17H96.49a13,13,0,1,1,10,0H193A8.51,8.51,0,0,1,201.5,34.5Z');

    this.trashIconSvgG.appendChild(this.trashIconSvgPathVaso);
    this.trashIconSvgG.appendChild(this.trashIconSvgGXC);
    this.trashIconSvgG.appendChild(this.trashIconSvgRectBody);
    this.trashIconSvgG.appendChild(this.trashIconSvgPathTampa);

    this.trashIconSvgContainer.appendChild(this.trashIconSvgG);
  }
  // cria através do javascript o svg do botão de visualizar informações tarefa
  createInfoSvg() {
    this.infoIconSvgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    //width="30" height="30" viewBox="0 0 200 200"
    this.infoIconSvgContainer.setAttribute('width', '29');
    this.infoIconSvgContainer.setAttribute('height', '28');
    this.infoIconSvgContainer.setAttribute('viewBox', '0 0 140 264');
    // this.infoIconSvgContainer.classList.add('trash');

    this.infoIconSvgG = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    // this.infoIconSvgG.classList.add('trash');

    this.infoIconSvgBallPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.infoIconSvgBallPath.setAttribute('d', 'M129.11,32.91A32.8,32.8,0,1,1,96.43,0,32.81,32.81,0,0,1,129.11,32.91Z');

    this.infoIconSvgBodyPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.infoIconSvgBodyPath.setAttribute('d', 'M.74,112c-2.32-5.79,1.15-8.24,5.68-10.47C30.69,89.57,55.88,80.75,83,78.1a44.68,44.68,0,0,1,17.4,1.37c8.53,2.55,12.46,8.3,11.6,17.15a34.26,34.26,0,0,1-1.12,6C101,137.6,91.94,172.74,82.77,207.87c-.81,3.1-1.79,6.18-1.7,9.47.22,7.92,3.9,12.42,11.66,14.17,8.83,2,17.49.67,26.07-1.4a66.25,66.25,0,0,0,18.79-7.22c1.45-.88,1.82-.33,1.91,1.12.22,3.31.45,6.63.84,9.92a3.05,3.05,0,0,1-1.64,3.33c-6.86,4.39-14.29,7.61-21.81,10.63-16.16,6.51-32.7,11.72-49.94,14.47a73,73,0,0,1-21.58.7,30.59,30.59,0,0,1-6.8-1.67c-6.67-2.52-9.95-7.21-10-14.28a31.7,31.7,0,0,1,1.19-8.38q14.06-52.46,28.07-104.92c1.11-4.14,2.25-8.31,1.58-12.68-.9-5.85-4.87-9.72-11.58-11.18-8.71-1.9-17.3-.85-25.78,1.32-6.63,1.7-13.16,3.72-19,7.37-1.53,1-1.79.26-1.86-1.13C1.1,115.66.9,113.81.74,112Z');

    this.infoIconSvgG.appendChild(this.infoIconSvgBallPath);
    this.infoIconSvgG.appendChild(this.infoIconSvgBodyPath);

    this.infoIconSvgContainer.appendChild(this.infoIconSvgG);
  }
  createCloseSvg() {
    this.closeIconSvgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    //width="30" height="30" viewBox="0 0 200 200"
    this.closeIconSvgContainer.setAttribute('width', '30');
    this.closeIconSvgContainer.setAttribute('height', '30');
    this.closeIconSvgContainer.setAttribute('viewBox', '0 0 200 200');
    // this.closeIconSvgContainer.classList.add('trash');
    
    this.closeIconSvgG = document.createElementNS(`http://www.w3.org/2000/svg`, `g`);
    this.closeIconSvgBarraA = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    // x1="75" y1="100" x2="123.5" y2="150"
    this.closeIconSvgBarraA.classList.add('close-svg-style');
    this.closeIconSvgBarraA.setAttribute('x', '-25');
    this.closeIconSvgBarraA.setAttribute('y', '65');
    this.closeIconSvgBarraA.setAttribute('width', '200');
    this.closeIconSvgBarraA.setAttribute('height', '22');
    this.closeIconSvgBarraA.setAttribute('rx', '8');
    this.closeIconSvgBarraA.setAttribute('transform', 'translate(184 76) rotate(135)');
    this.closeIconSvgBarraB = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    // x1="125" y1="100" x2="75" y2="150"
    this.closeIconSvgBarraB.classList.add('close-svg-style');
    this.closeIconSvgBarraB.setAttribute('x', '-25');
    this.closeIconSvgBarraB.setAttribute('y', '65');
    this.closeIconSvgBarraB.setAttribute('width', '200');
    this.closeIconSvgBarraB.setAttribute('height', '22');
    this.closeIconSvgBarraB.setAttribute('rx', '8');
    this.closeIconSvgBarraB.setAttribute('transform', 'translate(75 182) rotate(-135)');

    this.closeIconSvgG.appendChild(this.closeIconSvgBarraA);
    this.closeIconSvgG.appendChild(this.closeIconSvgBarraB);
    this.closeIconSvgContainer.appendChild(this.closeIconSvgG);
  }

  // Basic operations

  // deleta o card
  delLi() {
    this.containerElm.remove();
  }
  // altera a cor do botão de completar tarefa quando clicado para verde e marca a classe como completa
  doneSetIt() {
    if (!this.isCompleted) {
      this.completeElm.classList.add('on');
      this.doneIconSvgPath.setAttribute('fill', 'green');
    } else {
      this.completeElm.classList.remove('on');
      this.doneIconSvgPath.setAttribute('fill', 'black');
    }
    this.isCompleted = !this.isCompleted;
  }
  // Expande ou minimza o texto quando o botão mostrar texto é clicado
  expandDescription() {
    this.expandElm.onclick = () => {
      if (!this.isExpanded) {
        this.descriptionElm.classList.add('expand');
        this.expandElm.innerText = 'minimizar texto';
        // this.dateElm.innerText = this.formatDate('create');
      } else {
        this.descriptionElm.classList.remove('expand');
        this.expandElm.innerText = 'ver texto';
        // this.dateElm.innerText = this.formatDate();
      }
      this.isExpanded = !this.isExpanded;
    }
  }
  // quando o card é clicado, adiciona animação e marca o card como selecionado
  selectSetIt() {
    this.containerElm.addEventListener('click', () => {
      this.selectAdd();
      this.containerElm.classList.add('clicked');
      this.containerElm.onanimationend = () => {
        this.containerElm.classList.remove('clicked');
      }
    });
  }
  // marca a tarefa como não selecionada
  selectRemove() {
    this.isSelected = false;
    this.containerElm.classList.remove('selected');
  }
  // marca tarefa como selecionada
  selectAdd() {
    this.isSelected = true;
    this.containerElm.classList.add('selected');
  }
  // extenal - atualiza o scroll customizado
  updateCustomScroll() {
    window.cScroll.setScrollOnff(); // chamada para a animação do scroll
    window.cScroll.updateMiniBallPosition(); // atualiza a posição da bolinha no scroll
    window.cScroll.updateBallHeight(); // atualiza o tamanho da bola no scroll
  }
  // geta um objeto com todas as informações relevantes da tarefa
  getModelObject() {
    return {
      'title': this.title,
      'description': this.description,
      'dateInfo': {
        'creation': this.creationDate,
        'update': this.updateDate,
      },
      'completedState': this.isCompleted,
    };
  }

  // gera os elementos titulo da tarefa e icone close na janela de informação
  genModalTopContainer() {
    this.topModalContainerElm = document.createElement('section');
    this.topModalContainerElm.classList.add('top-modal');
    
    this.modalCloseButtonContainerElm = document.createElement('span');
    this.modalCloseButtonContainerElm.classList.add('icon-background');
    this.modalCloseButtonContainerElm.style.transform = 'scale(.8)';
    this.modalCloseButtonContainerElm.appendChild(this.closeIconSvgContainer);
    this.closeModalButtonAction();
    this.modalTitleElm = document.createElement('h1');
    this.modalTitleElm.innerText = this.title;
    this.modalTitleElm.classList.add('top-modal-title');
    this.topModalContainerElm.appendChild(this.modalTitleElm);
    this.topModalContainerElm.appendChild(this.modalCloseButtonContainerElm);
  }
  // gera os elementos de data de criação e atualização da tarefa na janela de informação
  genModalDateInfo() {
    this.modalDateCreationElm = document.createElement('p');
    this.modalDateCreationElm.innerText = this.formatDate('creation', 'noLineBreak');
    this.modalDateCreationElm.classList.add('modal-date-info');

    this.modalDateUpdateElm = document.createElement('p');
    this.modalDateUpdateElm.innerText = this.formatDate('update', 'noLineBreak');
    this.modalDateUpdateElm.classList.add('modal-date-info');
  }
  // gera os elementos de descrição da tarefa na janela de informação
  genModalDescription() {
    this.modalDescriptionElm = document.createElement('p');
    if (this.description == '') this.modalDescriptionElm.innerText = `Sem descrição`;
    else this.modalDescriptionElm.innerText = `Descrição: ${this.description}`;
    this.modalDescriptionElm.classList.add('modal-description');
  }
  // gera o elemento de estado de conclusão da tarefa na janela de informação
  genModalComplete() {
    this.modalCompletedElm = document.createElement('p');
    this.modalCompletedElm.classList.add('modal-completed');
    if (this.isCompleted) {
      this.modalCompletedElm.innerText = 'Tarefa concluída';
      this.modalCompletedElm.classList.add('on');
      this.modalCompletedElm.classList.remove('off');
    } else {
      this.modalCompletedElm.innerText = 'Tarefa não concluída';
      this.modalCompletedElm.classList.add('off');
      this.modalCompletedElm.classList.remove('on');
    }
  }
  // geta a janela com informações sobre a tarefa
  genTaskInfoModal() {
    this.infoModalElm = document.createElement('div');
    this.infoModalElm.classList.add('modal-area');
    this.infoModalElm.classList.add('off');

    this.genModalTopContainer();
    this.genModalDescription();
    this.genModalDateInfo();
    this.genModalComplete();

    this.infoModalElm.appendChild(this.topModalContainerElm);
    this.infoModalElm.appendChild(this.modalDateCreationElm);
    this.infoModalElm.appendChild(this.modalDateUpdateElm);
    this.infoModalElm.appendChild(this.modalDescriptionElm);
    this.infoModalElm.appendChild(this.modalCompletedElm);

    document.getElementsByTagName('body')[0].appendChild(this.infoModalElm);
  }
  // checa se a jenela de informações da tarefa está sendo mostrada na tela
  isTaskInfoModalShowing() {
    return this.infoModalElm.classList.contains('off');
  }
  // muda o estado da janjela de informações da tarefa para visível ou não visível
  changeTaskInfoModalState() {
    if (this.isTaskInfoModalShowing()) this.infoModalElm.classList.remove('off');
    else return this.infoModalElm.classList.add('off');
  }
  // atualiza a janela de informações
  updateModal() {
    this.infoModalElm.remove();
    this.genTaskInfoModal();
  }
}

// const t1 = new Task('Minha task 1', 'Vou fazer isso');
// const t2 = new Task('Minha task 2', 'Exercitation ullamco sunt proident ipsum mollit minim. In mollit culpa irure esse irure anim reprehenderit reprehenderit reprehenderit ullamco sit do tempor adipisicing. Adipisicing in aute cupidatat consequat ut adipisicing occaecat in. Incididunt incididunt amet labore nisi esse in Lorem reprehenderit sit sunt. Minim nostrud veniam velit veniam labore dolor dolor adipisicing. Deserunt ipsum nostrud ea tempor consectetur.');
// const t3 = new Task('Minha task 3', 'Exercitation ullamco sunt proident ipsum mollit minim. In mollit culpa irure esse irure anim reprehenderit reprehenderit reprehenderit ullamco sit do tempor adipisicing. Adipisicing in aute cupidatat consequat ut adipisicing occaecat in. Incididunt incididunt amet labore nisi esse in Lorem reprehenderit sit sunt. Minim nostrud veniam velit veniam labore dolor dolor adipisicing. Deserunt ipsum nostrud ea tempor consectetur. Exercitation ullamco sunt proident ipsum mollit minim. In mollit culpa irure esse irure anim reprehenderit reprehenderit reprehenderit ullamco sit do tempor adipisicing. Adipisicing in aute cupidatat consequat ut adipisicing occaecat in. Incididunt incididunt amet labore nisi esse in Lorem reprehenderit sit sunt. Minim nostrud veniam velit veniam labore dolor dolor adipisicing. Deserunt ipsum nostrud ea tempor consectetur.');
// const t4 = new Task('Este é um título muito grande para uma task', 'Exercitation ullamco sunt proident ipsum mollit minim. In mollit culpa irure esse irure anim reprehenderit reprehenderit reprehenderit ullamco sit do tempor adipisicing. Adipisicing in aute cupidatat consequat ut adipisicing occaecat in. Incididunt incididunt amet labore nisi esse in Lorem reprehenderit sit sunt. Minim nostrud veniam velit veniam labore dolor dolor adipisicing. Deserunt ipsum nostrud ea tempor consectetur. Exercitation ullamco sunt proident ipsum mollit minim. In mollit culpa irure esse irure anim reprehenderit reprehenderit reprehenderit ullamco sit do tempor adipisicing. Adipisicing in aute cupidatat consequat ut adipisicing occaecat in. Incididunt incididunt amet labore nisi esse in Lorem reprehenderit sit sunt. Minim nostrud veniam velit veniam labore dolor dolor adipisicing. Deserunt ipsum nostrud ea tempor consectetur.');
// document.getElementById('lista-tarefas').appendChild(t1.getLi());
// document.getElementById('lista-tarefas').appendChild(t2.getLi());
// document.getElementById('lista-tarefas').appendChild(t3.getLi());
// document.getElementById('lista-tarefas').appendChild(t4.getLi());

// t1.checkTaskScrollHeight();
// t2.checkTaskScrollHeight();
// t3.checkTaskScrollHeight();
// t4.checkTaskScrollHeight();