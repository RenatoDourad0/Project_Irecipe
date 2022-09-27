import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { GlobalContext } from '../context/GlobalProvider';
import { fetchByCategoryName, fetchByName } from '../helpers/requests';

export default function CatButtons(props) {
  const CATEGORIES_MAX_LENGTH = 5;
  const { categories, setSearchResult } = useContext(GlobalContext);
  const { search } = props;
  const history = useHistory();
  const { pathname } = history.location;
  const [hasRepeatClick, setRepeat] = useState(false);

  const handleClick = async ({ target: { id } }) => {
    if (!hasRepeatClick) {
      const newSearchResult = await fetchByCategoryName(pathname, id);
      setSearchResult(newSearchResult);
    } else {
      setSearchResult(await fetchByName('', pathname));
    }
    setRepeat(!hasRepeatClick);
  };

  const resetFilters = async () => {
    setSearchResult(await fetchByName('', pathname));
  };

  return (
    <div>
      {categories && categories[search] && categories[search]
        .filter((food, index) => index < CATEGORIES_MAX_LENGTH)
        .map((searchItem, index) => (
          <button
            key={ `${searchItem.strCategory}${index}` }
            id={ searchItem.strCategory }
            data-testid={ `${searchItem.strCategory}-category-filter` }
            type="button"
            onClick={ handleClick }
          >
            { searchItem.strCategory }
          </button>
        ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ resetFilters }
      >
        All
      </button>
    </div>
  );
}

CatButtons.propTypes = {
  search: PropTypes.string.isRequired,
};
