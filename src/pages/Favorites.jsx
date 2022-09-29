import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { GlobalContext } from '../context/GlobalProvider';
import ShareButton from '../components/ShareButton';
import FavoriteButton from '../components/FavoriteButton';

export default function Favorites() {
  const { favoriteRecipes } = useContext(GlobalContext);
  const [showFavorites, setShowFavorites] = useState([]);
  useEffect(() => {
    setShowFavorites(favoriteRecipes);
  }, [favoriteRecipes]);
  const showPerType = (ty) => setShowFavorites(favoriteRecipes.filter((e) => e
    .type === ty));
  console.log(showFavorites);
  return (
    <div>
      <Header />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setShowFavorites(favoriteRecipes) }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => showPerType('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => showPerType('drink') }
      >
        Drinks
      </button>

      { showFavorites && showFavorites.map((dR, index) => (
        <div key={ dR.id } alt="favorite-recipe">
          <Link to={ `/${dR.type}s/${dR.id}` } className="card-food">
            <img
              src={ dR.image }
              alt="recipe-favorite"
              role="presentation"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
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
          <Link to={ `/${dR.type}s/${dR.id}` } data-testid={ `${index}-horizontal-name` }>
            { dR.name }
          </Link>
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
          <FavoriteButton
            link={ `http://localhost:3000/${dR.type}s/${dR.id}` }
            testid={ `${index}-horizontal-favorite-btn` }
            recipeDetails={ dR }
            id={ dR.id }
          />
          <ShareButton link={ `http://localhost:3000/${dR.type}s/${dR.id}` } testid={ `${index}-horizontal-share-btn` } />
        </div>
      ))}

      <div />
    </div>
  );
}
