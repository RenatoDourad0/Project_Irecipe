import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
// import DrinkDetails from './DrinkDetails';
import { GlobalContext } from '../context/GlobalProvider';
import Footer from '../components/Footer';

export default function Drinks() {
  const { searchResult, setSearchResult } = useContext(GlobalContext);
  const { push } = useHistory();

  const CARDS_MAX_LENGTH = 12;

  return (
    <div>
      <Header />
      { searchResult && searchResult.drinks
        && Object.values(searchResult)[0].length > 1 && searchResult.drinks
        .filter((drink, index) => index < CARDS_MAX_LENGTH)
        .map((searchItem, index) => (
          <div
            key={ searchItem.idDrink }
            data-testid={ `${index}-recipe-card` }
          >
            <img
              src={ searchItem.strDrinkThumb }
              alt={ searchItem.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <h3
              data-testid={ `${index}-card-name` }
            >
              { searchItem.strDrink }
            </h3>
            <button
              type="button"
              onClick={ () => {
                setSearchResult(null);
                push('/drinks');
              } }
            >
              Voltar
            </button>
          </div>
        ))}
      <Footer />
    </div>
  );
}
