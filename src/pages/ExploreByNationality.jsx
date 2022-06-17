import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BottomMenu from '../Components/BottomMenu';
import Header from '../Components/Header';
import getNationalities from '../services/searchByNationalities';
import { searchFoodBy } from '../services';
import ItemCard from '../Components/ItemCard';
// import './css/ExploreByNationality';

function ExploreByNationality({ title }) {
  const [nationalities, setNationalities] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [country, setCountry] = useState('All');

  const handleChange = ({ target }) => {
    setCountry(target.value);
  };

  const getNationalitiesFromApi = async () => {
    const nacionalidade = await getNationalities();
    console.log(nacionalidade);
    setNationalities(nacionalidade.meals);
  };

  useEffect(() => {
    getNationalitiesFromApi();
  }, []);

  useEffect(() => {
    if (country === 'All') {
      searchFoodBy('random', country, setRecipes);
    } else {
      searchFoodBy('nationality', country, setRecipes);
    }
  }, [country]);

  return (
    <div>
      <Header title={ title } />
      <label htmlFor="nationality">
        <select
          name="nationality"
          id="nationality"
          data-testid="explore-by-nationality-dropdown"
          onChange={ handleChange }
        >
          <option value="All" data-testid="All-option">All</option>
          {nationalities.map((nacionalidade) => (
            <option
              key={ nacionalidade.strArea }
              value={ (nacionalidade.strArea) }
              data-testid={ `${nacionalidade.strArea}-option` }
            >
              {nacionalidade.strArea}
            </option>
          ))}
        </select>
      </label>
      {recipes.map((element, index) => (
        <Link to={ `/foods/${element.idMeal}` } key={ element.idMeal }>
          <ItemCard
            recipeInfo={ element }
            typeCard="foods"
            index={ index }
            testid={ `${index}-recipe-card` }
            titleTestId={ `${index}-card-name` }
          />
        </Link>
      ))}
      <BottomMenu />
    </div>
  );
}

ExploreByNationality.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default ExploreByNationality;
