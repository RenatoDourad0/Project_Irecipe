/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { fetchById, fetchByName } from '../helpers/requests';
import RecipeDetailsInfo from '../components/RecipeDetailsInfo';
import RecomItems from '../components/RecomItems';
import ShareButton from '../components/ShareButton';

export default function RecipeDetails() {
  const {
    setSearchResult,
    setRecFoods,
    doneRecipes,
    inProgressRecipes,
  } = useContext(GlobalContext);
  const [recipeDetails, setRecipeDetails] = useState(null);
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  const { pathname } = useLocation();
  const { push } = useHistory();

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

  const navigateBack = () => {
    setSearchResult(null);
    setRecipeDetails(null);
    return pathname === `/drinks/${id}` ? push('/drinks') : push('/meals');
  };

  const goInProgress = () => {
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
    const drinkOrMeal = pathname === `/drinks/${id}` ? 'drinks' : 'meals';
    if (inProgressRecipes && Object.keys(inProgressRecipes[drinkOrMeal]).length === 0) {
      return false;
    }
    if (inProgressRecipes) {
      const keys = Object.keys(inProgressRecipes[drinkOrMeal]);
      return keys.some((e) => e === id);
    }
  };

  return (
    <div>
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
            <h1>Recomendado</h1>
            <RecomItems id="idMeal" thumb="strMealThumb" search="meals" str="strMeal" />
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
          <h1>Recomendado</h1>
          <RecomItems
            id="idDrink"
            thumb="strDrinkThumb"
            search="drinks"
            str="strDrink"
          />
        </div>
      )}
      <ShareButton />
      {/* <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img src={ image } alt="share-icon" />
      </button> */}
      <button
        type="button"
        data-testid="favorite-btn"
      >
        Favorita
      </button>
      {/* { linkCopied && <h1>Link copied!</h1> } */}
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
          onClick={ goInProgress }
        >
          Continue Recipe
        </button>
      )}
    </div>
  );
}
