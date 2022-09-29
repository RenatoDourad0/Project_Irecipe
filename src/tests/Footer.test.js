import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { testEmail } from '../helpers/utilData';
import renderWithRouter from './helpers/renderWithRouter';

let currHistory;
const mealIcon = 'meals page';
const drinkIcon = 'drinks page';

describe('Testa o componente Footer', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    currHistory = history;

    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
  });
  it('verifica se os icones existem na página "/meals"', () => {
    expect(screen.getByAltText(mealIcon)).toBeInTheDocument();
    expect(screen.getByAltText(drinkIcon)).toBeInTheDocument();
    expect(currHistory.location.pathname).toBe('/meals');
  });
  it('verifica se os icones existem na página "/drinks"', () => {
    userEvent.click(screen.getByAltText(drinkIcon));
    expect(currHistory.location.pathname).toBe('/drinks');
    expect(screen.getByAltText(drinkIcon)).toBeInTheDocument();
    expect(screen.getByAltText(mealIcon)).toBeInTheDocument();
  });
  it('verifica se os icones redirecionam para a página correta', () => {
    userEvent.click(screen.getByAltText(drinkIcon));
    expect(currHistory.location.pathname).toBe('/drinks');
    expect(screen.getByAltText(drinkIcon)).toBeInTheDocument();
    expect(screen.getByAltText(mealIcon)).toBeInTheDocument();
    userEvent.click(screen.getByAltText(mealIcon));
    expect(currHistory.location.pathname).toBe('/meals');
  });
});
