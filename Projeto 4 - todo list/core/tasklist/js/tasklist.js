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
  }
}

const listOfTasks = new taskList('lista-tarefas');