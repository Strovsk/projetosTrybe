import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import FavoriteIcon from '@mui/icons-material/Favorite';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import {
  saveFavorite,
  deleteFavoriteBy,
  isFavoriteRecipe,
} from '../helpers/localRecipesManager';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteButton({ toFavoriteObject }) {
  const [
    favoriteIconStatus,
    setFavoriteIconStatus,
  ] = useState({ icon: whiteHeartIcon, isFavorite: false });

  const handleFavoriteRecipeClick = () => {
    const favoriteAction = !favoriteIconStatus.isFavorite;
    const newStateIcon = favoriteIconStatus.isFavorite
      ? { icon: whiteHeartIcon, isFavorite: false }
      : { icon: blackHeartIcon, isFavorite: true };
    setFavoriteIconStatus(newStateIcon);
    if (favoriteAction) {
      saveFavorite(toFavoriteObject);
    } else { deleteFavoriteBy('id', toFavoriteObject.id); }
  };

  useEffect(() => {
    if (isFavoriteRecipe(toFavoriteObject.id)) {
      setFavoriteIconStatus({ icon: blackHeartIcon, isFavorite: true });
    }
  }, [toFavoriteObject]);

  return (
    <FavoriteIcon
      onClick={ handleFavoriteRecipeClick }
      fontSize="large"
      style={ {
        fill: favoriteIconStatus.isFavorite ? 'red' : 'white',
        stroke: favoriteIconStatus.isFavorite ? 'transparent' : 'black',
        transition: '.3s ease all',
      } }
    />
  );
}

FavoriteButton.propTypes = {
  toFavoriteObject: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};
