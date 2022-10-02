import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const [showInputSearch, setShowInputSearch] = useState(false);

  const { pathname } = useLocation();

  const history = useHistory();

  return (
    <header>
      <div className="logo-div header">
        <input
          type="image"
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
          onClick={ () => history.push('/profile') }
        />
        <div className="logo-div">
          <h1>irecipe</h1>
        </div>
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
      </div>
      {showInputSearch && <SearchBar /> }
      <h2 data-testid="page-title">
        { pathname === '/meals' && 'Meals'}
        { pathname === '/drinks' && 'Drinks'}
        { pathname === '/profile' && 'Profile'}
        { pathname === '/done-recipes' && 'Done Recipes' }
        { pathname === '/favorite-recipes' && 'Favorite Recipes' }
      </h2>
    </header>
  );
}
