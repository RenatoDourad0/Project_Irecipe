import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealDetails from './MealDetails';
import { GlobalContext } from '../context/GlobalProvider';
import { fetchByName, fetchCategories } from '../helpers/requests';
import CatButtons from '../components/CatButtons';

export default function Meals() {
  const { searchResult, setSearchResult, setCategories } = useContext(GlobalContext);
  const fetchMealsOrDrinks = async () => {
    setSearchResult(await fetchByName('', '/meals'));
  };
  const fetchCatMeals = async () => {
    setCategories(await fetchCategories('/meals'));
  };
  useEffect(() => {
    fetchMealsOrDrinks();
    fetchCatMeals();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      <CatButtons search="meals" />
      { searchResult && searchResult.meals && Object.values(searchResult)[0].length > 1
      && <MealDetails /> }
      <Footer />
    </div>
  );
}
