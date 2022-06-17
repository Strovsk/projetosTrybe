import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
// import { getAllFromLocalStorage } from '../util/localStorageConfig';
import shareIconButton from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes({ title }) {
  const [isCopied, setIsCopied] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterArgumment, setFilterArgumment] = useState('');

  useEffect(() => {
    // const { favoriteRecipesLocalStorage } = getAllFromLocalStorage();
    const favoriteRecipesLocalStorage = JSON.parse(localStorage
      .getItem('favoriteRecipes'));
    console.log(favoriteRecipesLocalStorage);
    // const favorite = JSON.parse(favoriteRecipesLocalStorage);
    setRecipes(favoriteRecipesLocalStorage);
    setFiltered(favoriteRecipesLocalStorage);
  }, []);
  // console.log(recipes);

  // useEffect(() => {
  //   setFavoriteRecipes(recipes.filter(({ favorite }) => favorite));
  // }, [recipes]);
  // console.log(favoriteRecipes);

  const createDetailLink = (foodType, foodId, mode = 'full') => ({
    full: `http://${window.location.host}/${foodType}s/${foodId}`,
    path: `/${foodType}s/${foodId}`,
  }[mode]);

  const clickShareAction = (foodType, foodId) => {
    // NOTE a substring http:// deve ser removida
    navigator.clipboard.writeText(createDetailLink(foodType, foodId));
    setIsCopied(true);
  };
  // const noFilters = () => {
  //   setIsFiltred(false);
  //   setFilterArgumment('');
  // };

  const handleFavoriteRecipeClick = ({ target: { id } }) => {
    const newFavorites = recipes.filter(({ id: recipeId }) => recipeId !== id);
    setRecipes(newFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    const filteredRecipes = newFavorites.filter(({ id: recipeId }) => recipeId !== id);
    setFiltered(filteredRecipes);
  };

  const handleFilter = ({ target: { value } }) => {
    console.log(recipes);
    if (filterArgumment !== value) {
      setFilterArgumment(value);
      const filteredFood = recipes.filter(({ type }) => type.includes(value));
      setFiltered(filteredFood);
    } else {
      setFilterArgumment('');
      setFiltered(recipes);
    }
  };
  return (
    <>
      <Header title={ title } canSearch={ false } />
      <div className="button-container">

        <button
          type="button"
          data-testid="filter-by-food-btn"
          value="food"
          onClick={ handleFilter }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          value="drink"
          onClick={ handleFilter }
        >
          Drink
        </button>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          value=""
          onClick={ handleFilter }
        >
          All
        </button>
      </div>
      <div className="recipes-container">
        {filtered && filtered.map((recipe, index) => (
          <div className="recipe-card" key={ index }>
            <Link
              key={ index }
              to={ createDetailLink(recipe.type, recipe.id, 'path') }
            >
              <img
                src={ recipe.image }
                alt={ recipe.name }
                data-testid={ `${index}-horizontal-image` }
                width="400"
                height="400"
              />
            </Link>
            <p
              data-testid={ `${index}-horizontal-top-text` }
            >
              { recipe.type === 'food'
                ? `${recipe.nationality} - ${recipe.category}`
                : `${recipe.alcoholicOrNot}` }
            </p>
            <Link to={ createDetailLink(recipe.type, recipe.id, 'path') }>
              <p
                data-testid={ `${index}-horizontal-name` }
              >
                { recipe.name }
              </p>
            </Link>
            <button
              type="button"
              onClick={ () => clickShareAction(recipe.type, recipe.id) }
            >
              { isCopied ? (
                'Link copied!'
              ) : (
                <img
                  src={ shareIconButton }
                  alt="Share Icon"
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              )}
            </button>
            {/* Trocar tag img para object depois que o projeto ficar pronto */}
            <img
              role="presentation"
              onClick={ (e) => handleFavoriteRecipeClick(e) }
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="Favorite Heart"
              id={ recipe.id }
            />

          </div>
        ))}
      </div>

    </>
  );
}

FavoriteRecipes.propTypes = {
  title: PropTypes.string,
}.isRequired;
export default FavoriteRecipes;
