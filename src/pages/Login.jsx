import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { minPassSize, rgx } from '../helpers/utilData';
import { sendToLS } from '../helpers/localStorage';
import logo from '../styles/images-style/logo.png';
import '../styles/login.css';

export default function Login() {
  const [isDisabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    pass: '',
  });
  const history = useHistory();

  useEffect(() => (setDisabled(!(rgx.test(user.email) && user.pass.length >= minPassSize))
  ), [user]);

  function handleChange({ target: { name, value } }) {
    setUser({
      ...user,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    sendToLS('user', { email: user.email });
    sendToLS('mealsToken', 1);
    sendToLS('drinksToken', 1);
    history.push('/meals');
  }
  return (

    <form onSubmit={ handleSubmit } className="login-form">
      {/* <div className="logo-div">
        <h1>irecipe</h1>
      </div> */}
      <img src={ logo } alt="logo-element" />
      <input
        type="text"
        name="email"
        data-testid="email-input"
        className="email-icon"
        placeholder="Email"
        value={ user.email }
        onChange={ handleChange }
      />
      <input
        type="password"
        name="pass"
        data-testid="password-input"
        className="login-icon"
        placeholder="Password"
        value={ user.pass }
        onChange={ handleChange }
      />
      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ isDisabled }
      >
        Enter

      </button>
    </form>
  );
}
