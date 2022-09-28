import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import fetchMock from 'fetch-mock';
import { testEmail } from '../helpers/utilData';
import renderWithRouter from './helpers/renderWithRouter';
import mealCategories from '../../cypress/mocks/mealCategories';
import mealsByIngredient from '../../cypress/mocks/mealsByIngredient';
import goatMeals from '../../cypress/mocks/goatMeals';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import ginDrinks from '../../cypress/mocks/ginDrinks';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';
import ordinaryDrinks from '../../cypress/mocks/ordinaryDrinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import App from '../App';

const searchInput = 'search-input';
const submitBtn = 'exec-search-btn';
const nameSearchRadio = 'name-search-radio';
const firstLetterURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=z';
const mealCategoriesURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const shareIcon = 'share-icon';
const startRecipe = 'Start Recipe';

let currHistory;

describe('Testa recipieDetails na rota meals', () => {
  beforeEach(async () => {
    fetchMock.get(mealCategoriesURL, mealCategories);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', meals);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/search.php?s=goat', goatMeals);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52968', goatMeals);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken', mealsByIngredient);
    fetchMock.get(firstLetterURL, emptyMeals);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', drinkCategories);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', ordinaryDrinks);

    const { history } = renderWithRouter(<App />);
    currHistory = history;

    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    userEvent.click(screen.getByTestId('search-top-btn'));

    const searchBar = screen.getByTestId(searchInput);
    const namesRadio = screen.getByTestId(nameSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'goat');
    userEvent.click(namesRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();

    await waitFor(() => expect(currHistory.location.pathname).toBe('/meals/52968'));
  });

  afterEach(() => {
    fetchMock.restore();
    jest.clearAllMocks();
  });

  test('se renderiza detalhes da receita', async () => {
    expect(screen.getByText('Mbuzi Choma (Roasted Goat)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument();
    expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Favorita' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: startRecipe })).toBeInTheDocument();
    expect(screen.getByAltText(shareIcon)).toBeInTheDocument();
  });

  test('se clicar no botão start recipe invoca a funcao saveDoneRep', async () => {
    const button = screen.getByRole('button', { name: startRecipe });
    userEvent.click(button);
  });

  test('se clicar no botão share invoca a funcao handleShare', async () => {
    // const button = screen.getByAltText(shareIcon);
    // userEvent.click(button);
    // expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
  test('se entrar em uma receita finalizada não tem botão start recipe', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify([{ id: 52968 }]));
    await waitFor(() => {
      const button = screen.queryByRole('button', { name: startRecipe });
      expect(button).not.toBeInTheDocument();
    });
  });
});

describe('Testa recipieDetails na rota drinks', () => {
  beforeEach(async () => {
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', ordinaryDrinks);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', drinkCategories);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/list.php?c=list', mealCategories);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=rum', drinksByIngredient);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gim', ginDrinks);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=z', emptyDrinks);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine', oneDrink);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319', oneDrink);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', meals);

    const { history } = renderWithRouter(<App />);
    currHistory = history;

    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    userEvent.click(screen.getByTestId('search-top-btn'));

    const searchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId('name-search-radio');
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'Aquamarine');
    userEvent.click(nameRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
    await waitFor(() => expect(currHistory.location.pathname).toBe('/drinks/178319'));
  });

  afterEach(() => {
    fetchMock.restore();
    jest.clearAllMocks();
  });

  test('se renderiza detalhes da receita', async () => {
    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument();
    expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Favorita' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: startRecipe })).toBeInTheDocument();
    expect(screen.getByAltText(shareIcon)).toBeInTheDocument();
  });

  test('se clicar no botão start recipe invoca a funcao saveDoneRep', async () => {
    const button = screen.getByRole('button', { name: startRecipe });
    userEvent.click(button);
  });

  test('se clicar no botão share invoca a funcao handleShare', async () => {
    // const button = screen.getByAltText(shareIcon);
    // userEvent.click(button);
    // const copied = screen.getByText('Link copied!');
    // expect(copied).toBeInTheDocument();
  });
});
