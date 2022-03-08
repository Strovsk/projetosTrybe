// todo colocar treco rgba na cor das bolinas e colocar todos os itens na frente das bolinhas no component sale
(() => {
  let buffer;
  const categoriesList = [];
  for (let index = 0; index < 4; index += 1) {
    buffer = new StaticCube('#categories');
    categoriesList.push(buffer);
  }
})();