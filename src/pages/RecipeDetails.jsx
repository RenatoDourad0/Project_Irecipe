/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { fetchById, fetchByName } from '../helpers/requests';
import RecipeDetailsInfo from '../components/RecipeDetailsInfo';
import RecomItems from '../components/RecomItems';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

export default function RecipeDetails() {
  const { setSearchResult, setRecFoods,
    doneRecipes, inProgressRecipes,
  } = useContext(GlobalContext);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const { pathname } = useLocation();
  const { push } = useHistory();

  const drinkOrMeal = pathname === `/drinks/${id}` ? 'drinks' : 'meals';

  useEffect(() => {
    async function renderFetch() {
      setRecipeDetails(await fetchById(id, pathname));
      if (pathname.includes('/drinks') === true) {
        return setRecFoods(await fetchByName('', '/meals'));
      }
      setRecFoods(await fetchByName('', '/drinks'));
    }
    renderFetch();
  }, []);

  useEffect(() => {
    const itemsArr = [];
    if (recipeDetails) {
      const ingredientsArr = Object.keys(recipeDetails[drinkOrMeal][0])
        .filter((el) => el.includes('strIngredient'));
      const qntyArr = Object.keys(recipeDetails[drinkOrMeal][0])
        .filter((el) => el.includes('strMeasure'));
      ingredientsArr.forEach((el, i) => {
        if (recipeDetails[drinkOrMeal][0][el]
          && recipeDetails[drinkOrMeal][0][qntyArr[i]]) {
          const obj = {
            ingredient: recipeDetails[drinkOrMeal][0][el],
            qnty: recipeDetails[drinkOrMeal][0][qntyArr[i]],
          };
          itemsArr.push(obj);
        }
      });
      setDetails(itemsArr);
    }
  }, [recipeDetails]);

  const navigateBack = () => {
    setSearchResult(null);
    setRecipeDetails(null);
    return pathname === `/drinks/${id}` ? push('/drinks') : push('/meals');
  };

  const goInProgress = () => {
    push(`${pathname}/in-progress`);
    // sendToLS('inProgressRecipes', { ...inProgressRecipes, [drinkOrMeal]: { [id]: [] } });
  };

  const goInProgressContinue = () => {
    push(`${pathname}/in-progress`);
  };

  const RepValidation = (array) => {
    if (pathname.includes('/meals')) {
      return !array.some((e) => {
        try {
          return e.id === recipeDetails.meals[0].idMeal;
        } catch (error) {
          return e.id === recipeDetails.meals[0].idMeal;
        }
      });
    }
    if (pathname.includes('/drinks')) {
      return !array.some((e) => {
        try {
          return e.id === recipeDetails.drinks[0].idDrink;
        } catch (error) {
          return e.id === recipeDetails.drinks[0].idDrink;
        }
      });
    }
  };

  const inProgressValidation = () => {
    if (inProgressRecipes && Object.keys(inProgressRecipes[drinkOrMeal]).length === 0) {
      return false;
    }
    if (inProgressRecipes) {
      const keys = Object.keys(inProgressRecipes[drinkOrMeal]);
      return keys.some((e) => e === id);
    }
  };

  return (
    <div className="recipe-details-container">
      { recipeDetails && pathname === `/drinks/${id}`
        && (
          <div>
            <RecipeDetailsInfo
              recipeDetails={ recipeDetails }
              details={ details }
              type="drinks"
              navigateBack={ navigateBack }
              className="card-food"
            />
            <div className="recomended-items-container">
              <h3>Recommended</h3>
              <RecomItems id="idMeal" thumb="strMealThumb" search="meals" str="strMeal" />
            </div>
          </div>
        )}
      { recipeDetails && pathname === `/meals/${id}`
      && (
        <div>
          <RecipeDetailsInfo
            recipeDetails={ recipeDetails }
            details={ details }
            type="meals"
            navigateBack={ navigateBack }
          />
          <div className="recomended-items-container">
            <h3>Recommended</h3>
            <RecomItems
              id="idDrink"
              thumb="strDrinkThumb"
              search="drinks"
              str="strDrink"
            />
          </div>
        </div>
      )}
      <ShareButton link={ global.document.location.href } testid="share-btn" />
      <FavoriteButton id={ id } recipeDetails={ recipeDetails } testid="favorite-btn" />
      { recipeDetails
      && RepValidation(doneRecipes) === true
      && inProgressValidation() === false
      && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn-start-recipe"
          onClick={ goInProgress }
        >
          Start Recipe
        </button>
      )}
      { recipeDetails && inProgressValidation() === true
      && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn-start-recipe"
          onClick={ goInProgressContinue }
        >
          Continue Recipe
        </button>
      )}
    </div>
  );
}
