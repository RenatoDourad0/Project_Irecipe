import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import DrinkDetails from './DrinkDetails';
import { GlobalContext } from '../context/GlobalProvider';
import Footer from '../components/Footer';
import { fetchByName } from '../helpers/requests';

export default function Drinks() {
  const { searchResult, setSearchResult } = useContext(GlobalContext);
  const fetchMealsOrDrinks = async () => {
    setSearchResult(await fetchByName('', '/drinks'));
  };
  useEffect(() => {
    fetchMealsOrDrinks();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Header />
      { searchResult && searchResult.drinks && Object.values(searchResult)[0].length > 1
      && <DrinkDetails /> }
      <Footer />
    </div>
  );
}
