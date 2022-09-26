import React, { useContext } from 'react';
import Header from '../components/Header';
import DrinkDetails from './DrinkDetails';
import { GlobalContext } from '../context/GlobalProvider';
import Footer from '../components/Footer';

export default function Drinks() {
  const { searchResult } = useContext(GlobalContext);

  return (
    <div>
      <Header />
      { searchResult && searchResult.drinks && Object.values(searchResult)[0].length > 1
      && <DrinkDetails /> }
      <Footer />
    </div>
  );
}
