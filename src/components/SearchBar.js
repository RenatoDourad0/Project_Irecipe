import React, { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchByIngredient, fetchByName, fetchByLetter } from '../helpers/requests';
import { GlobalContext } from '../context/GlobalProvider';

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
    <form onSubmit={ (e) => handleSubmit(e) }>
      <label htmlFor="searchBarInput">
        <input
          type="text"
          name=""
          id="searchBarInput"
          value={ textToSearch }
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setTextToSearch(value) }
        />
      </label>
      <label htmlFor="ingredientsRadio">
        <input
          type="radio"
          id="ingredientsRadio"
          name="searchRadio"
          onClick={ () => setFilterToApply('ingredientsRadio') }
          data-testid="ingredient-search-radio"
        />
        Buscar por ingrediente
      </label>
      <label htmlFor="nameRadio">
        <input
          type="radio"
          id="nameRadio"
          name="searchRadio"
          onClick={ () => setFilterToApply('nameRadio') }
          data-testid="name-search-radio"
        />
        Buscar por nome
      </label>
      <label htmlFor="firstLetterRadio">
        <input
          type="radio"
          id="firstLetterRadio"
          name="searchRadio"
          onClick={ () => setFilterToApply('firstLetterRadio') }
          data-testid="first-letter-search-radio"
        />
        Buscar por primeira letra
      </label>
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Pesquisar
      </button>
    </form>
  );
}
