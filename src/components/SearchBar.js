import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchByIngredient, fetchByName, fetchByLetter } from '../helpers/requests';
import { GlobalContext } from '../context/GlobalProvider';
import '../styles/searchBar.css';

export default function SearchBar() {
  const { setSearchResult, setFromBtnFilter } = useContext(GlobalContext);
  const { pathname: pagePath } = useLocation();

  const [textToSearch, setTextToSearch] = useState('');
  const [filterToApply, setFilterToApply] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFromBtnFilter(false);
    switch (filterToApply) {
    case 'ingredientsRadio':
      setSearchResult(await fetchByIngredient(textToSearch, pagePath));
      break;
    case 'nameRadio':
      setSearchResult(await fetchByName(textToSearch, pagePath));
      break;
    case 'firstLetterRadio':
      if (textToSearch.length !== 1) {
        global.alert('Your search must have only 1 (one) character');
        break;
      }
      setSearchResult(await fetchByLetter(textToSearch, pagePath));
      break;
    default:
      global.alert('selecione um filtro');
      break;
    }
  };

  return (
    <form onSubmit={ (e) => handleSubmit(e) } className="search-bar-form">
      <div className="search-bar-container">
        <div className="search-bar-text">
          <input
            type="text"
            name=""
            id="searchBarInput"
            value={ textToSearch }
            data-testid="search-input"
            onChange={ ({ target: { value } }) => setTextToSearch(value) }
            className="search-bar-input"
            placeholder="Pesquisar..."
          />
        </div>
        <div className="search-bar-inputs-container">
          <label htmlFor="ingredientsRadio" className="search-bar-ingredientes-radio">
            <input
              type="radio"
              id="ingredientsRadio"
              name="searchRadio"
              onClick={ () => setFilterToApply('ingredientsRadio') }
              data-testid="ingredient-search-radio"
              className="search-bar-radio search-bar-ingredientes-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="nameRadio" className="search-bar-name-radio">
            <input
              type="radio"
              id="nameRadio"
              name="searchRadio"
              onClick={ () => setFilterToApply('nameRadio') }
              data-testid="name-search-radio"
              className="search-bar-radio search-bar-name-radio"
            />
            Nome
          </label>
          <label htmlFor="firstLetterRadio" className="search-bar-first-letter-radio">
            <input
              type="radio"
              id="firstLetterRadio"
              name="searchRadio"
              onClick={ () => setFilterToApply('firstLetterRadio') }
              data-testid="first-letter-search-radio"
              className="search-bar-radio search-bar-first-letter-radio"
            />
            Primeira letra
          </label>
        </div>
        <button
          type="submit"
          data-testid="exec-search-btn"
          className="search-bar-button"
        >
          Pesquisar
        </button>
      </div>
    </form>
  );
}
