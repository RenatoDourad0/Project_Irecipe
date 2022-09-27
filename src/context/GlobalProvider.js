import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export const GlobalContext = createContext();

const MEALS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

export function GlobalProvider({ children }) {
  const { push } = useHistory();
  const { pathname: pagePath } = useLocation();
  const [mealCategories, setMealCaegories] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch(MEALS_CATEGORIES_URL)
      .then((res) => res.json())
      .then((data) => {
        setMealCaegories(data.meals
          .reduce((acc, curr) => [...acc, curr.strCategory], []));
      });
  }, []);

  // redireciona após envio do filtro de pesquisa no caso de retornar somente uma comida ou bebida (requisito 13) ou exibe um alert caso não encontre nenhum resultado (requisito 15)
  const redirectToDetails = useCallback(() => {
    if (searchResult && Object.values(searchResult)[0] === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (searchResult && Object.values(searchResult)[0].length === 1) {
      if (pagePath === '/meals') {
        return push(`/meals/${searchResult.meals[0].idMeal}`);
      }
      if (pagePath === '/drinks') {
        return push(`/drinks/${searchResult.drinks[0].idDrink}`);
      }
    }
  }, [pagePath, push, searchResult]);

  useEffect(() => {
    redirectToDetails();
  }, [searchResult, redirectToDetails]);

  const context = {
    mealCategories,
    setMealCaegories,
    searchResult,
    setSearchResult,
    redirectToDetails,
    categories,
    setCategories,
  };

  // useMemo(() => ({
  //   mealCategories,
  //   setMealCaegories,
  //   searchResult,
  //   setSearchResult,
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }), []);

  return (
    <GlobalContext.Provider value={ context }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
