/* ToDo 
adiconar opção de edição da task
adicionar visualização de informações da task como data de criação e não só ultima atualização como está agora
 */

class Task {
  constructor(title = 'No titled task', description = 'No description') {
    this.title = title;
    this.description = description;
    this.creationDate = this.getDayInfo();
    this.updateDate = this.creationDate;

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
    this.doneElm;

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
    this.trashIconSvgPathVasoDetalhe;
    this.trashIconSvgPathTampa;
    this.trashIconSvgRectBody;
    this.createTrashSvg();

    this.genElement();
  }
  setTitle(title) {
      this.title = title;
  }
  setDescription(description) {
      this.description = description;
  }
  getDayInfo() {
      const d = new Date();
      return {
          day: d.getDate(),
          month: d.getMonth(),
          year: d.getFullYear(),
          hour: d.getHours(),
          min: d.getMinutes(),
      }
  }
  formatDate(type = 'update') {
    if(type === 'create') return `Data criação\n${this.creationDate.day}/${this.creationDate.month}/${this.creationDate.year}`;
    return `Última atualização\n${this.updateDate.day}/${this.updateDate.month}/${this.updateDate.year}`;
  }
  updateLastEdit() {
      this.updateDate = this.getDayInfo();
  }
  checkTaskScrollHeight() {
    const bufferCheck = this.descriptionElm.scrollHeight <= Math.ceil(window.innerHeight * this.liSizeFromViewHeight);
    if(bufferCheck) this.expandElm.remove();
  }
  genTopTitleDate() {
    this.titleDateElm = document.createElement('section');
    this.titleDateElm.classList.add('task-date');
    this.titleElm = document.createElement('h1');
    this.titleElm.innerText = this.title;
    this.dateElm = document.createElement('p');
    this.dateElm.classList.add('date');
    this.dateElm.innerText = this.formatDate();
    this.titleDateElm.appendChild(this.titleElm);
    this.titleDateElm.appendChild(this.dateElm);
  }
  genMidCompleteDescription() {
    this.completeElm = document.createElement('p');
    this.completeElm.innerText = 'Tarefa Completa!';
    this.completeElm.classList.add('completed-task')
    this.descriptionElm = document.createElement('p');
    this.descriptionElm.classList.add('description');
    this.descriptionElm.innerText = this.description;
  }
  genBottomIcons() {
    this.trashContainerElm = document.createElement('span');
    this.trashContainerElm.classList.add('icon-background');
    this.deleteTaskButtonAction();

    this.doneContainerElm = document.createElement('span');
    this.doneContainerElm.classList.add('icon-background');
    this.doneTaskButtonAction();

    this.trashContainerElm.appendChild(this.trashIconSvgContainer);
    this.doneContainerElm.appendChild(this.doneIconSvgContainer);

    this.iconsContainerElm = document.createElement('section');
    this.iconsContainerElm.appendChild(this.trashContainerElm);
    this.iconsContainerElm.appendChild(this.doneContainerElm);
    this.iconsContainerElm.classList.add('icons');
  }
  genExpandButton () {
    this.expandElm = document.createElement('button');
    this.expandElm.innerText = 'ver texto';
    this.expandElm.classList.add('view-more');
  }
  genElement() {
    this.containerElm = document.createElement('li');
    this.selectSetIt();

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
  updateElement() {
    if (elm === null || elm === undefined) reuturn;
    return false;
  }
  getLi() {
    return this.containerElm;
  }
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
  doneTaskButtonAction() {
    this.doneContainerElm.onclick = (e) => {
      // console.log('cliquei');
      this.doneSetIt();
    }
  }
  deleteTaskButtonAction() {
    this.trashContainerElm.onclick = () => {
      this.containerElm.classList.add('to-delete');
      this.containerElm.addEventListener('animationend', () => {
        this.delLi();
      });
    }
  }
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
    this.trashIconSvgPathVaso.setAttribute('d', 'M5,65.16,33.94,148l14.9,42.66A9.64,9.64,0,0,0,58,197h90.47a9.64,9.64,0,0,0,9.25-6.53L171.38,148l26.69-83.08C200,59,195.32,53,188.82,53H14.18C7.58,53,2.92,59.18,5,65.16Z');
    
    this.trashIconSvgPathVasoDetalhe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.trashIconSvgPathVasoDetalhe.classList.add('vaso-detalhe');
    this.trashIconSvgPathVasoDetalhe.setAttribute('d', 'M33.94,150S60.51,129,101.5,129.11c20.26.08,44,5.35,69.88,20.89');
    
    this.trashIconSvgRectBody = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    this.trashIconSvgRectBody.classList.add('body-click');
    this.trashIconSvgRectBody.setAttribute('width', '200');
    this.trashIconSvgRectBody.setAttribute('height', '200');

    this.trashIconSvgPathTampa = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.trashIconSvgPathTampa.classList.add('tampa');
    this.trashIconSvgPathTampa.setAttribute('d', 'M201.5,34.5A8.5,8.5,0,0,1,193,43H10a8.5,8.5,0,0,1,0-17H96.49a13,13,0,1,1,10,0H193A8.51,8.51,0,0,1,201.5,34.5Z');

    this.trashIconSvgG.appendChild(this.trashIconSvgPathVaso);
    this.trashIconSvgG.appendChild(this.trashIconSvgPathVasoDetalhe);
    this.trashIconSvgG.appendChild(this.trashIconSvgRectBody);
    this.trashIconSvgG.appendChild(this.trashIconSvgPathTampa);

    this.trashIconSvgContainer.appendChild(this.trashIconSvgG);
  }

  // Basic operations
  delLi() {
    this.containerElm.remove();
  }
  doneSetIt() {
    if(!this.isCompleted) {
      this.completeElm.classList.add('on');
      this.doneIconSvgPath.setAttribute('fill', 'green');
    } else {
      this.completeElm.classList.remove('on');
      this.doneIconSvgPath.setAttribute('fill', 'black');
    }
    this.isCompleted = !this.isCompleted;
  }
  expandDescription() {
    this.expandElm.onclick = () => {
      if(!this.isExpanded) {
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
  selectSetIt() {
    this.containerElm.onclick = () => {
      this.isSelected = true;
      this.containerElm.classList.add('clicked');
      this.containerElm.classList.add('selected');
      this.containerElm.onanimationend = () => {
        this.containerElm.classList.remove('clicked');
      }
    }
  }
  selectRemove() {
    this.isSelected = false;
  }
}

const t1 = new Task('Minha task 1', 'Vou fazer isso');
const t2 = new Task('Minha task 2', 'Exercitation ullamco sunt proident ipsum mollit minim. In mollit culpa irure esse irure anim reprehenderit reprehenderit reprehenderit ullamco sit do tempor adipisicing. Adipisicing in aute cupidatat consequat ut adipisicing occaecat in. Incididunt incididunt amet labore nisi esse in Lorem reprehenderit sit sunt. Minim nostrud veniam velit veniam labore dolor dolor adipisicing. Deserunt ipsum nostrud ea tempor consectetur.');
const t3 = new Task('Minha task 3', 'Exercitation ullamco sunt proident ipsum mollit minim. In mollit culpa irure esse irure anim reprehenderit reprehenderit reprehenderit ullamco sit do tempor adipisicing. Adipisicing in aute cupidatat consequat ut adipisicing occaecat in. Incididunt incididunt amet labore nisi esse in Lorem reprehenderit sit sunt. Minim nostrud veniam velit veniam labore dolor dolor adipisicing. Deserunt ipsum nostrud ea tempor consectetur. Exercitation ullamco sunt proident ipsum mollit minim. In mollit culpa irure esse irure anim reprehenderit reprehenderit reprehenderit ullamco sit do tempor adipisicing. Adipisicing in aute cupidatat consequat ut adipisicing occaecat in. Incididunt incididunt amet labore nisi esse in Lorem reprehenderit sit sunt. Minim nostrud veniam velit veniam labore dolor dolor adipisicing. Deserunt ipsum nostrud ea tempor consectetur.');
document.getElementById('lista-tarefas').appendChild(t1.getLi());
document.getElementById('lista-tarefas').appendChild(t2.getLi());
document.getElementById('lista-tarefas').appendChild(t3.getLi());

t1.checkTaskScrollHeight();
t2.checkTaskScrollHeight();
t3.checkTaskScrollHeight();