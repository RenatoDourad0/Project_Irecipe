import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    expect(loginBtn).toHaveProperty('disabled', true);

    userEvent.type(emailInput, 'email@gmail.com');
    userEvent.type(passInput, '1234567');

    expect(loginBtn).toHaveProperty('disabled', false);
  });
});
