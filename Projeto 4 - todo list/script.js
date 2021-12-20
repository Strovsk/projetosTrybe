/*
Task structure

{
  autorefElem: HTMLElement,
  selfIndex: signed integer,
  title: string,
  description,
  ...
}
*/

let allTasks = [];
let current = -1;
const taskListE = document.querySelector('#lista-tarefas');
const orderDataName = 'data-order';

function updateSelfIndex() {
  allTasks.forEach((value, index) => {
    allTasks[index].autorefElem.setAttribute(orderDataName, index);
  });
}

// Atualiza o valor do elemento atualmente selecionado
function updateCurrent() {
  current = -1;
  allTasks.forEach((value, index) => {
    const check = window.getComputedStyle(value.autorefElem).getPropertyValue('background-color');
    if (check === 'rgb(128, 128, 128)') current = index;
  });
}

// controle de como os itens devem ser selecionados
function clickForElement(elm) {
  elm.addEventListener('click', (e) => {
    if (current !== -1) allTasks[current].autorefElem.style.backgroundColor = 'rgb(255, 255, 255)';
    e.target.style.backgroundColor = 'rgb(128, 128, 128)';
    updateCurrent();
  });
  elm.addEventListener('dblclick', (e) => {
    if (!e.target.classList.contains('completed')) e.target.classList.add('completed');
    else e.target.classList.remove('completed');
    updateSelfIndex();
    allTasks[e.target.getAttribute(orderDataName)].isCompleted = true;
  });
}

// Adiciona uma tarefa na lista a partir de dada descrição
function createTask(description, selfIndexAtt, completedStatus = false) {
  const taskE = document.createElement('li');
  taskE.innerText = description;
  taskE.setAttribute(orderDataName, selfIndexAtt);
  taskListE.appendChild(taskE);
  clickForElement(taskE);
  if (completedStatus) taskE.classList.add('completed');
  return taskE;
}

// Criar tarefa quando clicar
document.querySelector('#criar-tarefa').onclick = () => {
  const taskDescriptionE = document.querySelector('#texto-tarefa');
  if (taskDescriptionE.value === '') return '';
  const task = createTask(taskDescriptionE.value, allTasks.length, false);
  if (taskDescriptionE.value === '') return -1;
  allTasks.push({
    autorefElem: task,
    title: 'string',
    description: taskDescriptionE.value,
    isCompleted: false,
  });
  taskDescriptionE.value = '';
  console.log('task adicionada');
};

// Remover todas as tarefas
document.querySelector('#apaga-tudo').onclick = () => {
  taskListE.innerHTML = '';
  allTasks = [];
  current = -1;
};

// Remover itens marcados como completos
document.querySelector('#remover-finalizados').onclick = () => {
  const buffer = [];
  for (let index = 0; index < allTasks.length; index += 1) {
    if (allTasks[index].autorefElem.classList.contains('completed')) {
      allTasks[index].autorefElem.remove();
    } else {
      buffer.push(allTasks[index]);
    }
  }
  allTasks = buffer;
  updateSelfIndex();
  updateCurrent();
};

// Armazenar tarefas
document.querySelector('#salvar-tarefas').onclick = () => {
  // if (allTasks.length === 0) return -1;
  try {
    localStorage.setItem('tasks', JSON.stringify({ ...allTasks }));
    console.log('tasks salvas para próximas tentativas');
  } catch (error) {
    console.log('não foi possível salvar as tasks');
  }
};

// Retorna as tasks salvas no localstorage ou retorna um objeto vazio
function getTasks() {
  const objTasks = JSON.parse(localStorage.getItem('tasks'));
  if (!objTasks) return {};
  return objTasks;
}

// Atualiza a lista de tarefas
function updateTaskList() {
  allTasks.forEach((item) => {
    taskListE.appendChild(item.autorefElem);
  });
}

window.onload = () => {
  const tasks = getTasks();
  let iterator = -1;
  Object.values(tasks).forEach((value) => {
    allTasks.push({
      autorefElem: createTask(value.description, iterator += 1, value.isCompleted),
      title: 'undefined',
      description: value.description,
      isCompleted: value.isCompleted,
    });
  });
  console.log(allTasks);
  if (allTasks.length > 0) updateTaskList();
};

document.querySelector('#mover-cima').onclick = () => {
  if (current - 1 < 0) return '';
  const buffer = allTasks[current];
  allTasks[current] = allTasks[current - 1];
  allTasks[current - 1] = buffer;
  updateTaskList();
  updateCurrent();
};

document.querySelector('#mover-baixo').onclick = () => {
  if (current + 1 >= allTasks.length || current === -1) return '';
  const buffer = allTasks[current];
  allTasks[current] = allTasks[current + 1];
  allTasks[current + 1] = buffer;
  updateTaskList();
  updateCurrent();
};

document.querySelector('#remover-selecionado').onclick = () => {
  if (current < 0) return '';
  console.log(allTasks[current]);
  allTasks[current].autorefElem.remove();
  allTasks.splice(current, 1);
  console.log(allTasks);
  updateTaskList();
  updateCurrent();
};
