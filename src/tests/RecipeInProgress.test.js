import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testEmail } from '../helpers/utilData';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';
import { getFromLS, sendToLS } from '../helpers/localStorage';

let currHistory;
const startRecipeBtnTestId = 'start-recipe-btn';
const cardRecipeTestId = '0-recipe-card';
describe('testa o componente Recipes', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(meals),
    });
    document.execCommand = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(),
    });
    const { history } = renderWithRouter(<App />);
    currHistory = history;
    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
  });
  test('Testa redirecionamento para rota dinâmica de `.../:id/inprogress`', async () => {
    const cardRecipe = screen.getByTestId(cardRecipeTestId);
    expect(cardRecipe).toBeInTheDocument();
    userEvent.click(cardRecipe);
    expect(currHistory.location.pathname).toBe('/meals/52977');
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    const startRecipeBtn = screen.getByTestId(startRecipeBtnTestId);
    expect(startRecipeBtn).toBeInTheDocument();
    userEvent.click(startRecipeBtn);
    expect(currHistory.location.pathname).toBe('/meals/52977/in-progress');
  });
  test('Testa se é possível compartilhar link da receita e favoritá-la', async () => {
    const cardRecipe = screen.getByTestId(cardRecipeTestId);
    expect(cardRecipe).toBeInTheDocument();
    userEvent.click(cardRecipe);
    expect(currHistory.location.pathname).toBe('/meals/52977');
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    const startRecipeBtn = screen.getByTestId(startRecipeBtnTestId);
    userEvent.click(startRecipeBtn);
    expect(currHistory.location.pathname).toBe('/meals/52977/in-progress');
    const shareBtn = screen.getByTestId('share-btn');
    expect(shareBtn).toBeInTheDocument();
    const favBtn = screen.getByTestId('favorite-btn');
    expect(favBtn).toBeInTheDocument();
    const finishBtn = screen.getByTestId('finish-recipe-btn');
    expect(finishBtn).toBeInTheDocument();
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    expect(finishBtn).toBeDisabled();
    const checkboxes = screen.getAllByRole('checkbox');
    await waitFor(() => {
      expect(checkboxes.length).toEqual(13);
    });
    expect(Object.values(getFromLS('inProgressRecipes').meals).length).toEqual(0);
    checkboxes.forEach((el) => {
      userEvent.click(el);
      expect(el).toBeChecked();
    });
    expect(checkboxes[checkboxes.length - 1]).toBeChecked();
    expect(getFromLS('inProgressRecipes').meals['52977'].length).toEqual(13);
    expect(finishBtn).toBeEnabled();
    userEvent.click(shareBtn);
    userEvent.click(finishBtn);
    expect(currHistory.location.pathname).toBe('/done-recipes');
  });
  test('', async () => {
    sendToLS('inProgressRecipes', {
      meals: {
        52977: ['Lentils'],
      },
      drinks: {},
    });
    const cardRecipe = screen.getByTestId(cardRecipeTestId);
    userEvent.click(cardRecipe);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    const startRecipeBtn = screen.getByTestId(startRecipeBtnTestId);
    userEvent.click(startRecipeBtn);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    const checkboxes = screen.getAllByRole('checkbox');
    userEvent.click(checkboxes[0]);
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
    await waitFor(() => expect(checkboxes[0]).toBeChecked());
    expect(getFromLS('inProgressRecipes').meals['52977'][0]).toBe('Lentils');
  });
  test('', () => {});
});
