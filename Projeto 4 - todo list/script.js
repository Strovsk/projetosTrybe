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

const addDescriptionButton = document.getElementById('add-description-button');
const addDescriptionInput = document.getElementById('description-input');

addDescriptionButton.onclick = () => {
  if(!addDescriptionInput.classList.contains('on')) addDescriptionInput.classList.add('on');
  else addDescriptionInput.classList.remove('on');
}