import React from 'react';
import { PropTypes } from 'prop-types';

export default function RecipeDetailsInfo(props) {
  const { recipeDetails, details, type: typeProp, navigateBack } = props;

  const imgSrcProp = typeProp === 'drinks' ? 'strDrinkThumb' : 'strMealThumb';
  const titleProp = typeProp === 'drinks' ? 'strDrink' : 'strMeal';

  return (
    <div>
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
          <h3
            data-testid="recipe-category"
          >
            { `${recipeDetails.drinks[0].strAlcoholic}  
            ${recipeDetails.drinks[0].strCategory}` }
          </h3>
        ) : (
          <h3
            data-testid="recipe-category"
          >
            { recipeDetails.meals[0].strCategory }
          </h3>
        )}
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
        { recipeDetails[typeProp][0].strInstructions }
      </p>
      <button type="button" onClick={ navigateBack }>Voltar</button>
    </div>
  );
}

RecipeDetailsInfo.propTypes = {
  recipeDetails: PropTypes.array,
  details: PropTypes.array,
  type: PropTypes.string,
  navigateBack: PropTypes.func,
}.isRequired;
