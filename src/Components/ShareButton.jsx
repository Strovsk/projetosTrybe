import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import shareIconButton from '../images/shareIcon.svg';
import ShareIcon from '@mui/icons-material/Share';
import { Button } from '@mui/material';

export default function ShareButton({ textToCopy }) {
  const [isCopied, setIsCopied] = useState(false);

  const clickShareAction = () => {
    // NOTE a substring http:// deve ser removida
    navigator.clipboard.writeText(textToCopy);
    setIsCopied(true);
  };

  return (
    <Button
      type="button"
      onClick={ clickShareAction }
      endIcon={ <ShareIcon fontSize="large" /> }
    >
      { isCopied ? ('Link copied!') : ('Share') }
    </Button>
  );
}

ShareButton.propTypes = {
  textToCopy: PropTypes.string,
};

ShareButton.defaultProps = {
  textToCopy: 'clicked share button',
};

/*
<Button
  className="RecipeDetails-share"
  endIcon={ <ShareIcon fontSize="large" /> }
  data-testid="share-btn"
  onClick={ handleShareClick }
>
  { shareButtonMessage }
</Button>

*/
