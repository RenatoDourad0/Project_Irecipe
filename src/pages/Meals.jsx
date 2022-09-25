import React, { useContext } from 'react';
import Header from '../components/Header';
import MealDetails from './MealDetails';
import { GlobalContext } from '../context/GlobalProvider';

export default function Meals() {
  const { searchResult } = useContext(GlobalContext);

  return (
    <div>
      <Header />
      { searchResult && searchResult.meals && Object.values(searchResult)[0].length > 1
      && <MealDetails /> }
    </div>
  );
}
