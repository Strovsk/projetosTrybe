import React, { useState, useContext, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import {
  IconButton,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PropTypes from 'prop-types';
import SearchIcon from '@mui/icons-material/Search';
import recipesContext from '../Context/recipesContext';
// import profileIcon from '../images/profileIcon.svg';
import * as requestApi from '../services';
import '../styles/Header.css';
// import './css/Login';

function Header({ title, canSearch }) {
  const {
    setResultsFood,
    resultsFood,
    setResultsDrink,
    resultsDrink,
  } = useContext(recipesContext);
  const [showBar, setShowBar] = useState('');
  const [inputSearch, setInputSearch] = useState({ searchBar: '', searchRadio: '' });
  const firstRender = useRef(true);

  const history = useHistory();

  const goToPage = (page) => history.push(page);

  const handleSearch = ({ target: { name, value } }) => {
    // console.log('mudou', name, value);
    setInputSearch({ ...inputSearch, [name]: value });
  };

  const redirect = () => {
    if (firstRender.current) {
      firstRender.current = !firstRender.current;
      return;
    }

    // REVIEW Refatorar 40 e 41
    if (resultsFood.length > 1 || resultsDrink.length > 1) return;
    if (resultsFood.length === 0 && resultsDrink.length === 0) return;
    const idUrl = !resultsFood[0] ? resultsDrink[0].idDrink : resultsFood[0].idMeal;
    const linkFormatted = `${title.toLowerCase()}/${idUrl}`;
    switch (title) {
    case 'Foods':
      history.push(linkFormatted);
      break;
    case 'Drinks':
      history.push(linkFormatted);
      break;
    default:
      break;
    }
  };

  useEffect(redirect, [history, resultsFood, resultsDrink, title]);

  const handleRequestApi = () => {
    const { searchBar, searchRadio } = inputSearch;
    switch (title) {
    case 'Foods':
      requestApi.searchFoodBy(searchRadio, searchBar, (foods) => {
        if (!foods) {
          return Swal.fire({
            title: 'Error!',
            text: 'Sorry, we haven\'t found any recipes for these filters. 🥲',
            icon: 'error',
            confirmButtonText: 'Ok!',
            confirmButtonColor: '#fbb03b',
          });
          // return global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
        setResultsFood(foods);
      });
      break;
    case 'Drinks':
      requestApi.searchDrinkBy(searchRadio, searchBar, (drinks) => {
        if (!drinks) {
          return Swal.fire({
            title: 'Error!',
            text: 'Sorry, we haven\'t found any recipes for these filters. 🥲',
            icon: 'error',
            confirmButtonText: 'Ok!',
            confirmButtonColor: '#fbb03b',
          });
          // return global.alert('Sorry, we haven\'t found any recipes for these filters.');
        }
        setResultsDrink(drinks);
      });
      break;

    default:
      break;
    }
  };

  const handleClickSearch = () => {
    const { searchBar, searchRadio } = inputSearch;
    console.log('pesquisando por: ', inputSearch);

    return searchBar.length > 1 && searchRadio === 'firstLetter'
      ? global.alert('Your search must have only 1 (one) character')
      : handleRequestApi();
  };

  const handleSearchToggleSearch = () => {
    if (showBar === '') {
      return setShowBar('.isActive');
    }
    setShowBar('');
  };

  return (
    <>
      <div className="Header">
        <IconButton
          data-testid="profile-top-btn"
          type="button"
          onClick={ () => goToPage('/profile') }
          alt="profile"
          color="primary"
        >
          <AccountCircleIcon fontSize="large" />
        </IconButton>
        <h1 data-testid="page-title" className="Header-title">
          { title }
        </h1>
        {canSearch && (
          <IconButton
            data-testid="search-top-btn"
            type="button"
            onClick={ handleSearchToggleSearch }
            alt="searchIcon"
            color="primary"
          >
            <SearchIcon fontSize="large" />
          </IconButton>
        )}

      </div>
      <div className={ `Header-searchBar${showBar}` }>
        <TextField
          fullWidth
          data-testid="search-input"
          type="text"
          placeholder="Search"
          name="searchBar"
          value={ inputSearch.bar }
          onChange={ handleSearch }
        />

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="firstLetter"
          onChange={ handleSearch }
          row
        >
          <FormControlLabel
            value="firstLetter"
            control={ <Radio name="searchRadio" /> }
            label="First letter"
          />

          <FormControlLabel
            value="ingredient"
            control={ <Radio name="searchRadio" /> }
            label="Ingredient"
          />

          <FormControlLabel
            value="name"
            control={ <Radio name="searchRadio" /> }
            label="Name"
          />
        </RadioGroup>

        <Button
          onClick={ handleClickSearch }
          data-testid="exec-search-btn"
          variant="contained"
        >
          Search
        </Button>
      </div>
    </>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  canSearch: PropTypes.bool,
};

Header.defaultProps = {
  title: 'Você esqueceu de colocar um Title, porfavor, coloque um',
  canSearch: true,
};

export default Header;
