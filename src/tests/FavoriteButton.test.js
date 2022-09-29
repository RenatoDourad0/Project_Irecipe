import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock';
import renderWithRouter from './helpers/renderWithRouter';
import mealCategories from '../../cypress/mocks/mealCategories';
import goatMeals from '../../cypress/mocks/goatMeals';
import meals from '../../cypress/mocks/meals';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import App from '../App';

const mealCategoriesURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

describe('Testa recipieDetails', () => {
  beforeEach(async () => {
  });
  afterEach(() => {
    fetchMock.restore();
    jest.clearAllMocks();
  });
  test('se é possivel clicar no favoriteButton e se muda de cor na rota meals', async () => {
    fetchMock.get(mealCategoriesURL, mealCategories);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', meals);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52968', goatMeals);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', ordinaryDrinks);

    const { history } = renderWithRouter(<App />, ['/meals/52968']);

    expect(fetchMock.called()).toBeTruthy();

    await waitFor(() => expect(history.location.pathname).toBe('/meals/52968'));

    const favBtn = screen.getByTestId('favorite-btn');

    expect(favBtn).toHaveAttribute('src');
    console.log(favBtn.child);
    expect(favBtn.child.memoizedProps.src).toBe('whiteHeartIcon.svg');
    userEvent.click(favBtn);
    expect(favBtn.child.memoizedProps.src).toBe('blackHeartIcon.svg');
  });

  test('se é possivel clicar no favoriteButton e se muda de cor na rota drinks', async () => {
    fetchMock.get(mealCategoriesURL, mealCategories);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', meals);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319', oneDrink);

    const { history } = renderWithRouter(<App />, ['/drinks/178319']);

    expect(fetchMock.called()).toBeTruthy();

    await waitFor(() => expect(history.location.pathname).toBe('/drinks/178319'));

    // await waitFor(() => {
    //   const favBtn = screen.getByTestId('favorite-btn');
    //   expect(favBtn).toHaveAttribute('src');
    //   expect(favBtn.src).toBe('/static/media/whiteHeartIcon.2b822118952dc5140129c6349fcd0472.svg');
    //   userEvent.click(favBtn);
    //   expect(favBtn.src).toBe('/static/media/blackHeartIcon.083cb006913d197c95857ebfa2161db7.svg');
    // });
  });
});
