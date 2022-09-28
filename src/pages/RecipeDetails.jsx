/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { fetchById, fetchByName } from '../helpers/requests';
import RecipeDetailsInfo from '../components/RecipeDetailsInfo';
import RecomItems from '../components/RecomItems';

export default function RecipeDetails() {
  const { setSearchResult, setRecFoods,
    doneRecipes, setDoneRep } = useContext(GlobalContext);
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
  }, [recipeDetails, id, pathname]);
  const saveDoneRep = () => {
    if (pathname.includes('/meals')) {
      return setDoneRep([...doneRecipes, ...recipeDetails.meals]);
    }
    return setDoneRep([...doneRecipes, ...recipeDetails.drinks]);
  };
  const RepValidation = () => {
    if (pathname.includes('/meals')) {
      return !doneRecipes.some((e) => {
        try {
          return e.idMeal === recipeDetails.meals[0].idMeal;
        } catch (error) {
          return e.idDrink === recipeDetails.meals[0].idMeal;
        }
      });
    }
    if (pathname.includes('/drinks')) {
      return !doneRecipes.some((e) => {
        try {
          return e.idMeal === recipeDetails.drinks[0].idDrink;
        } catch (error) {
          return e.idDrink === recipeDetails.drinks[0].idDrink;
        }
      });
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
      { recipeDetails && RepValidation() === true && (
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn-start-recipe"
          onClick={ saveDoneRep }
        >
          Start Recipe
        </button>)}
    </div>
  );
}
