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
const ordinaryDrinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const ordinaryMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const goatURLbyID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52968';
const aquamarineURL = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319';
const startRecipe = 'Start Recipe';
const goatPath = '/meals/52968';

let currHistory;

describe('Testa recipieDetails na rota meals', () => {
  beforeEach(async () => {
    fetchMock.get(mealCategoriesURL, mealCategories);
    fetchMock.get(ordinaryMealsURL, meals);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/search.php?s=goat', goatMeals);
    fetchMock.get(goatURLbyID, goatMeals);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken', mealsByIngredient);
    fetchMock.get(firstLetterURL, emptyMeals);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', drinkCategories);
    fetchMock.get(ordinaryDrinksURL, ordinaryDrinks);

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

    await waitFor(() => expect(currHistory.location.pathname).toBe(goatPath));
  });

  afterEach(() => {
    fetchMock.restore();
    jest.clearAllMocks();
  });

  test('se renderiza detalhes da receita', async () => {
    expect(screen.getByText('Mbuzi Choma (Roasted Goat)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Voltar' })).toBeInTheDocument();
    expect(screen.getByTestId('0-recommendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: startRecipe })).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
  });

  test('se clicar no botão start recipe invoca a funcao saveDoneRep', async () => {
    const button = screen.getByRole('button', { name: startRecipe });
    userEvent.click(button);
  });
});

describe('Testa recipieDetails na rota drinks', () => {
  beforeEach(async () => {
    fetchMock.get(ordinaryDrinksURL, ordinaryDrinks);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', drinkCategories);
    fetchMock.get(mealCategoriesURL, mealCategories);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=rum', drinksByIngredient);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gim', ginDrinks);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=z', emptyDrinks);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine', oneDrink);
    fetchMock.get(aquamarineURL, oneDrink);
    fetchMock.get(ordinaryMealsURL, meals);

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
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: startRecipe })).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
  });
});

describe('se o botao de start muda de acordo com o estado da receita', () => {
  const continueRecipe = 'Continue Recipe';
  const drinkURL = '/drinks/178319';
  afterEach(() => {
    fetchMock.restore();
  });
  test('se clicar no botão start recipe ', async () => {
    fetchMock.get(mealCategoriesURL, mealCategories);
    fetchMock.get(ordinaryDrinksURL, ordinaryDrinks);
    fetchMock.get(goatURLbyID, goatMeals);
    const { history } = renderWithRouter(<App />, [goatPath]);

    await waitFor(() => expect(history.location.pathname).toBe(goatPath));
    const button = screen.getByRole('button', { name: continueRecipe });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    history.push(goatPath);
    await waitFor(() => expect(history.location.pathname).toBe(goatPath));
    const button2 = screen.getByRole('button', { name: continueRecipe });
    expect(button2).toBeInTheDocument();
  });

  test('se clicar no botão start recipe ', async () => {
    fetchMock.get(mealCategoriesURL, mealCategories);
    fetchMock.get(ordinaryMealsURL, meals);
    fetchMock.get(aquamarineURL, oneDrink);
    const { history } = renderWithRouter(<App />, [drinkURL]);

    await waitFor(() => expect(history.location.pathname).toBe(drinkURL));
    const button = screen.getByRole('button', { name: 'Start Recipe' });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    history.push(drinkURL);
    await waitFor(() => expect(history.location.pathname).toBe(drinkURL));
    const button2 = screen.getByRole('button', { name: continueRecipe });
    expect(button2).toBeInTheDocument();
  });
  test('se não tem botao caso recita feita na rota drink', async () => {
    fetchMock.get(mealCategoriesURL, mealCategories);
    fetchMock.get(ordinaryMealsURL, meals);
    fetchMock.get(aquamarineURL, oneDrink);
    const { history } = renderWithRouter(<App />, [drinkURL]);
    localStorage.setItem('doneRecipes', JSON.stringify([{ id: '178319' }]));
    history.push(drinkURL);
    await waitFor(() => expect(history.location.pathname).toBe(drinkURL));
    const button = screen.queryByTestId('start-recipe-btn');
    expect(button).toBeInTheDocument();
  });

  test('se não tem botao caso recita feita na rota meal', async () => {
    fetchMock.get(mealCategoriesURL, mealCategories);
    fetchMock.get(ordinaryDrinksURL, ordinaryDrinks);
    fetchMock.get(goatURLbyID, goatMeals);
    const { history } = renderWithRouter(<App />, [goatPath]);
    localStorage.setItem('doneRecipes', JSON.stringify([{ id: '52968' }]));
    history.push(goatPath);
    await waitFor(() => expect(history.location.pathname).toBe(goatPath));
    const button = screen.queryByTestId('start-recipe-btn');
    expect(button).toBeInTheDocument();
  });
});
