import React from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from '@mui/material';
import BottomMenu from '../Components/BottomMenu';
import Header from '../Components/Header';
// import './css/Profile';

function Profile({ title, history }) {
  const user = localStorage.getItem('user');
  const userObject = JSON.parse(user);
  const handleClick = (event) => {
    const { id } = event.target;
    history.push(`/${id}`);
  };
  // document.getElementsByClassName('Header-searchBar')[0].classList.remove('isActive');
  const handleClickLogin = (event) => {
    localStorage.clear();
    const { id } = event.target;
    history.push(`/${id}`);
  };

  return (
    <div>
      <Header title={ title } canSearch={ false } />
      <h2 data-testid="profile-email">
        { userObject && `User email: ${userObject.email}` }
      </h2>
      <ButtonGroup
        variant="text"
        aria-label="text button group"
        className="HomeRecipes-buttonGroup"
        size="small"
      >
        <Button
          id="done-recipes"
          data-testid="profile-done-btn"
          onClick={ handleClick }
        >
          Done Recipes
        </Button>
        <Button
          id="favorite-recipes"
          data-testid="profile-favorite-btn"
          onClick={ handleClick }
        >
          Favorite Recipes
        </Button>
        <Button
          data-testid="profile-logout-btn"
          onClick={ handleClickLogin }
        >
          Logout
        </Button>
      </ButtonGroup>

      <BottomMenu />
    </div>
  );
}

Profile.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Profile;
