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
const taskListMasterContainerElm = document.getElementById('scroll-master-container');
const doneEditButton = document.getElementById('done-edit-task-button');
const editTitleInput = document.getElementById('task-title-input-edit');
const editTaskButton = document.getElementById('edit-task-button');
const taskDescriptionInputEdit = document.getElementById('task-decription-input-edit');
const editTaskArea = document.getElementById('edit-task-area');
const removeCompletedContainer = document.getElementById('remove-completed-container');
const emptyListMessageElm = document.getElementById('empty-list-message');
const removeAllTasksButton = document.getElementById('remove-all-container');
const frameElm = document.getElementById('edit-task-area');
const plusButtonElm = document.getElementById('add-task-plus-icon-container');
const plusButtonLineHor = document.getElementById('linha-vert-plus-button');
const plusButtonLineVert = document.getElementById('linha-hor-plus-button');
const plusButtonGPath = document.getElementById('plus');
const optionPanelElm = document.getElementById('option-panel');
const warningModalElm = document.getElementById('warning-modal');
const warningModalYesBtn = document.getElementById('yes-modal-btn');
const warningModalNoBtn = document.getElementById('no-modal-btn');
const messageModal = document.getElementById('message-modal');

// checa se a lista de tarefas está vazia e mostra mensagem caso esteja
function checkEmptyTasksArea() {
  // console.log('chamada da checagem de lista');
  if (taskListElm.children.length == 0) {
    taskListMasterContainerElm.classList.add('off');
    emptyListMessageElm.style.display = 'inline';
  } else {
    taskListMasterContainerElm.classList.remove('off');
    emptyListMessageElm.style.display = 'none';
  }
}

// muda o status do botão editar de acordo com o valor de índice recebido do objeto tasklist
function changeEditButtonState(currentSelected) {
  if (currentSelected == -1) {
    editTaskButton.disabled = true;
    editTaskArea.classList.add('disabled');
  } else {
    editTaskButton.disabled = false;
  }
}

// checa se o texto do input está vazio e desativa o botão de adicionar tarefa caso esteja
function checkTaskTitleInput() {
  if (addTaskTitle.value == '') {
    addTaskButton.disabled = true;
    // addTaskButton.classList.add('disable');
    return;
  } 
  addTaskButton.disabled = false;
  // addTaskButton.classList.remove('disable');
}

// edita a posição do frame de acordo com um elemento de referência (duplicado)
function editAreaPosition() {
  frameElm.style.bottom = `0px`;
  frameElm.style.bottom = `0px`;
}

// ativa as funções de interação com o dropdown
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

// muda o estado do dropdown de acordo com a situação atual
function dropdownChangeState(element, classeName) {
  if (element.classList.contains(classeName)) element.classList.remove(classeName);
  else element.classList.add(classeName);
}

// muda o estado do frame de edição de task aberto ou fechado
function changeFrameAreaState() {
  const frameElm = document.getElementById('edit-task-area');
  if (frameElm.classList.contains('disabled')) {
    frameElm.classList.remove('disabled');
    frameElm.style.filter = 'opacity(1)';
  } else {
    frameElm.classList.add('disabled');
  }
}

function changeEditFrameDoneButtonState() {
  if (editTitleInput.value == '') {
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

// minimiza ou expande o painel de opções option-panel quando chamada
function changeWindowLayoutState() {
  if (!optionPanelElm.classList.contains('minimized')) {
    optionPanelElm.classList.add('minimized');
    plusButtonElm.classList.remove('to-close');
  }
  else {
    optionPanelElm.classList.remove('minimized');
    plusButtonElm.classList.add('to-close');
  }
}

// alterna o estado do botão de id #plus entre plus e close
function changePlusButtonState() {
  if (!plusButtonElm.classList.contains('disabled')) {
    plusButtonElm.classList.add('disabled');
  } else {
    plusButtonElm.classList.remove('disabled');
  }
}

// alterna o estado do modal de warning entre minimizado e não minimizado
function changeModalWarningState() {
  if (!warningModalElm.classList.contains('disabled')) warningModalElm.classList.add('disabled');
  else warningModalElm.classList.remove('disabled');
}

// Executa ações e altera a forma da disposição as informações para o modal warning
function modalDetails(text = 'Você tem certeza disso?', inactiveYes = false, noBtnMsg = 'não', callback) {
  changeModalWarningState();
  messageModal.innerText = text;
  warningModalNoBtn.innerText = noBtnMsg;
  if (inactiveYes) warningModalYesBtn.classList.add('inactive');
  else warningModalYesBtn.classList.remove('inactive');
  warningModalYesBtn.onclick = () => {
    callback();
    changeModalWarningState();
  }
}

cScroll.setScrollOnff(true);
changeFrameAreaState();
changeEditButtonState(listOfTasks.currentSelected);
checkTaskTitleInput();
dropdownSelectAction('filter-options', -202);
dropdownSelectAction('filter-direction', -82);
editAreaPosition();
checkEmptyTasksArea();
changeModalWarningState();

addDescriptionButton.onclick = () => {
  if (!addDescriptionInput.classList.contains('on')) {
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
  listOfTasks.mostRecent.getTrashButton().addEventListener('click', () => {
    listOfTasks.mostRecent.getLi().addEventListener('animationend', () => {
      checkEmptyTasksArea();
    });
  });
  listOfTasks.storeTasks();
};

addTaskTitle.onkeyup = () => {
  checkTaskTitleInput();
};

editTitleInput.addEventListener('keyup', () => {
  changeEditFrameDoneButtonState();
});

editTaskButton.onclick = () => {
  changeFrameAreaState();
  changePlusButtonState();
  editTitleInput.value = listOfTasks.getCurrentSelectedTaskInfo()[0];
  taskDescriptionInputEdit.value = listOfTasks.getCurrentSelectedTaskInfo()[1];
  doneEditButton.disabled = false;
}

doneEditButton.addEventListener('click', () => {
  const newT = editTitleInput.value;
  const newD = taskDescriptionInputEdit.value;
  listOfTasks.editTask(newT, newD);
  editTitleInput.value = '';
  taskDescriptionInputEdit.value = '';
  editTaskArea.classList.add('disabled');
  changePlusButtonState();
});

removeCompletedContainer.onclick = () => {
  if (listOfTasks.hasCompletedTasks()) modalDetails(
    'Você tem certeza que deseja remover todas as tarefas marcadas como completas?', false, 'não',
    () => {
      listOfTasks.removeCompletedTasks();
      checkEmptyTasksArea();
      changeEditButtonState(listOfTasks.currentSelected);
    });
    else modalDetails(
      'Não há tarefas completas para serem removidas', true, 'ok',
      () => {return false;});
  changeEditButtonState(listOfTasks.currentSelected);
}

removeAllTasksButton.addEventListener('click', () => {
  if (listOfTasks.tasks.length > 0) modalDetails(
    'Você tem certeza que deseja remover todas as tarefas?', false, 'não',
    () => {
      listOfTasks.removeAllTasks();
      checkEmptyTasksArea();
      changeEditButtonState(listOfTasks.currentSelected);
    });
  else modalDetails(
    'Não há tarefas para serem removidas', true, 'ok',
    () => {return false});
});
warningModalNoBtn.addEventListener('click', () => {
  changeModalWarningState();
});

plusButtonElm.addEventListener('click', () => {
  plusButtonGPath.classList.add('clicked-plus');
  changeWindowLayoutState();
  plusButtonGPath.addEventListener('animationend', () => {
    plusButtonGPath.classList.remove('clicked-plus');
  });
});

window.onload = () => {
  if (window.getComputedStyle(optionPanelElm).getPropertyValue('position') == 'absolute') {
    changeWindowLayoutState();
  }
  listOfTasks.loadTasks();
  checkEmptyTasksArea();
}
window.onreset = () => {
  if (window.getComputedStyle(optionPanelElm).getPropertyValue('position') == 'absolute') {
    changeWindowLayoutState();
  }
  listOfTasks.loadTasks();
  checkEmptyTasksArea();
}
