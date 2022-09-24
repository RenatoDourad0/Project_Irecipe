import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { testEmail } from '../helpers/utilData';
import renderWithRouter from './helpers/renderWithRouter';

let currHistory;

describe('Testa componente Header', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    currHistory = history;

    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
  });
  test('Testa se o ícone de profile renderiza para `/profile`', () => {
    expect(currHistory.location.pathname).toBe('/meals');

    const profileIconBtn = screen.getByTestId('profile-top-btn');

    expect(profileIconBtn).toBeInTheDocument();

    userEvent.click(profileIconBtn);

    expect(currHistory.location.pathname).toBe('/profile');
  });
});
