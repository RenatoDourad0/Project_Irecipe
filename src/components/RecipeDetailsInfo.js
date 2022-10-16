import React from 'react';
import { PropTypes } from 'prop-types';
import image from '../images/back-svgrepo-com.svg';

export default function RecipeDetailsInfo(props) {
  const { recipeDetails, details, type: typeProp, navigateBack } = props;

  const imgSrcProp = typeProp === 'drinks' ? 'strDrinkThumb' : 'strMealThumb';
  const titleProp = typeProp === 'drinks' ? 'strDrink' : 'strMeal';

  return (
    <div className="recipe-details-page">
      <div className="recipe-details-header-container">
        <img
          src={ recipeDetails[typeProp][0][imgSrcProp] }
          alt={ recipeDetails[typeProp][0][titleProp] }
          data-testid="recipe-photo"
        />
        <h3
          data-testid="recipe-title"
        >
          { recipeDetails[typeProp][0][titleProp] }
        </h3>
        { typeProp === 'drinks'
          ? (
            <h3>
              {recipeDetails.drinks[0].strCategory}
            </h3>
          ) : (
            <h3
              data-testid="recipe-category"
            >
              { recipeDetails.meals[0].strCategory }
            </h3>
          )}
      </div>
      <h3>Ingredients</h3>
      <ul className="recipe-details-list-container">
        { details && details
          .map((info, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { `${info.ingredient} ${info.qnty}` }
            </li>
          ))}
      </ul>
      <h3>Instructions</h3>
      <p data-testid="instructions" className="recipe-details-text">
        { recipeDetails[typeProp][0].strInstructions }
      </p>
      { typeProp === 'meals'
      && (
        <div className="video-container">
          <video
            width="320"
            height="240"
            controls
            data-testid="video"
          >
            <source
              src={ `${recipeDetails.meals[0].strYoutube}&origin=https://renatodourad0.github.io/` }
              type="video/mp4"
            />
            <track kind="captions" />
          </video>
        </div>
      )}
      <button
        className="recipe-details-voltar-btn"
        type="button"
        onClick={ navigateBack }
      >
        <img src={ image } alt="back icon" />
      </button>
    </div>
  );
}

RecipeDetailsInfo.propTypes = {
  recipeDetails: PropTypes.array,
  details: PropTypes.array,
  type: PropTypes.string,
  navigateBack: PropTypes.func,
}.isRequired;
