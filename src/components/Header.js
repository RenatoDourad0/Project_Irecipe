import React from 'react';
import { useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header() {
  const { pathname } = useLocation();
  return (
    <div>
      <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />

      { pathname === '/profile'
      || pathname === '/done-recipes'
      || pathname === '/favorite-recipes' ? null
        : <img src={ searchIcon } alt="search" data-testid="search-top-btn" />}

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
