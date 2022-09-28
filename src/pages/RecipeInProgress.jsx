/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { getFromLS } from '../helpers/localStorage';

export default function RecipeInProgress() {
  const { searchResult, setSearchResult } = useContext(GlobalContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  // const { push } = useHistory();
  useEffect(() => {
    setSearchResult(getFromLS('inProgressRecipes').filter((rep) => {
      try {
        return rep.idMeal === id;
      } catch (error) {
        return rep.idDrink === id;
      }
    }));
  }, []);
  const drinkOrMeal = pathname === `/drinks/${id}` ? 'drinks' : 'meals';
  const imgSrc = pathname === `/drinks/${id}` ? 'strDrinkThumb' : 'strMealThumb';
  const title = pathname === `/drinks/${id}` ? 'strDrink' : 'strMeal';
  return (
    <div>
      {searchResult !== null && (
        <div>
          <img
            src={ searchResult[drinkOrMeal][0][imgSrc] }
            alt={ searchResult[drinkOrMeal][0][title] }
            data-testid="recipe-photo"
          />
          <h3
            data-testid="recipe-title"
          >
            { searchResult[drinkOrMeal][0][title] }
          </h3>
          { drinkOrMeal === 'drinks'
            ? (
              <h3
                data-testid="recipe-category"
              >
                { `${searchResult.drinks[0].strAlcoholic}  
            ${searchResult.drinks[0].strCategory}` }
              </h3>
            ) : (
              <h3
                data-testid="recipe-category"
              >
                { searchResult.meals[0].strCategory }
              </h3>
            )}
          <p data-testid="instructions">
            { searchResult[drinkOrMeal][0].strInstructions }
          </p>
          <button
            type="button"
            onClick={ shareRecipe }
            data-testid="share-btn"
          >
            Finalizar

          </button>
          <button
            type="button"
            onClick={ DoneRecipe }
            data-testid="finish-recipe-btn"
          >
            Finalizar

          </button>
        </div>
      )}
    </div>
  );
}
