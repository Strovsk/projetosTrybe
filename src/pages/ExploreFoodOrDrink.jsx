import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import BottomMenu from '../Components/BottomMenu';
import Header from '../Components/Header';
import * as requestApi from '../services';

// import './css/ExploreFoodOrDrink';

function ExploreFoodOrDrink({ title }) {
  console.log(title);
  const history = useHistory();

  const requestRandomid = async (explore) => {
    if (explore === 'Explore Drinks') {
      const { idDrink } = (await requestApi.searchDrinkBy('oneRandom', '', () => {}))[0];
      return history.push(`/drinks/${idDrink}`);
    }
    const { idMeal } = (await requestApi.searchFoodBy('oneRandom', '', () => {}))[0];
    return history.push(`/foods/${idMeal}`);
  };

  const goTo = (page) => {
    const patchStorageFoods = {
      ingredients: () => history.push('/explore/foods/ingredients'),
      nationality: () => history.push('/explore/foods/nationalities'),
    };
    const patchStorageDrinks = {
      ingredients: () => history.push('/explore/drinks/ingredients'),
      surprise: () => history.push(`/foods/${requestRandomid(title)}`),
    };

    switch (title) {
    case 'Explore Drinks':
      return patchStorageDrinks[page]();
    case 'Explore Foods':
      return patchStorageFoods[page]();
    default:
      break;
    }
  };

  return (
    <div>
      <Header title={ title } canSearch={ false } />
      <div className="button-container">
        <button
          data-testid="explore-by-ingredient"
          type="button"
          onClick={ () => goTo('ingredients') }
        >
          By Ingredient
        </button>

        <button
          data-testid="explore-surprise"
          type="button"
          onClick={ () => requestRandomid(title) }
        >
          Surprise me!
        </button>

        { title === 'Explore Foods'
          && (
            <button
              data-testid="explore-by-nationality"
              type="button"
              onClick={ () => goTo('nationality') }
            >
              By Nationality
            </button>)}
      </div>
      <BottomMenu />
    </div>
  );
}

ExploreFoodOrDrink.propTypes = {
  title: PropTypes.string,
  canSearch: PropTypes.bool,
}.isRequired;

export default ExploreFoodOrDrink;
