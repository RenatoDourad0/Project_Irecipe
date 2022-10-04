import React from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/profile.css';

function Profile() {
  const Email = (JSON.parse(localStorage.getItem('user')))
    ? JSON.parse(localStorage.getItem('user')).email : '';
  const history = useHistory();
  const RedirectToLoginAndClearLocalStorage = () => {
    history.push('/');
    localStorage.clear();
  };
  return (
    <div className="profile-container">
      <p
        data-testid="profile-email"
        className="profile-email"
      >
        {`Olá ${Email}`}
      </p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
        className="profile-button"
      >
        Done Recipes
      </button>

      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
        className="profile-button"
      >
        Favorite Recipes
      </button>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ RedirectToLoginAndClearLocalStorage }
        className="profile-button"
      >
        Logout
      </button>

    </div>
  );
}
export default Profile;
