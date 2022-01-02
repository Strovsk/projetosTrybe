class taskList {
  constructor(containerId) {
    this.tasks = [];
    this.container = document.getElementById(containerId);
    this.currentSelected = -1;
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

    window.cScroll.setScrollOnff(); // Esta linha atualiza se a barra de rolagem customizada deve aparecer
    window.cScroll.updateBallHeight(); // Esta linha atualiza o tamanho da barra de scroll customizada
    window.cScroll.updateMiniBallPosition(); // Esta linha atualiza a posição da bola menor quando uma nova tarefa é criada
  }
  updateList() {
    return false;
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
    });
  }
}

const listOfTasks = new taskList('lista-tarefas');