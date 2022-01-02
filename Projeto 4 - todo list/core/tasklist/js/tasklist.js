class taskList {
  constructor(containerId) {
    this.tasks = [];
    this.container = document.getElementById(containerId);
    this.currentSelected = -1;
  }
  addTask(title, description) {
    let newTask = new Task(title, description);
    newTask.selectSetIt();
    
    this.tasks.push(newTask);
    this.container.appendChild(newTask.getLi());
    newTask.checkTaskScrollHeight();

    this.taskClickAction(newTask);

    window.cScroll.setScrollOnff(); // Esta linha atualiza se a barra de rolagem customizada deve aparecer
    window.cScroll.updateBallHeight(); // Esta linha atualiza o tamanho da barra de scroll customizada
    window.cScroll.updateMiniBallPosition(); // Esta linha atualiza a posição da bola menor quando uma nova tarefa é criada
  }
  updateList() {
    return false;
  }
  getCurrentSelectedIndex() {
    for (let index = 0; index < this.tasks.length; index += 1) {
      if (this.tasks[index].isSelected) return index;
    }
    return -1;
  }
  taskClickAction(task) {
    task.getLi().addEventListener('click', (e) => {
      if (this.currentSelected != -1) this.tasks[this.currentSelected].selectRemove();
      this.currentSelected = this.getCurrentSelectedIndex();
    });
  }
  taskRemoveAction(task) {
    return false;
  }
}

const listOfTasks = new taskList('lista-tarefas');