import React, { useContext, useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import { GlobalContext } from '../context/GlobalProvider';
import { fetchByName, fetchCategories } from '../helpers/requests';
import CatButtons from '../components/CatButtons';

export default function Meals() {
  const { searchResult, setSearchResult,
    setCategories } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);

  const fetchApis = async () => {
    setSearchResult(await fetchByName('', '/meals'));
    setCategories(await fetchCategories('/meals'));
  };

  useEffect(() => {
    fetchApis();
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      { loading ? <Loading /> : (
        <div>
          <Header />
          <CatButtons search="meals" />
          { searchResult
            && searchResult.meals
            && Object.values(searchResult)[0].length > 0
            && <Recipes
              id="idMeal"
              image="strMealThumb"
              str="strMeal"
              search="meals"
            /> }
          <Footer />
        </div>
      )}
    </div>
  );
}
