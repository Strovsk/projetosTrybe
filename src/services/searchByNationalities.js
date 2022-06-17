const getNationalities = async () => {
  const requisicao = await fetch(
    'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
  );
  const requisicaoJson = await requisicao.json();
  return requisicaoJson;
};

export default getNationalities;
