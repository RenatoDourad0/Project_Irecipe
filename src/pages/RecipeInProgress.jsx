import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import FavoriteButton from '../components/FavoriteButton';
import ShareButton from '../components/ShareButton';
import { getFromLS, sendToLS } from '../helpers/localStorage';
import { fetchById } from '../helpers/requests';

export default function RecipeInProgress() {
  const [recipe, setRecipe] = useState({});
  const [recipeClone, setRecipeClone] = useState({});
  const [checkBoxes, setCheckboxes] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const { push } = useHistory();

  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1];

  useEffect(() => {
    fetchById(id, pathname).then((res) => {
      setRecipeClone(res);
      setRecipe(res[type][0]);
    });
  }, [id, type, pathname]);

  useEffect(() => {
    const itemsArr = [];
    const ingredientsArr = Object.keys(recipe)
      .filter((el) => el.includes('strIngredient'));
    const qntyArr = Object.keys(recipe)
      .filter((el) => el.includes('strMeasure'));

    ingredientsArr.forEach((el, i) => {
      if (recipe[el] && recipe[qntyArr[i]]) {
        const obj = {
          ingredient: recipe[el],
          qnty: recipe[qntyArr[i]],
        };
        itemsArr.push(obj);
      }
    });

    setCheckboxes(itemsArr);
  }, [recipe]);

  useEffect(() => {
    if (getFromLS('inProgressRecipes')) {
      const currCheckedIngredients = getFromLS('inProgressRecipes')[type]?.[id] || [];
      setCheckedIngredients(currCheckedIngredients);
    } else {
      sendToLS('inProgressRecipes', { meals: {}, drinks: {} });
    }
  }, []);

  useEffect(() => {
    if (checkedIngredients.length) {
      const recipes = getFromLS('inProgressRecipes');
      // const filteredRecipes = delete inProgressRecipes[type][id];
      sendToLS('inProgressRecipes', {
        ...recipes,
        [type]: { ...recipes[type], [id]: checkedIngredients },
      });
    }
  }, [checkedIngredients, id, type]);

  function handleChange({ target: { name, checked } }) {
    if (checked) {
      setCheckedIngredients([...checkedIngredients, name]);
    }
  }

  const handleFinish = () => {
    const inProgressRec = getFromLS('inProgressRecipes');
    delete inProgressRec[type][id];
    sendToLS('inProgressRecipes', inProgressRec);
    const newDoneRecipe = {
      id,
      type: type === 'meals'
        ? 'meal' : 'drink',
      alcoholicOrNot: type === 'meals'
        ? '' : recipe.strAlcoholic,
      name: type === 'meals'
        ? recipe.strMeal : recipe.strDrink,
      image: type === 'meals'
        ? recipe.strMealThumb : recipe.strDrinkThumb,
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
    };
    const doneRecipes = getFromLS('doneRecipes') || [];
    sendToLS('doneRecipes', [...doneRecipes, newDoneRecipe]);
    push('/done-recipes');
  };

  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <ShareButton link={ global.document.location.href } testid="share-btn" />
      <FavoriteButton
        testid="favorite-btn"
        recipeDetails={ recipeClone }
        id={ id }
      />
      <p data-testid="recipe-category">
        {recipe.strCategory}
      </p>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      {checkBoxes.length > 0 && checkBoxes.map((checkbox, index) => (
        <label
          htmlFor={ checkbox.ingredient }
          key={ checkbox.ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          {`${checkbox.ingredient} ${checkbox.qnty}`}
          <input
            type="checkbox"
            name={ checkbox.ingredient }
            checked={ checkedIngredients.includes(checkbox.ingredient) }
            onChange={ handleChange }
          />
        </label>
      ))}
      <button
        type="button"
        data-testid="finish-recipe-btn"
        disabled={ checkBoxes.length !== checkedIngredients.length }
        onClick={ handleFinish }
      >
        Finish
      </button>
    </div>
  );
}
