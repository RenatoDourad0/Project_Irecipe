import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testEmail } from '../helpers/utilData';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

describe('testa o componente Recipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(meals),
    });
    renderWithRouter(<App />);
    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
  });

  test('Testa se é possível digitar nos inputs', async () => {
    await waitFor(() => {});
    const cardRecipe = screen.getByTestId('1-recipe-card');
    expect(cardRecipe).toBeInTheDocument();
  });
});
