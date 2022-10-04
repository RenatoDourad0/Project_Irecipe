import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { GlobalContext } from '../context/GlobalProvider';
import { sendToLS } from '../helpers/localStorage';
import whiteImage from '../images/whiteHeartIcon.svg';
import blackImage from '../images/blackHeartIcon.svg';

export default function FavoriteButton(props) {
  const { pathname } = useLocation();
  const { id, recipeDetails, testid } = props;
  const { favoriteRecipes, setFavoriteRecipes } = useContext(GlobalContext);
  const isFavorite = favoriteRecipes
    ? favoriteRecipes.some((recipe) => recipe.id === id) : false;

  const handleFavorite = () => {
    if (isFavorite && favoriteRecipes !== null) {
      return setFavoriteRecipes(favoriteRecipes.filter((recipe) => recipe.id !== id));
    }
    if (favoriteRecipes !== null) {
      const recipe = recipeDetails[pathname.includes('meals') ? 'meals' : 'drinks'][0];
      const data = {
        id,
        type: pathname.includes('meals')
          ? 'meal' : 'drink',
        alcoholicOrNot: pathname.includes('meals')
          ? '' : recipe.strAlcoholic,
        name: pathname.includes('meals')
          ? recipe.strMeal : recipe.strDrink,
        image: pathname.includes('meals')
          ? recipe.strMealThumb : recipe.strDrinkThumb,
        nationality: recipe.strArea || '',
        category: recipe.strCategory || '',
      };
      return setFavoriteRecipes([...favoriteRecipes, data]);
    }
  };

  useEffect(() => {
    if (favoriteRecipes !== null) {
      sendToLS('favoriteRecipes', favoriteRecipes);
    }
    return () => {
      sendToLS('favoriteRecipes', favoriteRecipes);
    };
  }, [favoriteRecipes]);

  const defineButtonClassName = pathname.includes('favorite-recipes')
    ? 'favorite-recipes-fav-btn' : 'favorite-btn';

  return (
    <button
      type="button"
      data-testid={ testid }
      onClick={ handleFavorite }
      src={ isFavorite ? blackImage : whiteImage }
      className={ defineButtonClassName }
    >
      <img src={ isFavorite ? blackImage : whiteImage } alt="share-icon" />
    </button>
  );
}

FavoriteButton.propTypes = {
  id: PropTypes.string,
}.isRequired;
