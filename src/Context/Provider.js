import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { getAllFromLocalStorage } from '../util/localStorageConfig';
import recipesContext from './recipesContext';

export default function Provider({ children }) {
  const [mealsToken, setMealsToken] = useState();
  const [cocktailsToken, setCocktailsToken] = useState();
  const [user, setUser] = useState();
  const [doneRecipes, setDoneRecipes] = useState();
  const [favoriteRecipes, setFavoriteRecipes] = useState();
  const [inProgressRecipes, setInProgressRecipes] = useState();
  const [resultsFood, setResultsFood] = useState([]);
  const [resultsDrink, setResultsDrink] = useState([]);

  useEffect(() => {
    const {
      mealsTokenLocalStorage,
      cocktailsTokenLocalStorage,
      userLocalStorage,
      doneRecipesLocalStorage,
      favoriteRecipesLocalStorage,
      inProgressRecipesLocalStorage,
    } = getAllFromLocalStorage();

    setMealsToken(mealsTokenLocalStorage);
    setCocktailsToken(cocktailsTokenLocalStorage);
    setUser(userLocalStorage);
    setDoneRecipes(doneRecipesLocalStorage);
    setFavoriteRecipes(favoriteRecipesLocalStorage);
    setInProgressRecipes(inProgressRecipesLocalStorage);
  }, []);

  const finalState = {
    mealsToken,
    setMealsToken,
    cocktailsToken,
    setCocktailsToken,
    user,
    setUser,
    doneRecipes,
    setDoneRecipes,
    favoriteRecipes,
    setFavoriteRecipes,
    inProgressRecipes,
    setInProgressRecipes,
    resultsFood,
    setResultsFood,
    resultsDrink,
    setResultsDrink,
  };

  return (
    <recipesContext.Provider value={ finalState }>
      { children }
    </recipesContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
