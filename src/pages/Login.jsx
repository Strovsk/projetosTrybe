import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Button, TextField } from '@mui/material';
import Swal from 'sweetalert2';
import Background from '../Components/Background';
import { setEmailToLocalStorage } from '../util/localStorageConfig';
import Style from '../styles/Login.module.css';
import Logo from '../images/newStock/logo.svg';
import Lumins from '../Plugin/lumins/js/lumins';
// import './css/Login';

function Login({ history }) {
  const [formInputs, setFormInputs] = useState({ email: 'test@imp.com', password: '' });
  const [isInvalidButton, setIsInvalidButton] = useState(false);

  const emailValidation = (value) => /.+?@\w+.com/i.test(value);
  const passValidation = (value, maxLen) => value.length > maxLen;

  const handleFormInputChange = ({ target: { name, value } }) => {
    setFormInputs({ ...formInputs, [name]: value });
    const maxLenPass = 6;
    const logicResult = (
      {
        email:
          !(emailValidation(value) && passValidation(formInputs.password, maxLenPass)),
        password:
          !(emailValidation(formInputs.email) && passValidation(value, maxLenPass)),
      }
    )[name];
    setIsInvalidButton(logicResult);
  };

  useEffect(() => {
    const luminsQtd = 40;
    const lu = new Lumins('luminsContainer', luminsQtd);
    const msgA = 'Este site foi feito para oferecer';
    const msgB = ' uma melhor experiência em telas pequenas!';
    const msgC = ' Que tal abrir no celular?';
    const maxScreenWidth = 1000;
    lu.renderizarLumins();
    document.title = 'Recipes App';
    if (window.innerWidth >= maxScreenWidth) {
      Swal.fire({
        title: 'Calma!',
        text: msgA + msgB + msgC,
        icon: 'warning',
        confirmButtonText: 'Ok!',
        confirmButtonColor: '#fbb03b',
      });
    }
  }, []);

  const clickLogin = () => {
    const { email } = formInputs;
    setEmailToLocalStorage(email);
    history.replace('/foods');
  };

  return (
    <div className={ Style.ContainerLayout }>
      {/* <TextField placeholder="email" /> */}
      <div className={ Style.ContainerLumins } id="luminsContainer" />
      <object
        data={ Logo }
        type="image/svg+xml"
        className={ Style.Logo }
      >
        Recipes App
      </object>

      <div className={ Style.LoginLeft }>
        <h1>Login</h1>
        <TextField
          margin="normal"
          placeholder="caesar@prov.com"
          label="Email"
          variant="standard"
          type="text"
          name="email"
          data-testid="email-input"
          onChange={ handleFormInputChange }
          size="Normal"
          inputProps={ { style: { color: 'white', fontSize: '16px' } } }
          value="test@imp.com"
        />
        <TextField
          margin="normal"
          label="Senha"
          variant="standard"
          type="password"
          name="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ handleFormInputChange }
          size="Normal"
          inputProps={ { style: { color: 'white', fontSize: '16px' } } }
          value="12345678"
        />
        <Button
          variant="contained"
          type="button"
          data-testid="login-submit-btn"
          disabled={ isInvalidButton }
          onClick={ clickLogin }
        >
          Enter
        </Button>
      </div>
      <Background />
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ replace: PropTypes.func }).isRequired,
};

export default Login;
