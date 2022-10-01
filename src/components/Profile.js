import React from 'react';
import { useHistory } from 'react-router-dom';

function Profile() {
  const Email = (JSON.parse(localStorage.getItem('user')))
    ? JSON.parse(localStorage.getItem('user')).email : '';
  const history = useHistory();
  const RedirectToLoginAndClearLocalStorage = () => {
    history.push('/');
    localStorage.clear();
  };
  return (
    <div>
      <h1
        data-testid="profile-email"
      >
        {Email}
      </h1>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ RedirectToLoginAndClearLocalStorage }
      >
        Logout
      </button>
    </div>
  );
}
export default Profile;
