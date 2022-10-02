import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';

export default function Recipes(props) {
  const { searchResult } = useContext(GlobalContext);
  const CARDS_MAX_LENGTH = 12;
  const { id, image, str, search } = props;

  return (
    <div>
      {searchResult && searchResult[search] && searchResult[search]
        .filter((food, index) => index < CARDS_MAX_LENGTH)
        .map((searchItem, index) => (
          <Link
            to={ `/${search}/${searchItem[id]}` }
            key={ searchItem[id] }
          >
            <div
              data-testid={ `${index}-recipe-card` }
              className="card-food-details"
            >
              <img
                src={ searchItem[image] }
                alt={ searchItem[str] }
                data-testid={ `${index}-card-img` }
              />
              <div className="title-des-rep">
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  { searchItem[str] }
                </h3>
                <p className="recipe-details">
                  Ingredients:
                  {' '}
                  { searchItem.strIngredient1 }
                  {' '}
                  { searchItem.strIngredient2 }
                  {' '}
                  { searchItem.strIngredient3 }
                  {' '}
                  { searchItem.strIngredient4 }
                  {' '}
                  { searchItem.strIngredient5 }
                  {' '}
                  { searchItem.strIngredient6 }
                  {' '}
                  { searchItem.strIngredient7 }
                  {' '}
                  { searchItem.strIngredient8 }
                  {' '}
                </p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

Recipes.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};
