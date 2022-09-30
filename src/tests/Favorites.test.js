import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { testEmail } from '../helpers/utilData';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import meals from '../../cypress/mocks/meals';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    favoriteDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    favoriteDate: '23/06/2020',
    tags: [],
  },
];

let currHistory;
const link = '/favorite-recipes';
describe('testa a pagina de receitas feitas', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(meals),
    });
    document.execCommand = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(),
    });
    const { history } = renderWithRouter(<App />);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    currHistory = history;
    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
  });

  test('testa se os elementos foram carregados com o testid certo', async () => {
    currHistory.push(link);
    await waitFor(() => {});
    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();

    expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-Curry-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('0-Pasta-horizontal-tag')).toBeInTheDocument();
  });
  test('testa se ao clicar no botão, copia o link para o usuário', async () => {
    currHistory.push(link);
    await waitFor(() => {});
    const btnLink = screen.getByTestId('0-horizontal-share-btn');
    userEvent.click(btnLink);
    await waitFor(() => {});
    expect(document.execCommand).toHaveBeenCalledWith('copy');
  });
  test('testa se os filtros funcionam', async () => {
    currHistory.push(link);
    await waitFor(() => {});
    const semFiltro = screen.getByTestId('filter-by-all-btn');
    const filtroPorComida = screen.getByTestId('filter-by-meal-btn');
    const filtroPorBebida = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(filtroPorBebida);
    expect(screen.queryByText('Spicy Arrabiata Penne')).not.toBeInTheDocument();
    userEvent.click(filtroPorComida);
    expect(screen.queryByText('Aquamarine')).not.toBeInTheDocument();
    userEvent.click(semFiltro);
    expect(screen.queryByText('Aquamarine')).toBeInTheDocument();
    expect(screen.queryByText('Spicy Arrabiata Penne')).toBeInTheDocument();
  });
});
