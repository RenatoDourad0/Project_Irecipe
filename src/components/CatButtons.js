import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../context/GlobalProvider';

export default function CatButtons(props) {
  const CATEGORIES_MAX_LENGTH = 5;
  const { categories } = useContext(GlobalContext);
  const { search } = props;
  return (
    <div>
      {categories && categories[search] && categories[search]
        .filter((food, index) => index < CATEGORIES_MAX_LENGTH)
        .map((searchItem, index) => (
          <button
            key={ `${searchItem.strCategory}${index}` }
            data-testid={ `${searchItem.strCategory}-category-filter` }
            type="button"
          >
            { searchItem.strCategory }
          </button>
        ))}
    </div>
  );
}

CatButtons.propTypes = {
  search: PropTypes.string.isRequired,
};
