import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Checkbox, Button, FormControlLabel } from '@mui/material';
import Swal from 'sweetalert2';
import FavoriteButton from '../Components/FavoriteButton';
import ShareButton from '../Components/ShareButton';
import {
  getInProgressRecipesById,
  setDoneRecipe,
  // getDoneRecipes,
  setInProgressRecipe,
} from '../helpers/localRecipesManager';
import { searchFoodBy, searchDrinkBy } from '../services';
import SquareAcc from '../Components/accent/SquareAcc';
import '../styles/InProgressRecipes.css';
import getDateObj from '../util/genDateObj';
import getValuesByPrefixKey from '../util/getValuesByPrefixKey';
// import './css/InProgressRecipes';

function InProgressRecipes() {
  const history = useHistory();
  const detailsPage = document.URL.replace('/in-progress', '');
  const favoriteFormatObject = useRef({});
  const doneFormatOject = useRef({});
  const [isDisabledFinishRecipeButton, setIsDisabledFinishRecipeButton] = useState(true);

  const [, foodType, foodId] = history.location.pathname.split('/');

  const [foodInfo, setFoodInfo] = useState({
    img: 'food image',
    title: 'food title',
    categoryOrAlcoholicInfo: 'food category',
    ingredients: ['food ingredients'],
    instructions: 'food instructions',
  });

  // Checa se um ingrediente está na lista de ingerdientes concluídos a partir do Local Storage
  const isSeletectedIgrendient = useCallback((ingredientName) => (
    getInProgressRecipesById(foodType, foodId).includes(ingredientName)
  ), [foodType, foodId]);

  const loadMeal = useCallback(() => searchFoodBy('id', foodId, ([result]) => {
    const {
      strMealThumb: img,
      strMeal: title,
      strCategory: categoryOrAlcoholicInfo,
      strInstructions: instructions,
      strArea,
      strTags,
    } = result;

    const endIndex = -1;

    favoriteFormatObject.current = {
      id: foodId,
      type: foodType.slice(0, endIndex),
      nationality: strArea,
      category: categoryOrAlcoholicInfo,
      alcoholicOrNot: '',
      name: title,
      image: img,
    };

    // const timeStamp = new Date();
    const calendar = getDateObj();

    const dateStr = `${calendar.day}/${calendar.month}/${calendar.year}`;
    doneFormatOject.current = {
      id: foodId,
      type: foodType.slice(0, endIndex),
      nationality: strArea,
      category: categoryOrAlcoholicInfo,
      alcoholicOrNot: '',
      name: title,
      image: img,
      doneDate: dateStr,
      tags: strTags,
    };

    setFoodInfo({
      img,
      title,
      categoryOrAlcoholicInfo,
      nation: strArea,
      instructions,
      ingredients: getValuesByPrefixKey(result, 'strIngredient')
        .reduce((prev, item) => {
          prev[item] = isSeletectedIgrendient(item);
          return prev;
        }, {}),
    });
    // console.log(getValuesByPrefixKey(result, 'strIngredient'));
  }), [foodId, foodType, isSeletectedIgrendient]);

  const loadDrink = useCallback(() => searchDrinkBy('id', foodId, ([result]) => {
    // console.log(result);
    const {
      strDrinkThumb: img,
      strDrink: title,
      strAlcoholic: categoryOrAlcoholicInfo,
      strInstructions: instructions,
      strCategory,
      strTags,
    } = result;

    const endIndex = -1;

    favoriteFormatObject.current = {
      id: foodId,
      type: foodType.slice(0, endIndex),
      nationality: '',
      category: strCategory,
      alcoholicOrNot: categoryOrAlcoholicInfo,
      name: title,
      image: img,
    };

    const calendar = getDateObj();
    const dateStr = `${calendar.day}/${calendar.month}/${calendar.year}`;
    doneFormatOject.current = {
      id: foodId,
      type: foodType.slice(0, endIndex),
      nationality: '',
      category: strCategory,
      alcoholicOrNot: categoryOrAlcoholicInfo,
      name: title,
      image: img,
      doneDate: dateStr,
      tags: strTags,
    };

    setFoodInfo({
      img,
      title,
      categoryOrAlcoholicInfo,
      instructions,
      ingredients: getValuesByPrefixKey(result, 'strIngredient')
        .reduce((prev, item) => {
          prev[item] = isSeletectedIgrendient(item);
          return prev;
        }, {}),
    });
  }), [foodId, foodType, isSeletectedIgrendient]);

  // seleciona um elemento como concluído ou não no localSotorage e no estado dos ingredientes
  const processIngredientOnClick = ({ target: { checked, name } }) => {
    const { ingredients } = foodInfo;
    ingredients[name] = checked;

    setFoodInfo({
      ...foodInfo,
      ingredients,
    });

    setInProgressRecipe(
      foodType,
      foodId,
      Object.entries(ingredients)
        .filter(([, isFinished]) => isFinished)
        .map(([item]) => item),
    );

    setIsDisabledFinishRecipeButton(
      !Object.values(ingredients).every((value) => value),
    );

    if (Object.values(foodInfo.ingredients).every((value) => value)) {
      return Swal.fire({
        title: 'Good Job!',
        text: 'You picked up all igredients! 🙂',
        icon: 'success',
        confirmButtonText: 'Ok!',
        confirmButtonColor: '#fbb03b',
      });
    }
  };

  const finishRecipeClick = () => {
    setDoneRecipe(doneFormatOject.current);
    history.push('/done-recipes');
  };
  useEffect(() => {
    if (foodType === 'foods') loadMeal();
    if (foodType === 'drinks') loadDrink();
  }, [foodType, foodId, loadMeal, loadDrink]);

  return (
    <div className="InProgressRecipes">
      <SquareAcc />
      <div className="InProgressRecipes-infoContainer">
        <div>
          <h1 data-testid="recipe-title">{ foodInfo.title }</h1>
          <h2 data-testid="recipe-category">{ foodInfo.categoryOrAlcoholicInfo }</h2>
        </div>
        <img
          src={ foodInfo.img }
          alt={ foodInfo.title }
          data-testid="recipe-photo"
        />
      </div>
      <div className="InProgressRecipes-iconsContainer">
        <ShareButton testId="share-btn" textToCopy={ detailsPage } />
        <FavoriteButton
          testId="favorite-btn"
          foodId={ foodId }
          toFavoriteObject={ favoriteFormatObject.current }
        />
      </div>

      <h3>Instructions</h3>
      <p data-testid="instructions">{ foodInfo.instructions }</p>

      <h3>Finished Ingredients</h3>
      {
        Object.entries(foodInfo.ingredients).map(([item, isFinished], index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-step` }
            className="InProgressRecipes-ingredientSetp"
          >
            <FormControlLabel
              id={ item }
              control={
                <Checkbox
                  name={ item }
                  checked={ isFinished }
                  onChange={ processIngredientOnClick }
                  sx={ { '& .MuiSvgIcon-root': { fontSize: 28 } } }
                />
              }
              label={ item }
              labelPlacement="end"
            />
          </div>
        ))
      }
      <Button
        data-testid="finish-recipe-btn"
        disabled={ isDisabledFinishRecipeButton }
        onClick={ finishRecipeClick }
        fullWidth
        variant="contained"
        size="large"
      >
        Finish recipe
      </Button>
    </div>
  );
}

export default InProgressRecipes;
