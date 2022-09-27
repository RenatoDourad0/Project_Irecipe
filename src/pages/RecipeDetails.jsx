import React, { useContext, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { fetchById } from '../helpers/requests';

export default function RecipeDetails() {
  const { searchResult, setSearchResult } = useContext(GlobalContext);
  const { id } = useParams();
  const { pathname: pagePath } = useLocation();
  console.log(pagePath)

  useEffect(() => {
    const renderFetch = async () => setSearchResult(await fetchById(id, pagePath));
  }, []);

  return (
    <div>
      { pagePath === `/drinks/${id}`
        && (
          <div>
            <img
              src={ searchResult.drinks[0].strDrinkThumb }
              alt={ searchResult.drinks[0].strDrink }
              data-testid="recipe-photo"
            />
            <h3
              data-testid="recipe-title"
            >
              { searchResult.drinks[0].strDrink }
            </h3>
            <h3
              data-testid="recipe-category"
            >
              { searchResult.drinks[0].strCategory }
            </h3>
            <p data-testid="instructions">
              { searchResult.drinks[0].strInstructions }
            </p>
          </div>
        )}
      { pagePath === `/meals/${id}`
        && (
          <div>
            <img
              src={ searchResult.meals[0].strMealThumb }
              alt={ searchResult.meals[0].strMeal }
              data-testid="recipe-photo"
            />
            <h3
              data-testid="recipe-title"
            >
              { searchResult.meals[0].strMeal }
            </h3>
            <h3
              data-testid="recipe-category"
            >
              { searchResult.meals[0].strCategory }
            </h3>
            <p data-testid="instructions">
              { searchResult.meals[0].strInstructions }
            </p>
            <iframe
              src={ searchResult.meals[0].strYoutube }
              title={ searchResult.meals[0].strMeal }
            />
          </div>
        )}
    </div>
  );
}
