import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import { fetchByCategoryName, fetchByName } from '../helpers/requests';

export default function CatButtons(props) {
  const CATEGORIES_MAX_LENGTH = 5;
  const {
    categories,
    setSearchResult,
    setFromBtnFilter,
  } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const { search } = props;
  const [lasFilter, setLastFilter] = useState('');

  const handleClick = async ({ target: { id } }) => {
    setFromBtnFilter(true);
    if (lasFilter !== id) {
      setSearchResult(await fetchByCategoryName(pathname, id));
      setLastFilter(id);
    } else {
      setSearchResult(await fetchByName('', pathname));
      setLastFilter('');
    }
  };

  const resetFilters = async () => {
    setSearchResult(await fetchByName('', pathname));
  };

  return (
    <div className="nav-category">
      {categories && categories[search] && categories[search]
        .filter((food, index) => index < CATEGORIES_MAX_LENGTH)
        .map((searchItem, index) => (
          <button
            key={ `${searchItem.strCategory}${index}` }
            id={ searchItem.strCategory }
            data-testid={ `${searchItem.strCategory}-category-filter` }
            type="button"
            onClick={ handleClick }
            className="btn-category"
          >
            { searchItem.strCategory }
          </button>
        ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ resetFilters }
        className="btn-category"
      >
        All
      </button>
    </div>
  );
}

CatButtons.propTypes = {
  search: PropTypes.string.isRequired,
};
