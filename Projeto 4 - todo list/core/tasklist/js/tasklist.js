class taskList {
  constructor(containerId) {
    this.tasks = [];
    this.container = document.getElementById(containerId);
    this.currentSelected = -1;
    this.filterMode = 'creation';
    this.filterDirection = 'auto';
    this.mostRecent = null;
  }
  // adiciona uma tarefa
  addTask(title, description) {
    let newTask = new Task(title, description);
    newTask.selectSetIt();
    
    this.tasks.push(newTask);
    this.container.appendChild(newTask.getLi());
    newTask.checkTaskScrollHeight();

    this.taskRemoveAction(newTask);
    this.taskClickAction(newTask);
    this.mostRecent = newTask;

    // adicionar a atualização de inserção por filtro
    this.filterListBy(this.filterMode, this.filterDirection);

    window.cScroll.setScrollOnff(); // Esta linha atualiza se a barra de rolagem customizada deve aparecer
    window.cScroll.updateBallHeight(); // Esta linha atualiza o tamanho da barra de scroll customizada
    window.cScroll.updateMiniBallPosition(); // Esta linha atualiza a posição da bola menor quando uma nova tarefa é criada
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
      this.tasks.pop(task);
      this.currentSelected = -1;
      this.updateList();
    });
  }

  updateList() {
    this.container.innerHTML = '';
    this.tasks.forEach((item) => {
      this.container.appendChild(item.getLi());
    });
  }
  filterInvertListDirection(direction = 'auto') {
    return this.filterListBy(this.filterMode, direction);
  }
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
    if(order == 'reverse') this.tasks = this.tasks.reverse();
    this.updateList();
  }
  filterCompareTitleAlpha(itemA, itemB) {
    if (itemA.title < itemB.title ) return -1;
    if (itemA.title > itemB.title ) return 1;
    return 0;
  }
  filterCompareDescripitionAlpha(itemA, itemB) {
    if (itemA.description < itemB.description ) return -1;
    if (itemA.description > itemB.description ) return 1;
    return 0;
  }
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
  filterCompareCompleted(itemA, itemB) {
    if (itemA.isCompleted > itemB.isCompleted ) return -1;
    if (itemA.isCompleted < itemB.isCompleted ) return 1;
    return 0;
  }
  editTask(newTitle, newDescription) {
    this.tasks[this.currentSelected].setTitle(newTitle);
    this.tasks[this.currentSelected].setDescription(newDescription);
    this.tasks[this.currentSelected].updateCard();
  }
  getCurrentSelectedTaskInfo() {
    return [this.tasks[this.currentSelected].title, this.tasks[this.currentSelected].description];
  }
  removeCompletedTasks() {
    let toKeep = []
    for (let index = 0; index < this.tasks.length; index += 1) {
      if(this.tasks[index].isCompleted) {
        this.tasks[index].delLi();
      } else {
        toKeep.push(this.tasks[index]);
      }
    }
    this.tasks = toKeep;
    this.currentSelected = this.getCurrentSelectedIndex();
    this.updateList();
  }
}

const listOfTasks = new taskList('lista-tarefas');
// listOfTasks.addTask('b', 'g');
// listOfTasks.addTask('d', 'f');
// listOfTasks.addTask('a', 'h');
// listOfTasks.addTask('c', 'j');
// listOfTasks.addTask('e', 'i');
listOfTasks.filterListBy('creation');

// Funções que não pertecem a classe e devem ser removidas para que a classe funcione sozinha