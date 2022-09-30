import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import { GlobalContext } from '../context/GlobalProvider';
import Footer from '../components/Footer';
import { fetchByName, fetchCategories } from '../helpers/requests';
import CatButtons from '../components/CatButtons';
import Loading from '../components/Loading';

export default function Drinks() {
  const { searchResult, setSearchResult, setCategories } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  const fetchMealsOrDrinks = async () => {
    setSearchResult(await fetchByName('', '/drinks'));
  };

  const fetchCatDrinks = async () => {
    setCategories(await fetchCategories('/drinks'));
  };

  useEffect(() => {
    fetchMealsOrDrinks();
    fetchCatDrinks();
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      { loading ? <Loading /> : (
        <div>
          <Header />
          <CatButtons search="drinks" />
          { searchResult
            && searchResult.drinks
            && Object.values(searchResult)[0].length > 1
            && <Recipes
              id="idDrink"
              image="strDrinkThumb"
              str="strDrink"
              search="drinks"
            /> }
          <Footer />
        </div>
      )}

    </div>
  );
}
