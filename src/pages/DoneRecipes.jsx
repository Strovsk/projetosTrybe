import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ButtonGroup, Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import Header from '../Components/Header';
import { getDoneRecipes } from '../helpers/localRecipesManager';
// import shareIconButton from '../images/shareIcon.svg';
import BottomMenu from '../Components/BottomMenu';
import '../styles/DoneRecipes.css';
// import './css/DoneRecipes';

function DoneRecipes({ title }) {
  const [isCopied, setIsCopied] = useState(false);
  const [doneRecipesList, setDoneRecipesList] = useState({ original: [], filtered: [] });

  const createDetailLink = (foodType, foodId, mode = 'full') => ({
    full: `http://${window.location.host}/${foodType}s/${foodId}`,
    path: `/${foodType}s/${foodId}`,
  }[mode]);

  const clickShareAction = (foodType, foodId) => {
    // NOTE a substring http:// deve ser removida
    navigator.clipboard.writeText(createDetailLink(foodType, foodId));
    setIsCopied(true);
  };

  const filterRecipesBy = (foodType = 'food', reset = false) => {
    if (reset) {
      return setDoneRecipesList(
        { ...doneRecipesList, filtered: doneRecipesList.original },
      );
    }
    setDoneRecipesList({
      ...doneRecipesList,
      filtered: doneRecipesList.filtered.filter(({ type }) => type === foodType),
    });
  };

  useEffect(() => {
    const localStorageDoneRecipes = getDoneRecipes();
    setDoneRecipesList({
      original: localStorageDoneRecipes,
      filtered: localStorageDoneRecipes,
    });
    // console.log(localStorageDoneRecipes);
  }, []);

  return (
    <div className="DoneRecipes">
      <Header title={ title } canSearch={ false } />
      <ButtonGroup
        variant="text"
        aria-label="text button group"
        className="HomeRecipes-buttonGroup"
        size="small"
        fullWidth
      >
        <Button
          data-testid="All-category-filter"
          onClick={ () => filterRecipesBy('any', true) }
        >
          All
        </Button>
        <Button
          data-testid="All-category-filter"
          onClick={ () => filterRecipesBy('food') }
        >
          Food
        </Button>
        <Button
          data-testid="All-category-filter"
          onClick={ () => filterRecipesBy('drink') }
        >
          Drinks
        </Button>
      </ButtonGroup>
      <div className="DoneRecipes-cardsContainer">
        {/* food card */}
        {
          doneRecipesList.filtered.map((doneRecipe, index) => (
            <div key={ index } className="DoneRecipes-card">
              <Link to={ createDetailLink(doneRecipe.type, doneRecipe.id, 'path') }>
                <img
                  className="DoneRecipes-img"
                  src={ doneRecipe.image }
                  alt={ doneRecipe.name }
                  data-testid={ `${index}-horizontal-image` }
                  width="200"
                  height="200"
                />
              </Link>

              <div className="DoneRecipes-info">
                <Link to={ createDetailLink(doneRecipe.type, doneRecipe.id, 'path') }>
                  <h1
                    data-testid={ `${index}-horizontal-name` }
                  >
                    { doneRecipe.name }
                  </h1>
                </Link>

                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  { doneRecipe.type === 'food'
                    ? `${doneRecipe.nationality} - ${doneRecipe.category}`
                    : `${doneRecipe.alcoholicOrNot}` }
                </h3>

                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  { `concluído em: ${doneRecipe.doneDate}` }
                </p>
                <Button
                  endIcon={ <ShareIcon fontSize="large" /> }
                  onClick={ () => clickShareAction(doneRecipe.type, doneRecipe.id) }
                >
                  { isCopied ? 'Link copied!' : 'SHARE'}
                </Button>
                <ul>
                  {
                    doneRecipe.tags.map((tag, tagIndex) => (
                      <li
                        key={ tagIndex }
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        { tag }
                      </li>
                    ))
                  }
                </ul>
              </div>

            </div>
          ))
        }
      </div>
      <BottomMenu />
    </div>

  );
}

DoneRecipes.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default DoneRecipes;
