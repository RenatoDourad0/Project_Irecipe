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
import App from '../App';

let currHistory;

const searchInput = 'search-input';
const submitBtn = 'exec-search-btn';
const firstLetterSearchRadio = 'first-letter-search-radio';
const nameSearchRadio = 'name-search-radio';
const ingredientSearchRadio = 'ingredient-search-radio';
const firstLetterURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=z';

describe('Testa searchBar', () => {
  beforeEach(() => {
    fetchMock.getOnce('https://www.themealdb.com/api/json/v1/1/list.php?c=list', mealCategories);
    const { history } = renderWithRouter(<App />);
    currHistory = history;

    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    userEvent.click(screen.getByTestId('search-top-btn'));

    expect(fetchMock.called()).toBeTruthy();
    expect(currHistory.location.pathname).toBe('/meals');
    fetchMock.restore();
  });

  afterEach(() => {
    fetchMock.restore();
    jest.clearAllMocks();
  });

  test('Testa se faz requisicao por ingrediente na pagina /meals ', async () => {
    fetchMock.getOnce('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken', mealsByIngredient);

    const searchBar = screen.getByTestId(searchInput);
    const ingredientsRadio = screen.getByTestId(ingredientSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'Chicken');
    userEvent.click(ingredientsRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();

    const firstCard = await screen.findByTestId('0-recipe-card');

    expect(firstCard).toBeInTheDocument();
  });

  test('Testa se faz requisicao por nome na pagina /meals ', () => {
    fetchMock.getOnce('https://www.themealdb.com/api/json/v1/1/search.php?s=goat', goatMeals);

    const searchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'goat');
    userEvent.click(nameRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
  });

  test('Testa se faz requisicao por primeira letra na pagina /meals ', () => {
    fetchMock.getOnce(firstLetterURL, emptyMeals);

    const searchBar = screen.getByTestId(searchInput);
    const letterRadio = screen.getByTestId(firstLetterSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'z');
    userEvent.click(letterRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
  });

  test('Testa se mostra alert quando digitar mais de uma letra no filtro serachByLeteer ', () => {
    fetchMock.getOnce('https://www.themealdb.com/api/json/v1/1/search.php?f=z', emptyMeals);
    global.alert = jest.fn();

    const searchBar = screen.getByTestId(searchInput);
    const letterRadio = screen.getByTestId(firstLetterSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'za');
    userEvent.click(letterRadio);

    userEvent.click(submitButton);

    expect(fetchMock.called()).not.toBeTruthy();
    expect(global.alert).toHaveBeenCalled();
  });

  test('Testa se mostra alert quando não retornar nenhuma receita', async () => {
    fetchMock.getOnce(firstLetterURL, emptyMeals);
    global.alert = jest.fn();

    const searchBar = screen.getByTestId(searchInput);
    const letterRadio = screen.getByTestId(firstLetterSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'z');
    userEvent.click(letterRadio);

    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });

  test('Testa se muda de rota quando retorna somente uma receita', async () => {
    fetchMock.getOnce('https://www.themealdb.com/api/json/v1/1/search.php?s=goat', goatMeals);

    const searchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'goat');
    userEvent.click(nameRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
    await waitFor(() => expect(currHistory.location.pathname).toBe('/meals/52968'));

    const returnButton = screen.getByRole('button', { name: 'Voltar' });
    userEvent.click(returnButton);
    await waitFor(() => expect(currHistory.location.pathname).toBe('/meals'));
  });

  test('Testa se mostra alert quando não selecionar um filtro', async () => {
    global.alert = jest.fn();

    const searchBar = screen.getByTestId(searchInput);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'z');
    userEvent.click(submitButton);

    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });
});

describe('teste da rota /drinks', () => {
  beforeEach(() => {
    fetchMock.getOnce('https://www.themealdb.com/api/json/v1/1/list.php?c=list', mealCategories);
    const { history } = renderWithRouter(<App />, ['/drinks']);
    currHistory = history;

    expect(fetchMock.called()).toBeTruthy();
    expect(history.location.pathname).toBe('/drinks');
    fetchMock.restore();

    userEvent.click(screen.getByTestId('search-top-btn'));
  });

  afterEach(() => {
    fetchMock.restore();
    jest.clearAllMocks();
  });

  test('Testa se faz requisicao por ingrediente na pagina /drinks ', () => {
    fetchMock.getOnce('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=rum', drinksByIngredient);

    const searchBar = screen.getByTestId(searchInput);
    const ingredientsRadio = screen.getByTestId(ingredientSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'rum');
    userEvent.click(ingredientsRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
  });

  test('Testa se faz requisicao por nome na pagina /drinks ', () => {
    fetchMock.getOnce('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gim', ginDrinks);

    const searchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'gim');
    userEvent.click(nameRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
  });

  test('Testa se faz requisicao por primeira letra na pagina /drinks ', () => {
    fetchMock.getOnce('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=z', emptyDrinks);

    const searchBar = screen.getByTestId(searchInput);
    const letterRadio = screen.getByTestId(firstLetterSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'z');
    userEvent.click(letterRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
  });

  test('Testa se muda de rota quando retorna somente uma receita', async () => {
    fetchMock.getOnce('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine', oneDrink);

    const searchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'Aquamarine');
    userEvent.click(nameRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
    await waitFor(() => expect(currHistory.location.pathname).toBe('/drinks/178319'));

    const returnButton = screen.getByRole('button', { name: 'Voltar' });
    userEvent.click(returnButton);
    await waitFor(() => expect(currHistory.location.pathname).toBe('/drinks'));
  });
});
