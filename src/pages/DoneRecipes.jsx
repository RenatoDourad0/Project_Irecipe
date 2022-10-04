import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { GlobalContext } from '../context/GlobalProvider';
import ShareButton from '../components/ShareButton';
import '../styles/done-recipes.css';

export default function DoneRecipes() {
  const { showRecipes, setShowRecipes, doneRecipes } = useContext(GlobalContext);
  const showPerType = (ty) => setShowRecipes(doneRecipes.filter((e) => e.type === ty));

  return (
    <div className="done-recipes-container">
      <div className="done-recipes-header">
        <Header />
      </div>
      <div>
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setShowRecipes(doneRecipes) }
          className="btn-done-recipes"
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => showPerType('meal') }
          className="btn-done-recipes"
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          className="btn-done-recipes"
          onClick={ () => showPerType('drink') }
        >
          Drinks
        </button>
      </div>
      { showRecipes && showRecipes.map((dR, index) => (
        <div key={ dR.id } alt="done-recipe" className="done-recipe-card">
          <Link to={ `/${dR.type}s/${dR.id}` }>
            <img
              src={ dR.image }
              alt="recipeDone"
              role="presentation"
              data-testid={ `${index}-horizontal-image` }
              className="done-recipes-img"
            />
          </Link>
          <div>
            <Link
              to={ `/${dR.type}s/${dR.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              <div className="top-card-done">
                <h3>{ dR.name }</h3>
                <ShareButton link={ `http://localhost:3000/${dR.type}s/${dR.id}` } testid={ `${index}-horizontal-share-btn` } />
              </div>
            </Link>
            <div className="info-recipe">
              <div>
                <h3>{dR.type === 'meal' ? 'Nationality:' : 'Alcoholic:'}</h3>
                {' '}
                <h3>Category:</h3>
                {' '}
              </div>
              <div className="test">
                <h3
                  data-testid={ `${index}-horizontal-top-text` }
                  className="test"
                >
                  { dR.type === 'meal' && (
                    <span>
                      { dR.nationality }
                      {' '}
                    </span>
                  )}
                  { dR.type === 'drink' && (
                    <span>
                      { dR.alcoholicOrNot }
                      {' '}
                    </span>
                  )}
                </h3>
                <h3>
                  <span>{ dR.category }</span>
                </h3>
              </div>
              { dR.tags && dR.tags
                .filter((tags, number) => number < 2)
                .map((tag, index2) => (
                  <h3
                    data-testid={ `${index}-${tag}-horizontal-tag` }
                    key={ index2 }
                  >
                    { tag }
                  </h3>
                ))}
            </div>
          </div>
        </div>
      ))}

      <div />
    </div>
  );
}
