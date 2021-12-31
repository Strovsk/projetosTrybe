class taskList {
  constructor(containerId) {
    this.tasks = [];
    this.container = document.getElementById(containerId);
  }
  addTask(title, description) {
    let newTask = new Task(title, description);
    this.tasks.push(newTask);
    this.container.appendChild(newTask.getLi());
    newTask.checkTaskScrollHeight();

    window.cScroll.setScrollOnff(); // Esta linha atualiza se a barra de rolagem customizada deve aparecer
    window.cScroll.updateBallHeight(); // Esta linha atualiza o tamanho da barra de scroll customizada
    window.cScroll.updateMiniBallPosition(); // Esta linha atualiza a posição da bola menor quando uma nova tarefa é criada
  }
}

const listOfTasks = new taskList('lista-tarefas');