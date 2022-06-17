import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Recommended from '../Components/Recommended';
import {
  deleteFavoriteBy,
  isDoneRecipe,
  isFavoriteRecipe,
  isInProgressRecipe,
  saveFavorite,
} from '../helpers/localRecipesManager';
import { searchDrinkBy, searchFoodBy } from '../services';
import style from '../styles/RecipeDetails.module.css';
import 'swiper/css';
import '../styles/RecipeDetails.css';
import CircleAcc from '../Components/accent/CircleAcc';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const [foodType, foodId] = pathname.split('/').slice(1, undefined);
  const toFavoriteObject = useRef({});

  const [foodTitle, setFoodTitle] = useState('');
  const [foodThumb, setFoodThumb] = useState('');
  const [foodIngredients, setFoodIngredients] = useState({
    ingredients: [], measures: [],
  });
  const [foodVideo, setFoodVideo] = useState('');
  const [foodInstructions, setFoodInstructions] = useState('');
  const [foodCategory, setFoodCategory] = useState('');
  const [foodRecommended, setFoodRecommended] = useState({ reverse: '', foodsList: [] });
  const [recipeStatus, setRecipeStatus] = useState('Start Recipe');
  const [recipeIsDone, setRecipeIsDone] = useState(false);
  const [shareButtonMessage, setShareButtonMessage] = useState('Share');
  const [
    favoriteIconStatus,
    setFavoriteIconStatus,
  ] = useState({ icon: whiteHeartIcon, isFavorite: false });

  const getIngredients = (food) => {
    const ingredientsCondition = ([key]) => (
      key.includes('strIngredient') && food[key] !== '' && food[key]
    );

    const measuressCondition = ([key]) => (
      key.includes('strMeasure') && food[key] !== '' && food[key]
    );
    setFoodIngredients({
      ingredients: Object.entries(food)
        .filter(ingredientsCondition)
        .map(([, value]) => value),
      measures: Object.entries(food)
        .filter(measuressCondition)
        .map(([, value]) => value),
    });
  };

  const handleStartRecipeClick = () => {
    history.push(`./${foodId}/in-progress`);
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareButtonMessage('Link copied!');
  };

  const handleFavoriteRecipeClick = () => {
    const favoriteAction = !favoriteIconStatus.isFavorite;
    const newStateIcon = favoriteIconStatus.isFavorite
      ? { icon: whiteHeartIcon, isFavorite: false }
      : { icon: blackHeartIcon, isFavorite: true };
    setFavoriteIconStatus(newStateIcon);
    if (favoriteAction) {
      saveFavorite(toFavoriteObject.current);
    } else { deleteFavoriteBy('id', foodId); }
  };

  const mealLoader = useCallback(() => (
    searchFoodBy('id', foodId, ([food]) => {
      // console.log(food);
      const {
        strMeal,
        strMealThumb,
        strYoutube,
        strInstructions,
        strCategory,
        strArea,
      } = food;

      getIngredients(food);

      setFoodTitle(strMeal);
      setFoodThumb(strMealThumb);
      setFoodVideo(strYoutube.replace('watch?v=', 'embed/'));
      setFoodInstructions(strInstructions);
      setFoodCategory(strCategory);

      const typeToSaveIndex = -1;
      toFavoriteObject.current = {
        id: foodId,
        type: foodType.slice(0, typeToSaveIndex),
        nationality: strArea,
        category: strCategory,
        alcoholicOrNot: '',
        name: strMeal,
        image: strMealThumb,
      };
    })), [foodId, foodType]);

  const drinkLoader = useCallback(() => (
    searchDrinkBy('id', foodId, ([food]) => {
      const {
        strDrink,
        strDrinkThumb,
        strInstructions,
        strAlcoholic,
        strCategory } = food;

      getIngredients(food);

      setFoodTitle(strDrink);
      setFoodThumb(strDrinkThumb);
      setFoodInstructions(strInstructions);
      setFoodCategory(strAlcoholic);

      const typeToSaveIndex = -1;
      toFavoriteObject.current = {
        id: foodId,
        type: foodType.slice(0, typeToSaveIndex),
        nationality: '',
        category: strCategory,
        alcoholicOrNot: strAlcoholic,
        name: strDrink,
        image: strDrinkThumb,
      };
    })), [foodId, foodType]);

  useEffect(() => {
    ({
      foods: mealLoader,
      drinks: drinkLoader,
    }[foodType])();

    const maxLengthRecomendation = 6;

    ({
      foods: () => searchDrinkBy(
        'random', '', (foodsList) => {
          foodsList = foodsList.slice(0, maxLengthRecomendation);
          setFoodRecommended({ reverse: 'drinks', foodsList });
        },
      ),
      drinks: () => searchFoodBy(
        'random', '', (foodsList) => {
          foodsList = foodsList.slice(0, maxLengthRecomendation);
          setFoodRecommended({ reverse: 'foods', foodsList });
        },
      ),
    }[foodType])();

    setRecipeIsDone(isDoneRecipe(foodId));
    const resolvedType = { foods: 'meals', drinks: 'cocktails' }[foodType];
    if (isInProgressRecipe(resolvedType, foodId)) setRecipeStatus('Continue Recipe');
    else setRecipeStatus('Start Recipe');

    if (isFavoriteRecipe(foodId)) {
      setFavoriteIconStatus(
        { icon: blackHeartIcon, isFavorite: true },
      );
    } else setFavoriteIconStatus({ icon: whiteHeartIcon, isFavorite: false });
  }, [foodId, foodType, mealLoader, drinkLoader]);

  return (
    <div className="RecipeDetails">
      <CircleAcc className="RecipeDetails-topAccent" />
      <div className="RecipeDetails-infoContainer">
        <div>
          <h1 data-testid="recipe-title">{ foodTitle }</h1>
          <h2 data-testid="recipe-category">{ foodCategory }</h2>
        </div>
        <img src={ foodThumb } alt={ foodTitle } data-testid="recipe-photo" />
      </div>

      <div className="RecipeDetails-iconsContainer">
        <Button
          className="RecipeDetails-share"
          endIcon={ <ShareIcon fontSize="large" /> }
          data-testid="share-btn"
          onClick={ handleShareClick }
        >
          { shareButtonMessage }
        </Button>

        <FavoriteIcon
          className="RecipeDetails-favorite"
          data-testid="favorite-btn"
          fontSize="large"
          onClick={ handleFavoriteRecipeClick }
          style={ {
            stroke: favoriteIconStatus.isFavorite ? 'transparent' : 'black',
            fill: favoriteIconStatus.isFavorite ? 'red' : 'white',
            transition: '.3s ease all',
          } }
        />
      </div>

      <h3>Ingredients</h3>
      <ul>
        {
          foodIngredients.ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${ingredient} ${foodIngredients.measures[index]}` }
            </li>
          ))
        }
      </ul>
      <h3>Instructions</h3>
      <p
        data-testid="instructions"
        className="RecipeDetails-instructions"
      >
        { foodInstructions }
      </p>
      {
        foodType === 'foods'
        && (
          <div className="RecipeDetails-videoContainer">
            <h3>Video</h3>
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ foodVideo }
              title="YouTube video player"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        )
      }
      <Recommended
        foodsList={ foodRecommended.foodsList }
        typeCard={ foodRecommended.reverse }
      />
      {
        !recipeIsDone && (
          <Button
            className={ style.StartRecipe }
            type="button"
            onClick={ handleStartRecipeClick }
            data-testid="start-recipe-btn"
            variant="contained"
            fullWidth
            style={ { marginTop: '15px' } }
          >
            { recipeStatus }
          </Button>
        )
      }
    </div>
  );
}

export default RecipeDetails;
