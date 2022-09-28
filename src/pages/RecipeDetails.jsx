import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { fetchById } from '../helpers/requests';
import RecipeDetailsInfo from '../components/RecipeDetailsInfo';

export default function RecipeDetails() {
  const { setSearchResult } = useContext(GlobalContext);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [details, setDetails] = useState(null);
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
    setSearchResult(null);
    setRecipeDetails(null);
    return pathname === `/drinks/${id}` ? push('/drinks') : push('/meals');
  };

  useEffect(() => {
    const result = [];
    const drinkOrMeal = pathname === `/drinks/${id}` ? 'drinks' : 'meals';
    if (recipeDetails) {
      const quantidades = Object.keys(recipeDetails[drinkOrMeal][0])
        .filter((property) => property.match(/strMeasure*/));
      const ingredientes = Object.keys(recipeDetails[drinkOrMeal][0])
        .filter((property) => property.match(/strIngredient*/));
      quantidades.forEach((element, index) => {
        result.push(`${recipeDetails[drinkOrMeal][0][element]} 
        ${recipeDetails[drinkOrMeal][0][ingredientes[index]]}`);
      });
      setDetails(result.filter((r) => !r.includes('null')));
    }
  }, [recipeDetails, id, pathname]);

  return (
    <div>
      { recipeDetails && pathname === `/drinks/${id}`
        && (
          <RecipeDetailsInfo
            recipeDetails={ recipeDetails }
            details={ details }
            type="drinks"
            navigateBack={ navigateBack }
          />
        )}
      { recipeDetails && pathname === `/meals/${id}`
      && (
        <RecipeDetailsInfo
          recipeDetails={ recipeDetails }
          details={ details }
          type="meals"
          navigateBack={ navigateBack }
        />
      )}
    </div>
  );
}
