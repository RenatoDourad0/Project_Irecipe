import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { minPassSize, rgx } from '../helpers/utilData';

export default function Login() {
  const [isDisabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    pass: '',
  });

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
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('drinksToken', JSON.stringify(1));
  }
  return (

    <form onSubmit={ handleSubmit }>
      <Header />
      <label htmlFor="email">
        Email:
        <input
          type="text"
          name="email"
          data-testid="email-input"
          value={ user.email }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="pass">
        Senha:
        <input
          type="password"
          name="pass"
          data-testid="password-input"
          value={ user.pass }
          onChange={ handleChange }
        />
      </label>
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
