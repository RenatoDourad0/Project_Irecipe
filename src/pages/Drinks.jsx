import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import DrinkDetails from './DrinkDetails';
import { GlobalContext } from '../context/GlobalProvider';
import Footer from '../components/Footer';
import { fetchByName, fetchCategories } from '../helpers/requests';
import CatButtons from '../components/CatButtons';

export default function Drinks() {
  const { searchResult, setSearchResult, setCategories } = useContext(GlobalContext);
  const fetchMealsOrDrinks = async () => {
    setSearchResult(await fetchByName('', '/drinks'));
  };
  const fetchCatDrinks = async () => {
    setCategories(await fetchCategories('/drinks'));
  };
  useEffect(() => {
    fetchMealsOrDrinks();
    fetchCatDrinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      <CatButtons search="drinks" />
      { searchResult && searchResult.drinks && Object.values(searchResult)[0].length > 1
      && <DrinkDetails /> }
      <Footer />
    </div>
  );
}
