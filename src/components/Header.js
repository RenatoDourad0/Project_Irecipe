import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const [showInputSearch, setShowInputSearch] = useState(false);
  const [toSearch, setToSearch] = useState('');

  const { pathname } = useLocation();

  const history = useHistory();

  return (
    <div>
      <input
        type="image"
        src={ profileIcon }
        alt="profile"
        data-testid="profile-top-btn"
        onClick={ () => history.push('/profile') }
      />
      { pathname === '/profile'
      || pathname === '/done-recipes'
      || pathname === '/favorite-recipes' ? null
        : (
          <input
            type="image"
            src={ searchIcon }
            alt="search"
            data-testid="search-top-btn"
            onClick={ () => setShowInputSearch(!showInputSearch) }
          />
        )}
      {showInputSearch && (
        <input
          type="text"
          name=""
          value={ toSearch }
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setToSearch(value) }
        />
      )}

      <h2 data-testid="page-title">
        { pathname === '/meals' && 'Meals'}
        { pathname === '/drinks' && 'Drinks'}
        { pathname === '/profile' && 'Profile'}
        { pathname === '/done-recipes' && 'Done Recipes' }
        { pathname === '/favorite-recipes' && 'Favorite Recipes' }
      </h2>
    </div>
  );
}
