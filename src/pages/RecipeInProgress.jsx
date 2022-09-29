import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import ShareButton from '../components/ShareButton';
import { GlobalContext } from '../context/GlobalProvider';
import { getFromLS, sendToLS } from '../helpers/localStorage';

export default function RecipeInProgress() {
  const { inProgressRecipes } = useContext(GlobalContext);
  const [recipe, setRecipe] = useState({});
  const [checkBoxes, setCheckboxes] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);

  // console.log(inProgressRecipes);

  const { pathname } = useLocation();
  const id = pathname.split('/')[2];
  const type = pathname.split('/')[1];

  useEffect(() => {
    const fetchById = async () => {
      const URL = pathname.includes('/meals')
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = fetch(URL)
        .then((res) => res.json())
        .then((json) => json[type][0]);

      if (pathname.includes('meals')) setRecipe(await data);
      else setRecipe(await data);
    };
    fetchById();
  }, [id, pathname, type]);

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
      const currCheckedIngredients = getFromLS('inProgressRecipes')[type]
        .find((el) => el.id === id)?.checkedIngredients || [];
      setCheckedIngredients(currCheckedIngredients);
    }
  }, []);

  useEffect(() => {
    const filteredRecipes = inProgressRecipes[type].filter((el) => el.id !== id);
    if (filteredRecipes) {
      sendToLS('inProgressRecipes', {
        ...inProgressRecipes,
        [type]: [...filteredRecipes, { id, checkedIngredients: [] }],
      });
    }
  }, []);

  useEffect(() => {
    if (checkedIngredients.length) {
      const filteredRecipes = inProgressRecipes[type].filter((el) => el.id !== id);
      sendToLS('inProgressRecipes', {
        ...inProgressRecipes,
        [type]: [...filteredRecipes, { id, checkedIngredients }],
      });
    }
  }, [checkedIngredients]);

  function handleChange({ target: { name, checked } }) {
    if (checked) {
      setCheckedIngredients([...checkedIngredients, name]);
    }
  }

  const URLFilter = () => {
    const URL = global.document.location.href;
    if (URL.includes('/in-progress')) {
      const filteredURL = URL.split('/in-progress');
      filteredURL.pop();
      return filteredURL[0];
    } return link;
  };

  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        alt={ recipe.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      <ShareButton link={ URLFilter() } testid="share-btn" />
      <button type="button" data-testid="favorite-btn">Fav</button>
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
      >
        Finish

      </button>
    </div>
  );
}
