import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testEmail } from '../helpers/utilData';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

let currHistory;

describe('testa o componente Recipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(meals),
    });
    const { history } = renderWithRouter(<App />);
    currHistory = history;

    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
  });

  test('Testa se é possível digitar nos inputs', async () => {
    const cardRecipe = screen.getByTestId('0-recipe-card');
    expect(cardRecipe).toBeInTheDocument();

    userEvent.click(cardRecipe);

    expect(currHistory.location.pathname).toBe('/meals/52977');

    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });

    const startRecipeBtn = screen.getByTestId('start-recipe-btn');
    expect(startRecipeBtn).toBeInTheDocument();

    userEvent.click(startRecipeBtn);

    expect(currHistory.location.pathname).toBe('/meals/52977/in-progress');
  });
});
