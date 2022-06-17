import React from 'react';
import PropTypes from 'prop-types';
import '../styles/ItemCard.css';

export default function ItemCard({
  typeCard,
  recipeInfo,
  index,
  testid,
  titleTestId,
  variant,
}) {
  let foodName = '';
  let foodImg = '';
  (() => ({
    foods: () => { foodName = recipeInfo.strMeal; foodImg = recipeInfo.strMealThumb; },
    drinks: () => { foodName = recipeInfo.strDrink; foodImg = recipeInfo.strDrinkThumb; },
  })[typeCard.toLowerCase()]())();

  return (
    <li
      data-testid={ testid }
      className={ variant === 'minimal' ? 'ItemCard--minimal' : 'ItemCard' }
    >
      <h2 data-testid={ titleTestId } className="ItemCard-title">{ foodName }</h2>
      <div className="ItemCard-shadow" />
      <div className="ItemCard-imgContainer">
        <img
          data-testid={ `${index}-card-img` }
          src={ foodImg }
          alt={ foodName }
        />
      </div>
    </li>
  );
}

ItemCard.propTypes = {
  typeCard: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  recipeInfo: PropTypes.shape({
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
  }).isRequired,
  testid: PropTypes.string.isRequired,
  titleTestId: PropTypes.string,
  variant: PropTypes.string,
};

ItemCard.defaultProps = {
  titleTestId: 'valueTestOff',
  variant: 'normal',
};
