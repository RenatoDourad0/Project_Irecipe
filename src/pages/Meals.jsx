import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealDetails from './MealDetails';
import { GlobalContext } from '../context/GlobalProvider';
import { fetchByName } from '../helpers/requests';

export default function Meals() {
  const { searchResult, setSearchResult } = useContext(GlobalContext);
  const fetchMealsOrDrinks = async () => {
    setSearchResult(await fetchByName('', '/meals'));
  };
  useEffect(() => {
    fetchMealsOrDrinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      { searchResult && searchResult.meals && Object.values(searchResult)[0].length > 1
      && <MealDetails /> }
      <Footer />
    </div>
  );
}
