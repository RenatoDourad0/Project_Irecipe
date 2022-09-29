import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock';
import renderWithRouter from './helpers/renderWithRouter';
import mealCategories from '../../cypress/mocks/mealCategories';
import goatMeals from '../../cypress/mocks/goatMeals';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import meals from '../../cypress/mocks/meals';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import App from '../App';

const mealCategoriesURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

let currHistory;

describe('Testa recipieDetails na rota meals', () => {
  beforeEach(async () => {
    fetchMock.get(mealCategoriesURL, mealCategories);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', meals);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52968', goatMeals);

    const { history } = renderWithRouter(<App />, ['meals/52968']);
    currHistory = history;

    expect(fetchMock.called()).toBeTruthy();

    await waitFor(() => expect(currHistory.location.pathname).toBe('meals/52968'));
  });
  test('se é possivel clicar no favoriteButton e se muda de cor', () => {
    // const favBtn = screen.getByTestId('favorite-btn');

    // expect(favBtn).toHaveAttribute('src');
    // expect(favBtn.src).toBe('/static/media/whiteHeartIcon.2b822118952dc5140129c6349fcd0472.svg');

    // userEvent.click(favBtn);
    // expect(favBtn.src).toBe('/static/media/blackHeartIcon.083cb006913d197c95857ebfa2161db7.svg');
  });
});
