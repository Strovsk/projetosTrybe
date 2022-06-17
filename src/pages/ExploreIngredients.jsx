import React from 'react';
import PropTypes from 'prop-types';
import BottomMenu from '../Components/BottomMenu';
import Header from '../Components/Header';
// import './css/ExploreIngredients';

function ExploreIngredients({ title }) {
  return (
    <div>
      <Header title={ title } canSearch={ false } />
      <h1>
        ExploreIngredients
      </h1>
      <BottomMenu />
    </div>
  );
}

ExploreIngredients.propTypes = {
  title: PropTypes.string,
  canSearch: PropTypes.bool,
}.isRequired;

export default ExploreIngredients;
