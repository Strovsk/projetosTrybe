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

const addTaskTitle = document.getElementById('task-title-input');
const addDescriptionButton = document.getElementById('add-description-button');
const addDescriptionInput = document.getElementById('description-input');
const addTaskButton = document.getElementById('add-task-button');

addDescriptionButton.onclick = () => {
  if(!addDescriptionInput.classList.contains('on')) {
    addDescriptionInput.classList.add('on');
    addDescriptionButton.innerText = 'remove description';
  } else {
    addDescriptionInput.classList.remove('on');
    addDescriptionButton.innerText = 'add description';
  }
}

addTaskButton.onclick = () => {
  listOfTasks.addTask(addTaskTitle.value, addDescriptionInput.value);
  addTaskTitle.value = '';
  addDescriptionInput.value = '';
}