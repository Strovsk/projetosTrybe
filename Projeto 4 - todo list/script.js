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

checkTaskTitleInput();

addDescriptionButton.onclick = () => {
  if(!addDescriptionInput.classList.contains('on')) {
    addDescriptionInput.classList.add('on');
    addDescriptionButton.innerText = 'remove description';
  } else {
    addDescriptionInput.classList.remove('on');
    addDescriptionButton.innerText = 'add description';
  }
};

addTaskButton.onclick = () => {
  listOfTasks.addTask(addTaskTitle.value, addDescriptionInput.value);
  addTaskTitle.value = '';
  addDescriptionInput.value = '';
  checkTaskTitleInput();
};

addTaskTitle.onkeyup = () => {
  checkTaskTitleInput();
};

function checkTaskTitleInput() {
  if (addTaskTitle.value == '') {
    addTaskButton.disabled = true;
    addTaskButton.classList.add('disable');
    return;
  } 
  addTaskButton.disabled = false;
  addTaskButton.classList.remove('disable');
}

function dropdownChangeState(element, classeName) {
  if (element.classList.contains(classeName)) element.classList.remove(classeName);
  else element.classList.add(classeName);
}

function dropdownSelectAction(dropdownContainerId, optionsPosition) {
  const container = document.getElementById(dropdownContainerId);
  const selectArea = container.children[1].children[0];
  const optionsList = container.children[1].children[1];
  optionsList.style.top = `${optionsPosition}px`;
  selectArea.onclick = () => {
    dropdownChangeState(optionsList, 'expand');
  }
  dropdownOptionClickAction(optionsList, selectArea);
}

function dropdownOptionClickAction(ulElement, selectedElement) {
  for (let index = 0; index < ulElement.children.length; index += 1) {
    ulElement.children[index].addEventListener('click', () => {
       selectedElement.innerText = ulElement.children[index].innerText;
       ulElement.classList.remove('expand');
    });
  }
}
dropdownSelectAction('filter-options', -200);
dropdownSelectAction('filter-direction', -80);