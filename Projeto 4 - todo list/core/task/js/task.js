class Task {
  constructor(title = 'No titled task', description = 'No description') {
    this.title = title;
    this.description = description;
    this.creationDate = this.getDayInfo();
    this.updateDate = this.creationDate;
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
    this.doneElm = document.createElement('object');
    this.doneElm.setAttribute('data', './core/task/assets/svg/done.svg');
    this.doneElm.setAttribute('type', 'image/svg+xml');
    this.doneElm.classList.add('icon');
    // this.doneElm.setAttribute('data', '../assets/svg/done.svg');

    this.trashContainerElm.appendChild(this.trashElm);
    this.doneContainerElm.appendChild(this.doneElm);

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
  }
  updateElement() {
    if (elm === null || elm === undefined) reuturn;
    return false;
  }
  getLi() {
    return this.containerElm;
  }
}

const t = new Task('Minha task', 'Vou fazer isso');
document.getElementById('lista-tarefas').appendChild(t.getLi());