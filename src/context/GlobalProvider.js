/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFromLS } from '../helpers/localStorage';

export const GlobalContext = createContext();

const MEALS_CATEGORIES_URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const done = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

export function GlobalProvider({ children }) {
  const { push } = useHistory();
  const { pathname: pagePath } = useLocation();
  const [mealCategories, setMealCaegories] = useState([]);
  const [searchResult, setSearchResult] = useState(null);
  const [categories, setCategories] = useState([]);
  const [fromBtnFilter, setFromBtnFilter] = useState(false);
  const [fetchRecFoods, setRecFoods] = useState({});
  const [doneRecipes, setDoneRep] = useState(done);
  const [inProgressRecipes, setProgress] = useState({
    meals: {},
    drinks: {},
  });
  const [recipeToEdit, setRecipeToEdit] = useState({
    id: '',
    type: '',
  });

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
    if (!fromBtnFilter) redirectToDetails();
  }, [searchResult, redirectToDetails, fromBtnFilter]);

  // toda vez que abre a página, pega o local Storage
  useEffect(() => {
    if (getFromLS('inProgressRecipes')) {
      setProgress(getFromLS('inProgressRecipes'));
    }
    if (getFromLS('doneRecipes')) {
      setDoneRep(getFromLS('doneRecipes'));
    }
  }, [pagePath]);

  const context = {
    mealCategories,
    setMealCaegories,
    searchResult,
    setSearchResult,
    redirectToDetails,
    categories,
    setCategories,
    setFromBtnFilter,
    fetchRecFoods,
    setRecFoods,
    doneRecipes,
    setDoneRep,
    inProgressRecipes,
    setProgress,
    recipeToEdit,
    setRecipeToEdit,
  };

  return (
    <GlobalContext.Provider value={ context }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
