import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { fetchById } from '../helpers/requests';

export default function RecipeDetails() {
  const [recipeDetails, setRecipeDetails] = useState();
  const [details, setDetails] = useState();
  const { id } = useParams();
  const { pathname } = useLocation();
  const { push } = useHistory();

  useEffect(() => {
    async function renderFetch() {
      setRecipeDetails(await fetchById(id, pathname));
    }
    renderFetch();
  }, []);

  const navigateBack = () => {
    setRecipeDetails(null);
    return pathname === `/drinks/${id}` ? push('/drinks') : push('/meals');
  };

  useEffect(() => {
    const result = [];
    const drinkOrMeal = pathname === `/drinks/${id}` ? 'drinks' : 'meals';
    if (recipeDetails) {
      const quantidades = Object.keys(recipeDetails[drinkOrMeal][0])
        .filter((property) => property
          .match(/strMeasure*/));
      const ingredientes = Object.keys(recipeDetails[drinkOrMeal][0])
        .filter((property) => property
          .match(/strIngredient*/));
      quantidades.forEach((element, index) => {
        result.push(`${recipeDetails[drinkOrMeal][0][element]} 
        ${recipeDetails[drinkOrMeal][0][ingredientes[index]]}`);
      });
      setDetails(result.filter((r) => !r.includes('null')));
    }
  }, [recipeDetails]);

  return (
    <div>
      { recipeDetails && pathname === `/drinks/${id}`
        && (
          <div>
            <img
              src={ recipeDetails.drinks[0].strDrinkThumb }
              alt={ recipeDetails.drinks[0].strDrink }
              data-testid="recipe-photo"
            />
            <h3
              data-testid="recipe-title"
            >
              { recipeDetails.drinks[0].strDrink }
            </h3>
            <h3
              data-testid="recipe-category"
            >
              { `${recipeDetails.drinks[0].strAlcoholic}  
              ${recipeDetails.drinks[0].strCategory}` }
            </h3>
            <ul>
              { details && details
                .map((info, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { info }
                  </li>
                ))}
            </ul>
            <p data-testid="instructions">
              { recipeDetails.drinks[0].strInstructions }
            </p>
            <button type="button" onClick={ navigateBack }>Voltar</button>
          </div>
        )}
      { recipeDetails && pathname === `/meals/${id}`
        && (
          <div>
            <img
              src={ recipeDetails.meals[0].strMealThumb }
              alt={ recipeDetails.meals[0].strMeal }
              data-testid="recipe-photo"
            />
            <h3
              data-testid="recipe-title"
            >
              { recipeDetails.meals[0].strMeal }
            </h3>
            <h3
              data-testid="recipe-category"
            >
              { recipeDetails.meals[0].strCategory }
            </h3>
            <p data-testid="instructions">
              { recipeDetails.meals[0].strInstructions }
            </p>
            <ul>
              { details && details
                .map((information, index) => (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { information }
                  </li>
                ))}
            </ul>
            <iframe
              src={ recipeDetails.meals[0].strYoutube }
              title={ recipeDetails.meals[0].strMeal }
              width="420"
              height="315"
              data-testid="video"
            />
            <button type="button" onClick={ navigateBack }>Voltar</button>
          </div>
        )}
    </div>
  );
}
