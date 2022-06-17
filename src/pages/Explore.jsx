import React from 'react';
import { PropTypes } from 'prop-types';
import BottomMenu from '../Components/BottomMenu';
import Header from '../Components/Header';
// import './css/Explore';

function Explore({ history }) {
  const handleClick = (event) => {
    const { id } = event.target;
    history.push(`/explore/${id}`);
  };

  return (
    <div>
      <Header title="Explore" canSearch={ false } />
      <button
        id="foods"
        type="submit"
        data-testid="explore-foods"
        onClick={ handleClick }
      >
        Explore Foods
      </button>
      <button
        id="drinks"
        type="submit"
        data-testid="explore-drinks"
        onClick={ handleClick }
      >
        Explore Drinks
      </button>
      <BottomMenu />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Explore;
