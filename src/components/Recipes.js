import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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
          <div
            key={ searchItem[id] }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ searchItem[image] }
              alt={ searchItem[str] }
              data-testid={ `${index}-card-img` }
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              { searchItem[str] }
            </h3>
          </div>
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
