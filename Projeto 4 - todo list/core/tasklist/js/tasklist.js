class taskList {
  constructor(containerId) {
    this.tasks = [];
    this.container = document.getElementById(containerId);
    this.currentSelected = -1;
    this.filterMode = 'creation';
    this.filterDirection = 'auto';
    this.mostRecent = null;
    this.completedTasks = 0;
  }
  // adiciona uma tarefa
  addTask(title, description, creationDate = null, updateDate = null, isCompleted = false) {
    let newTask = new Task(title, description, creationDate, updateDate, isCompleted);
    newTask.selectSetIt();
    
    this.tasks.push(newTask);
    this.container.appendChild(newTask.getLi());
    newTask.checkTaskScrollHeight();

    this.taskRemoveAction(newTask);
    this.taskClickAction(newTask);
    this.taskCompletedAction(newTask);
    this.mostRecent = newTask;

    // adicionar a atualização de inserção por filtro
    this.filterListBy(this.filterMode, this.filterDirection);

    this.updateScroll();
  }
  // retorna o índice do card atualmente selecionado na lista
  getCurrentSelectedIndex() {
    for (let index = 0; index < this.tasks.length; index += 1) {
      if (this.tasks[index].isSelected) return index;
    }
    return -1;
  }
  // adiciona as ações que devem ser executadas dentro da lista quando uma terafa é clicada
  taskClickAction(task) {
    task.getLi().addEventListener('click', (e) => {
      if (this.currentSelected != -1) this.tasks[this.currentSelected].selectRemove();
      this.currentSelected = this.getCurrentSelectedIndex();
    });
  }
  // adiciona as ações que devem ser executadas dentro da lista quando uma terafa é removida
  taskRemoveAction(task) {
    task.getTrashButton().addEventListener('click', () => {
      task.getLi().addEventListener('animationend', () => {
        this.tasks.splice(this.tasks.indexOf(task), 1);
        this.currentSelected = -1;
        this.storeTasks();
        this.updateList();
      });
    });
  }
  // adiciona ações a serem executadas na lista quando o clique no botão de completar tarefa acontece
  taskCompletedAction(task) {
    task.getCompleted().addEventListener('click', () => {
      if (task.isCompleted) {
        this.completedTasks += 1;
      } else {
        this.completedTasks -= 1;
      }
    });
  }

  // atualiza toda a ul com os elementos presentes na lista
  updateList() {
    this.container.innerHTML = '';
    for (let index = 0; index < this.tasks.length; index += 1) {
      this.container.appendChild(this.tasks[index].getLi());
    }
  }
  // inverte a direção da lista
  filterInvertListDirection(direction = 'auto') {
    return this.filterListBy(this.filterMode, direction);
  }
  // filtra a lista por tipo e direção de ordenação
  filterListBy(type = 'title', order = 'auto') {
    // console.log('chamada do filtro');
    this.filterMode = type;
    this.filterDirection = order;
    const filterListTypes = {
      'title': () => {
        this.tasks.sort(this.filterCompareTitleAlpha);
      },
      'description': () => {
        this.tasks.sort(this.filterCompareDescripitionAlpha);
      },
      'creation': () => {
        this.tasks.sort(this.filterCompareCreationDate);
      },
      'completed': () => {
        this.tasks.sort(this.filterCompareCompleted);
      },
      'updateDate': () => {
        this.tasks.sort(this.filterCompareUpdateDate);
      },
    }
    filterListTypes[type]();
    if (order == 'reverse') this.tasks = this.tasks.reverse();
    this.updateList();
  }
  // função de comparação para callback do método .sort() baseada no título da task
  filterCompareTitleAlpha(itemA, itemB) {
    if (itemA.title < itemB.title ) return -1;
    if (itemA.title > itemB.title ) return 1;
    return 0;
  }
  // função de comparação para callback do método .sort() baseada na descrição da task
  filterCompareDescripitionAlpha(itemA, itemB) {
    if (itemA.description < itemB.description ) return -1;
    if (itemA.description > itemB.description ) return 1;
    return 0;
  }
  // função de comparação para callback do método .sort() baseada na data de criação da task
  filterCompareCreationDate(itemA, itemB) {
    if (itemA.creationDate.year > itemB.creationDate.year) return -1;
    if (itemA.creationDate.year < itemB.creationDate.year) return 1;

    if (itemA.creationDate.month > itemB.creationDate.month) return -1;
    if (itemA.creationDate.month < itemB.creationDate.month) return 1;

    if (itemA.creationDate.day > itemB.creationDate.day) return -1;
    if (itemA.creationDate.day < itemB.creationDate.day) return 1;
    
    if (itemA.creationDate.hour > itemB.creationDate.hour) return -1;
    if (itemA.creationDate.hour < itemB.creationDate.hour) return 1;
    
    if (itemA.creationDate.min > itemB.creationDate.min) return -1;
    if (itemA.creationDate.min < itemB.creationDate.min) return 1;
    
    if (itemA.creationDate.sec > itemB.creationDate.sec) return -1;
    if (itemA.creationDate.sec < itemB.creationDate.sec) return 1;
    
    if (itemA.creationDate.ms > itemB.creationDate.ms) return -1;
    if (itemA.creationDate.ms < itemB.creationDate.ms) return 1;

    return 0;
  }
  // função de comparação para callback do método .sort() baseada no data de atualização da task
  filterCompareUpdateDate(itemA, itemB) {
    if (itemA.updateDate.year > itemB.updateDate.year) return -1;
    if (itemA.updateDate.year < itemB.updateDate.year) return 1;

    if (itemA.updateDate.month > itemB.updateDate.month) return -1;
    if (itemA.updateDate.month < itemB.updateDate.month) return 1;

    if (itemA.updateDate.day > itemB.updateDate.day) return -1;
    if (itemA.updateDate.day < itemB.updateDate.day) return 1;
    
    if (itemA.updateDate.hour > itemB.updateDate.hour) return -1;
    if (itemA.updateDate.hour < itemB.updateDate.hour) return 1;
    
    if (itemA.updateDate.min > itemB.updateDate.min) return -1;
    if (itemA.updateDate.min < itemB.updateDate.min) return 1;
    
    if (itemA.updateDate.sec > itemB.updateDate.sec) return -1;
    if (itemA.updateDate.sec < itemB.updateDate.sec) return 1;
    
    if (itemA.updateDate.ms > itemB.updateDate.ms) return -1;
    if (itemA.updateDate.ms < itemB.updateDate.ms) return 1;

    return 0;
  }
  // função de comparação para callback do método .sort() baseada no estado de conclusão da task
  filterCompareCompleted(itemA, itemB) {
    if (itemA.isCompleted > itemB.isCompleted ) return -1;
    if (itemA.isCompleted < itemB.isCompleted ) return 1;
    return 0;
  }
  // edita o título e descrição da task
  editTask(newTitle, newDescription) {
    this.tasks[this.currentSelected].setTitle(newTitle);
    this.tasks[this.currentSelected].setDescription(newDescription);
    // this.tasks[this.currentSelected].updateCard();
  }
  // retorna o título e descrição da tarefa atualmente selecionada
  getCurrentSelectedTaskInfo() {
    return [this.tasks[this.currentSelected].title, this.tasks[this.currentSelected].description];
  }
  // remove todas as tarefas marcadas como completas
  removeCompletedTasks() {
    let toKeep = []
    for (let index = 0; index < this.tasks.length; index += 1) {
      if (this.tasks[index].isCompleted) {
        this.tasks[index].delLi();
      } else {
        toKeep.push(this.tasks[index]);
      }
    }
    this.tasks = toKeep;
    this.currentSelected = this.getCurrentSelectedIndex();
    this.updateList();
    this.completedTasks = 0;
    this.storeTasks();
  }
  // remove todas as tarefas e reseta a lista
  removeAllTasks() {
    this.currentSelected = -1;
    this.mostRecent = null;
    for (let index = 0; index < this.tasks.length; index += 1) this.tasks[index].delLi();
    this.tasks = [];
    this.updateScroll();
    this.completedTasks = 0;
    this.storeTasks();
  }
  // retorna true se a lista conter tarefas marcadas como concluídas
  hasCompletedTasks() {
    return this.completedTasks > 0 ? true : false;
  }
  updateScroll() { // external
    window.cScroll.setScrollOnff(); // Esta linha atualiza se a barra de rolagem customizada deve aparecer
    window.cScroll.updateBallHeight(); // Esta linha atualiza o tamanho da barra de scroll customizada
    window.cScroll.updateMiniBallPosition(); // Esta linha atualiza a posição da bola menor quando uma nova tarefa é criada
  }
  // armazena tarefas no localstorage
  storeTasks() {
    let toStore = {};
    if (this.tasks.length == 0) return window.localStorage.clear();
    for (let index = 0; index < this.tasks.length; index += 1) {
      toStore[index] = this.tasks[index].getModelObject();
    }
    window.localStorage.setItem('taskList', JSON.stringify(toStore));
  }
  // carrega tarefas no localstorage
  loadTasks(callback) {
    let storedTasks = window.localStorage.getItem('taskList');
    if (storedTasks == null) return;
    storedTasks = JSON.parse(storedTasks);
    for (let value of Object.values(storedTasks)) {
      this.addTask(value.title, value.description, value.dateInfo.creation, value.dateInfo.update, value.completedState);
      console.log(value);
      console.log(this.mostRecent.isCompleted);
      if (typeof callback === 'function') callback(this.mostRecent);
    }
  }
}

const listOfTasks = new taskList('lista-tarefas');
// listOfTasks.addTask('b', 'g');
// listOfTasks.addTask('d', 'f');
// listOfTasks.addTask('a', 'h');
// listOfTasks.addTask('c', 'j');
// listOfTasks.addTask('e', 'i');
listOfTasks.filterListBy('creation');
