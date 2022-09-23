import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getFromLS } from '../helpers/localStorage';
import { testEmail } from '../helpers/utilData';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa tela de login', () => {
  test('Testa se é possível digitar nos inputs', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
    expect(loginBtn).toHaveProperty('disabled', true);

    userEvent.type(emailInput, testEmail);
    userEvent.type(passInput, '1234567');

    expect(loginBtn).toHaveProperty('disabled', false);
  });

  test('Testa se redireciona para /meals', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    userEvent.type(emailInput, testEmail);
    userEvent.type(passInput, '1234567');
    userEvent.click(loginBtn);

    const localStorageUser = getFromLS('user');

    expect(history.location.pathname).toBe('/meals');
    expect(localStorageUser.email).toBe(testEmail);
  });
});
