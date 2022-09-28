/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { sendToLS } from '../helpers/localStorage';
// import { getFromLS } from '../helpers/localStorage';

export default function RecipeInProgress() {
  const { inProgressRecipes, doneRecipe } = useContext(GlobalContext);
  const { id } = useParams();
  const { pathname } = useLocation();
  // const { push } = useHistory();
  const drinkOrMeal = pathname === `/drinks/${id}` ? 'drinks' : 'meals';
  const imgSrc = pathname === `/drinks/${id}` ? 'strDrinkThumb' : 'strMealThumb';
  const title = pathname === `/drinks/${id}` ? 'strDrink' : 'strMeal';
  const saveDoneRecipe = () => {
    sendToLS('doneRecipe', [...doneRecipe, ...inProgressRecipes]);
    setDoneRep([...doneRecipe, ...inProgressRecipes]);
  };
  return (
    <div>
      {inProgressRecipes && (
        <div>
          <img
            src={ inProgressRecipes[0][imgSrc] }
            alt={ inProgressRecipes[0][title] }
            data-testid="recipe-photo"
          />
          <h3
            data-testid="recipe-title"
          >
            { inProgressRecipes[0][title] }
          </h3>
          { drinkOrMeal === 'drinks'
            ? (
              <h3
                data-testid="recipe-category"
              >
                { `${inProgressRecipes[0].strAlcoholic}  
            ${inProgressRecipes[0].strCategory}` }
              </h3>
            ) : (
              <h3
                data-testid="recipe-category"
              >
                { inProgressRecipes[0].strCategory }
              </h3>
            )}
          <p data-testid="instructions">
            { inProgressRecipes[0].strInstructions }
          </p>
          <button
            type="button"
            // onClick={ shareRecipe }
            data-testid="share-btn"
          >
            Compartilhar

          </button>
          <button
            type="button"
            onClick={ saveDoneRecipe }
            data-testid="finish-recipe-btn"
          >
            Finalizar

          </button>
        </div>
      )}
    </div>
  );
}
