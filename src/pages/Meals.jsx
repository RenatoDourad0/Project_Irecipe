import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealDetails from './MealDetails';
import { GlobalContext } from '../context/GlobalProvider';
import { fetchByName, fetchCategories } from '../helpers/requests';
import CatButtons from '../components/CatButtons';

export default function Meals() {
  const { push } = useHistory();
  const CARDS_MAX_LENGTH = 12;
  const { searchResult, setSearchResult, setCategories } = useContext(GlobalContext);
  const fetchMealsOrDrinks = async () => {
    setSearchResult(await fetchByName('', '/meals'));
  };
  const fetchCatMeals = async () => {
    setCategories(await fetchCategories('/meals'));
  };

  useEffect(() => {
    fetchMealsOrDrinks();
    fetchCatMeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <CatButtons search="meals" />
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
