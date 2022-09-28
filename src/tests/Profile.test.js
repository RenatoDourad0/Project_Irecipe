import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import meals from '../../cypress/mocks/meals';
import { testEmail } from '../helpers/utilData';

let currHistory;
describe('Testes da tela de perfil', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(meals),
    });
    const { history } = renderWithRouter(<App />);
    currHistory = history;
    userEvent.type(screen.getByTestId('email-input'), testEmail);
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    const profileIcon = screen.getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
  });

  it('Testa se Email do usuario é renderizado', () => {
    const getUserEmail = screen.getByTestId('profile-email');
    expect(getUserEmail).toBeInTheDocument();
    expect(localStorage.getItem('user'));
  });
  it('Testa se o botão DoneRecipes foi renderizado e redireciona para o caminho correto', () => {
    const buttonDoneRecipes = screen.getByTestId('profile-done-btn');
    expect(buttonDoneRecipes).toBeInTheDocument();
    userEvent.click(buttonDoneRecipes);
    expect(currHistory.location.pathname).toBe('/done-recipes');
  });
  it('Testa se o botão FavoriteRecipes foi renderizado e redireciona para o caminho correto', () => {
    const buttonFavoriteRecipes = screen.getByTestId('profile-favorite-btn');
    expect(buttonFavoriteRecipes).toBeInTheDocument();
    userEvent.click(buttonFavoriteRecipes);
    expect(currHistory.location.pathname).toBe('/favorite-recipes');
  });
  it('Testa se o botão LogOut foi renderizado e redireciona para o caminho correto ', () => {
    const buttonLogOut = screen.getByTestId('profile-logout-btn');
    expect(buttonLogOut).toBeInTheDocument();
    userEvent.click(buttonLogOut);
    expect(currHistory.location.pathname).toBe('/');
    expect(localStorage.getItem(null));
  });
});
