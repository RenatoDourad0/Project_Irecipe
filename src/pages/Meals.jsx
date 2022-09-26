import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
// import MealDetails from './MealDetails';
import { GlobalContext } from '../context/GlobalProvider';

export default function Meals() {
  const { searchResult, setSearchResult } = useContext(GlobalContext);
  const { push } = useHistory();
  const CARDS_MAX_LENGTH = 12;

  return (
    <div>
      <Header />
      { searchResult && searchResult.meals && Object.values(searchResult)[0].length > 1
        && (
          <div>
            { searchResult.meals
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
        ) }
      <Footer />
    </div>
  );
}
