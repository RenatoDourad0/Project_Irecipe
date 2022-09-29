import React, { useContext } from 'react';
import Header from '../components/Header';
import { GlobalContext } from '../context/GlobalProvider';
import ShareButton from '../components/ShareButton';

export default function DoneRecipes() {
  const { doneRecipes } = useContext(GlobalContext);
  return (
    <div>
      <Header />
      <button data-testid="filter-by-all-btn" type="button">All</button>
      <button data-testid="filter-by-meal-btn" type="button">Meals</button>
      <button data-testid="filter-by-drink-btn" type="button">Drinks</button>
      { doneRecipes && doneRecipes.map((dR, index) => (
        <div key={ dR.id }>
          <img
            src={ dR.image }
            alt="recipeDone"
            data-testid={ `${index}-horizontal-image` }
          />
          <h3
            data-testid={ `${index}-horizontal-top-text` }
          >
            { dR.type === 'meal' && (
              <span>
                { dR.nationality }
                {' '}
                -
                {' '}
              </span>
            )}
            { dR.type === 'drink' && (
              <span>
                { dR.alcoholicOrNot }
                {' '}
                -
                {' '}
              </span>
            )}
            { dR.category }
          </h3>
          <h3 data-testid={ `${index}-horizontal-name` }>{ dR.name }</h3>
          <h3 data-testid={ `${index}-horizontal-done-date` }>{ dR.doneDate }</h3>
          { dR.tags && dR.tags
            .filter((tags, number) => number < 2)
            .map((tag, index2) => (
              <p
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ index2 }
              >
                { tag }
              </p>
            ))}
          <ShareButton link={ `http://localhost:3000/${dR.type}s/${dR.id}` } testid={ `${index}-horizontal-share-btn` } />
        </div>
      ))}

      <div />
    </div>
  );
}
