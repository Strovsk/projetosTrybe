import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { PropTypes } from 'prop-types';
import themeContext from './themesContext';

export default function ProviderUi({ children }) {
  return (
    <ThemeProvider theme={ themeContext }>
      { children }
    </ThemeProvider>
  );
}

ProviderUi.propTypes = {
  children: PropTypes.node.isRequired,
};
