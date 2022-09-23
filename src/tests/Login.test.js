import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
// import renderWithRouter from './helpers/renderWithRouter';

describe('Testa tela de login', () => {
  beforeEach(() => (
    renderWithRouter(<App />)
  ));

  test('Testa se é possível digitar nos inputs', () => {
    const emailInput = screen.getByTestId('email-input');
    const passInput = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(loginBtn).toBeInTheDocument();
  });
});
