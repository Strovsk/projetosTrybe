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
const taskListElm = document.getElementById('lista-tarefas');
const doneEditButton = document.getElementById('done-edit-task-button');
const editTitleInput = document.getElementById('task-title-input-edit');

function checkEmptyTasksArea() {
  if(taskListElm.children.length == 0) {
    document.getElementById('empty-list-message').style.display = 'block';
  } else {
    document.getElementById('empty-list-message').style.display = 'none';
  }
}

function changeEditButtonState(currentSelected) {
  if(currentSelected == -1) {
    document.getElementById('edit-task-button').disabled = true;
    document.getElementById('edit-task-area').classList.add('disabled');
  } else {
    document.getElementById('edit-task-button').disabled = false;
  }
}

function checkTaskTitleInput() {
  if (addTaskTitle.value == '') {
    addTaskButton.disabled = true;
    // addTaskButton.classList.add('disable');
    return;
  } 
  addTaskButton.disabled = false;
  // addTaskButton.classList.remove('disable');
}

function editAreaPosition(elementFrameId, elementReferenceId) {
  const refElm = document.getElementById(elementReferenceId);
  const frameElm = document.getElementById(elementFrameId);
  const refElmBoundings = refElm.getBoundingClientRect();
  const frameElmBoundings = frameElm.getBoundingClientRect();
  frameElm.style.left = `${- frameElmBoundings.width / 3 - refElmBoundings.width / 2}px`;
  frameElm.style.bottom = `${refElmBoundings.height * 1.5}px`;
}

function dropdownOptionClickAction(ulElement, selectedElement) {
  for (let index = 0; index < ulElement.children.length; index += 1) {
    ulElement.children[index].addEventListener('click', () => {
      selectedElement.innerText = ulElement.children[index].innerText;
      if (selectedElement.innerText == 'Data de atualização') selectedElement.innerText = 'D. Atualização';
      if (selectedElement.innerText == 'Data de criação') selectedElement.innerText = 'D. Criação';
      ulElement.classList.remove('expand');
    });
  }
}

function dropdownChangeState(element, classeName) {
  if (element.classList.contains(classeName)) element.classList.remove(classeName);
  else element.classList.add(classeName);
}

function changeFrameAreaState() {
  const frameElm = document.getElementById('edit-task-area');
  if(frameElm.classList.contains('disabled')) {
    frameElm.classList.remove('disabled');
    frameElm.style.filter = 'opacity(1)';
  } else {
    frameElm.classList.add('disabled');
  }
}

function changeEditFrameDoneButtonState() {
  if(editTitleInput.value == '') {
    doneEditButton.disabled = true;
  } else {
    doneEditButton.disabled = false;
  }
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

changeFrameAreaState();
changeEditButtonState(listOfTasks.currentSelected);
checkTaskTitleInput();
dropdownSelectAction('filter-options', -202);
dropdownSelectAction('filter-direction', -82);
editAreaPosition('edit-task-area', 'edit-task-button');

addDescriptionButton.onclick = () => {
  if(!addDescriptionInput.classList.contains('on')) {
    addDescriptionInput.classList.add('on');
    addDescriptionButton.innerText = 'remover descrição';
  } else {
    addDescriptionInput.classList.remove('on');
    addDescriptionButton.innerText = 'adicionar descrição';
  }
};

addTaskButton.onclick = () => {
  listOfTasks.addTask(addTaskTitle.value, addDescriptionInput.value);
  addTaskTitle.value = '';
  addDescriptionInput.value = '';
  checkTaskTitleInput();
  checkEmptyTasksArea();
  listOfTasks.mostRecent.getLi().addEventListener('click', () => {
    changeEditButtonState(listOfTasks.currentSelected);
  });
};

addTaskTitle.onkeyup = () => {
  checkTaskTitleInput();
};

editTitleInput.addEventListener('keyup', () => {
  changeEditFrameDoneButtonState();
});

document.getElementById('edit-task-button').onclick = () => {
  changeFrameAreaState();
}