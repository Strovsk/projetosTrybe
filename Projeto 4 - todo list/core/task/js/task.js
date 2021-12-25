class Task {
  constructor(title = 'No titled task', description = 'No description') {
    this.title = title;
    this.description = description;
    this.creationDate = this.getDayInfo();
    this.updateDate = this.creationDate;

    this.isCompleted = false;

    // Elements section
    this.containerElm;
    this.titleDateElm;
    this.titleElm;
    this.dateElm;
    this.completeElm;
    this.descriptionElm;
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
  formatDate() {
    return `${this.updateDate.day}/${this.updateDate.month}/${this.updateDate.year}`;
  }
  updateLastEdit() {
      this.updateDate = this.getDayInfo();
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
    this.trashElm = document.createElement('object');
    this.trashElm.classList.add('icon');
    this.trashElm.setAttribute('data', './core/task/assets/svg/trash.svg');
    this.trashElm.setAttribute('type', 'image/svg+xml');
    // this.trashElm.setAttribute('data', '../assets/svg/trash.svg');

    this.doneContainerElm = document.createElement('span');
    this.doneContainerElm.classList.add('icon-background');
    this.doneTaskButtonAction();

    this.trashContainerElm.appendChild(this.trashElm);
    this.doneContainerElm.appendChild(this.doneIconSvgContainer);

    this.iconsContainerElm = document.createElement('section');
    this.iconsContainerElm.appendChild(this.trashContainerElm);
    this.iconsContainerElm.appendChild(this.doneContainerElm);
    this.iconsContainerElm.classList.add('icons');
  }
  genElement() {
    this.containerElm = document.createElement('li');
    
    this.genTopTitleDate();
    this.containerElm.appendChild(this.titleDateElm);

    this.genMidCompleteDescription();
    this.containerElm.appendChild(this.completeElm);
    this.containerElm.appendChild(this.descriptionElm);

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
      if(!this.isCompleted) {
        this.completeElm.classList.add('on');
        this.doneIconSvgPath.setAttribute('fill', 'green');
      } else {
        this.completeElm.classList.remove('on');
        this.doneIconSvgPath.setAttribute('fill', 'black');
      }
      this.isCompleted = !this.isCompleted;
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
}

const t = new Task('Minha task', 'Vou fazer isso');
document.getElementById('lista-tarefas').appendChild(t.getLi());