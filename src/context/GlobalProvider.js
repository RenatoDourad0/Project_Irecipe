import React, { createContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = createContext();

const MEALS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export function GlobalProvider({ children }) {
  const [mealCategories, setMealCaegories] = useState([]);

  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    fetch(MEALS_CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        setMealCaegories(data.meals
          .reduce((acc, curr) => [...acc, curr.strCategory], []));
      });
  }, []);

  const context = useMemo(() => ({
    mealCategories,
    setMealCaegories,
    searchResult,
    setSearchResult,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <GlobalContext.Provider value={ context }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
