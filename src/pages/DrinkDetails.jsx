import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';

export default function DrinkDetails() {
  const { searchResult, setSearchResult } = useContext(GlobalContext);
  const { push } = useHistory();

  const CARDS_MAX_LENGTH = 12;
  return (
    <div>
      {searchResult && searchResult.drinks && searchResult.drinks
        .filter((drink, index) => index < CARDS_MAX_LENGTH)
        .map((searchItem, index) => (
          <div
            key={ searchItem.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ searchItem.strDrinkThumb }
              alt={ searchItem.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              { searchItem.strDrink }
            </h3>
          </div>
        ))}
      { searchResult && searchResult.drinks && searchResult.drinks.length === 1
          && (
            <button
              type="button"
              onClick={ () => {
                setSearchResult(null);
                push('/drinks');
              } }
            >
              Voltar
            </button>
          ) }
    </div>
  );
}
