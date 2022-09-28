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
import breakfastMeals from '../../cypress/mocks/breakfastMeals';
import App from '../App';

const searchInput = 'search-input';
const submitBtn = 'exec-search-btn';
const firstLetterSearchRadio = 'first-letter-search-radio';
const nameSearchRadio = 'name-search-radio';
const ingredientSearchRadio = 'ingredient-search-radio';
const firstLetterURL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=z';
const mealCategoriesURL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

let currHistory;

describe('Testa searchBar', () => {
  beforeEach(() => {
    fetchMock.get(mealCategoriesURL, mealCategories);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/search.php?s=', meals);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/search.php?s=goat', goatMeals);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52968', goatMeals);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken', mealsByIngredient);
    fetchMock.get(firstLetterURL, emptyMeals);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list', drinkCategories);
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', ordinaryDrinks);
    fetchMock.get('https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast', breakfastMeals);

    const { history } = renderWithRouter(<App />);
    currHistory = history;

    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    userEvent.click(screen.getByTestId('search-top-btn'));

    expect(fetchMock.called()).toBeTruthy();

    expect(currHistory.location.pathname).toBe('/meals');
  });

  afterEach(() => {
    fetchMock.restore();
    jest.clearAllMocks();
  });

  test('Testa se faz requisicao por ingrediente na pagina /meals ', async () => {
    const searchBar = screen.getByTestId(searchInput);
    const ingredientsRadio = screen.getByTestId(ingredientSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'Chicken');
    userEvent.click(ingredientsRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();

    // const firstCard = await waitFor(() => screen.getByTestId('0-recipe-card'));
    // expect(firstCard).toBeInTheDocument();
  });

  test('Testa se faz requisicao por nome na pagina /meals ', () => {
    const searchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'goat');
    userEvent.click(nameRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
  });

  test('Testa se faz requisicao por primeira letra na pagina /meals ', () => {
    const searchBar = screen.getByTestId(searchInput);
    const letterRadio = screen.getByTestId(firstLetterSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'z');
    userEvent.click(letterRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
  });

  test('Testa se mostra alert quando digitar mais de uma letra no filtro serachByLeteer ', () => {
    global.alert = jest.fn();

    const searchBar = screen.getByTestId(searchInput);
    const letterRadio = screen.getByTestId(firstLetterSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'za');
    userEvent.click(letterRadio);

    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
    expect(global.alert).toHaveBeenCalled();
  });

  test('Testa se mostra alert quando não retornar nenhuma receita', async () => {
    global.alert = jest.fn();

    const searchBar = screen.getByTestId(searchInput);
    const letterRadio = screen.getByTestId(firstLetterSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'z');
    userEvent.click(letterRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
    expect(fetchMock.lastUrl()).toBe(firstLetterURL);
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
    expect(fetchMock.called()).toBeTruthy();
  });

  test('Testa se muda de rota quando retorna somente uma receita', async () => {
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
    // await waitFor(() => expect(currHistory.location.pathname).toBe('/meals'));
  });

  test('Testa se mostra alert quando não selecionar um filtro', async () => {
    global.alert = jest.fn();

    const searchBar = screen.getByTestId(searchInput);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'z');
    userEvent.click(submitButton);

    await waitFor(() => expect(global.alert).toHaveBeenCalled());
  });

  test('os filtros de categorias', async () => {
    const categoryButton = screen.getByTestId('Breakfast-category-filter');

    userEvent.click(categoryButton);

    await waitFor(() => expect(screen.getByTestId('0-card-img')).toBeInTheDocument());
    expect(screen.getByText('Breakfast Potatoes')).toBeInTheDocument();

    userEvent.click(categoryButton);

    await waitFor(() => expect(screen.getByTestId('0-card-img')).toBeInTheDocument());
    expect(screen.getByText('Corba')).toBeInTheDocument();
  });
});

describe('teste da rota /drinks', () => {
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
    fetchMock.get('https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=OrdinaryDrink', ordinaryDrinks);

    const { history } = renderWithRouter(<App />);
    currHistory = history;

    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));

    expect(fetchMock.called()).toBeTruthy();
    await waitFor(() => { expect(history.location.pathname).toBe('/drinks'); });
    userEvent.click(screen.getByTestId('search-top-btn'));
  });

  afterEach(() => {
    fetchMock.restore();
    jest.clearAllMocks();
  });

  test('Testa se faz requisicao por ingrediente na pagina /drinks ', () => {
    const searchBar = screen.getByTestId(searchInput);
    const ingredientsRadio = screen.getByTestId(ingredientSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'rum');
    userEvent.click(ingredientsRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
  });

  test('Testa se faz requisicao por nome na pagina /drinks ', () => {
    const searchBar = screen.getByTestId(searchInput);
    const nameRadio = screen.getByTestId(nameSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    userEvent.type(searchBar, 'gim');
    userEvent.click(nameRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
  });

  test('Testa se faz requisicao por primeira letra na pagina /drinks ', () => {
    const searchBar = screen.getByTestId(searchInput);
    const letterRadio = screen.getByTestId(firstLetterSearchRadio);
    const submitButton = screen.getByTestId(submitBtn);

    expect(screen.getByTestId(nameSearchRadio)).toBeInTheDocument();

    userEvent.type(searchBar, 'z');
    userEvent.click(letterRadio);
    userEvent.click(submitButton);

    expect(fetchMock.called()).toBeTruthy();
  });

  test('Testa se muda de rota quando retorna somente uma receita', async () => {
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
    // await waitFor(() => expect(currHistory.location.pathname).toBe('/drinks'));
  });
  test('os filtros de categorias', async () => {
    await waitFor(() => expect(screen.getByTestId('0-card-img')).toBeInTheDocument());
    const categoryButton = screen.getByTestId('Ordinary Drink-category-filter');

    userEvent.click(categoryButton);

    await waitFor(() => expect(screen.getByTestId('0-card-img')).toBeInTheDocument());
    expect(screen.getByText('3-Mile Long Island Iced Tea')).toBeInTheDocument();

    userEvent.click(categoryButton);

    await waitFor(() => expect(screen.getByTestId('0-card-img')).toBeInTheDocument());
    expect(screen.getByText('GG')).toBeInTheDocument();

    userEvent.click(categoryButton);

    const Allbutton = screen.getByTestId('All-category-filter');
    userEvent.click(Allbutton);

    await waitFor(() => expect(screen.getByTestId('0-card-img')).toBeInTheDocument());
    expect(screen.getByText('GG')).toBeInTheDocument();
  });
});
