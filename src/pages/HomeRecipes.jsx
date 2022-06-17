import React, { useContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
import BottomMenu from '../Components/BottomMenu';
import Header from '../Components/Header';
import recipesContext from '../Context/recipesContext';
import ItemCard from '../Components/ItemCard';
import * as requestApi from '../services';
import '../styles/HomeRecipes.css';

// import './css/HomeRecipes';

function HomeRecipes({ title }) {
  const cutInfo = -1;
  const formattedKey = `results${title.slice(0, cutInfo)}`;
  const linkId = title === 'Foods' ? 'idMeal' : 'idDrink';
  const { [formattedKey]: recipesList,
    setResultsFood, setResultsDrink } = useContext(recipesContext);
  const [category, setCategory] = useState([]);
  const [isFiltred, setIsFiltred] = useState(false);
  const [filterArgumment, setFilterArgumment] = useState('');
  const [filteredByCategory, setFilteredByCategory] = useState([]);
  // document.getElementsByClassName('Header-searchBar')[0].classList.add('isActive');

  useEffect(() => {
    const maxButtomQtd = 5;
    switch (title) {
    case 'Foods':
      requestApi.searchFoodBy('random', '', (foods) => {
        setResultsFood(foods);
      });
      requestApi.searchFoodBy('getButtomCategories', '', (foods) => {
        const [a, b, c, d, e] = foods;
        setCategory([a, b, c, d, e]);
      });
      break;
    case 'Drinks':
      requestApi.searchDrinkBy('random', '', (drinks) => {
        setResultsDrink(drinks);
      });
      requestApi.searchDrinkBy('getButtomCategories', '', (drinks) => {
        drinks = drinks.slice(0, maxButtomQtd);
        setCategory(drinks);
      });
      break;
    default:
      break;
    }
  }, [title, setResultsDrink, setResultsFood]);

  const handleFilter = ({ target: { value } }) => {
    if (filterArgumment === value) {
      setIsFiltred(false);
      setFilterArgumment('');
    } else {
      setIsFiltred(true);
      setFilterArgumment(value);
    }
    switch (title) {
    case 'Foods':
      requestApi.searchFoodBy('category', value, (foods) => {
        setFilteredByCategory(foods);
      });
      break;
    case 'Drinks':
      requestApi.searchDrinkBy('category', value, (drinks) => {
        setFilteredByCategory(drinks);
      });
      break;
    default:
      break;
    }
  };

  const noFilters = () => {
    setIsFiltred(false);
    setFilterArgumment('');
  };

  return (
    <div className="HomeRecipes">
      <div>
        <Header title={ title } />
        <ButtonGroup
          variant="text"
          aria-label="text button group"
          className="HomeRecipes-buttonGroup"
          size="small"
          fullWidth
        >
          {category.map((item, index) => (
            <Button
              data-testid={ `${item.strCategory}-category-filter` }
              key={ index }
              value={ item.strCategory }
              onClick={ (e) => handleFilter(e) }
            >
              {item.strCategory}
            </Button>
          ))}
          <Button
            data-testid="All-category-filter"
            onClick={ noFilters }
          >
            All
          </Button>
        </ButtonGroup>
        <ul className="HomeRecipes-foodsList">
          {
            isFiltred && filteredByCategory.length > 0 && (
              filteredByCategory.map(
                (filtred, index) => (
                  <Link to={ `/${title.toLowerCase()}/${filtred[linkId]}` } key={ index }>
                    <ItemCard
                      recipeInfo={ filtred }
                      typeCard={ title }
                      key={ index }
                      index={ index }
                      testid={ `${index}-recipe-card` }
                      titleTestId={ `${index}-card-name` }
                    />
                  </Link>
                ),
              )
            )
          }
          {
            recipesList.length > 0 && !isFiltred
              && recipesList.map(
                (recipe, index) => (
                  <Link to={ `/${title.toLowerCase()}/${recipe[linkId]}` } key={ index }>
                    <ItemCard
                      recipeInfo={ recipe }
                      typeCard={ title }
                      key={ index }
                      index={ index }
                      testid={ `${index}-recipe-card` }
                      titleTestId={ `${index}-card-name` }
                    />
                  </Link>
                ),
              )
          }
        </ul>
      </div>

      <BottomMenu />
    </div>
  );
}

HomeRecipes.propTypes = {
  title: PropTypes.string,
};

HomeRecipes.defaultProps = {
  title: 'Você esqueceu de colocar um Title, porfavor, coloque um',
};

export default HomeRecipes;
