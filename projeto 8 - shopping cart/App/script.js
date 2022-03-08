(() => {
  let buffer;
  const categoriesList = [];
  for (let index = 0; index < 4; index += 1) {
    buffer = new StaticCube('#categories');
    categoriesList.push(buffer);
  }
})();
