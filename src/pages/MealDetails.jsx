import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';

export default function MealDetails() {
  const { searchResult, setSearchResult } = useContext(GlobalContext);
  const { push } = useHistory();

  const CARDS_MAX_LENGTH = 12;

  return (
    <div>
      {searchResult && searchResult.meals && searchResult.meals
        .filter((meal, index) => index < CARDS_MAX_LENGTH)
        .map((searchItem, index) => (
          <div
            key={ searchItem.idMeal }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ searchItem.strMealThumb }
              alt={ searchItem.strMeal }
              data-testid={ `${index}-card-img` }
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              { searchItem.strMeal }
            </h3>
            { searchResult && searchResult.meals && searchResult.meals.length === 1
          && (
            <button
              type="button"
              onClick={ () => {
                setSearchResult(null);
                push('/meals');
              } }
            >
              Voltar
            </button>
          ) }
          </div>
        ))}
    </div>
  );
}
