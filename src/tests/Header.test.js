import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { routes, testEmail } from '../helpers/utilData';
import renderWithRouter from './helpers/renderWithRouter';

let currHistory;

describe('Testa componente Header', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    currHistory = history;

    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
  });

  test('Testa título do componente Header em todas as páginas que ele é renderizado', () => {
    routes.forEach((item) => {
      currHistory.push(item.route);
      const { location: { pathname } } = currHistory;

      if (routes.some(({ route }) => route === pathname)) {
        const headerTitle = routes.find(({ route }) => route === pathname).title;

        expect(screen.getByTestId('page-title').innerHTML).toBe(headerTitle);
      }
    });
  });

  test('Testa se o ícone de profile redirecionada para `/profile`', () => {
    expect(currHistory.location.pathname).toBe('/meals');

    const profileIcon = screen.getByTestId('profile-top-btn');

    expect(profileIcon).toBeInTheDocument();

    userEvent.click(profileIcon);

    expect(currHistory.location.pathname).toBe('/profile');
  });

  test('Testa se ícone de busca realiza toggle do input de busca', () => {
    const searchIcon = screen.getByTestId('search-top-btn');

    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');

    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchIcon);

    expect(searchInput).not.toBeInTheDocument();
  });

  test('Testa se é possível digitar no input de busca', () => {
    const searchIcon = screen.getByTestId('search-top-btn');

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'testando input');

    expect(searchInput.value).toBe('testando input');
  });
});
