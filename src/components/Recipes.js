import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';
import '../styles/mealsdrinks.css';

export default function Recipes(props) {
  const { searchResult } = useContext(GlobalContext);
  const CARDS_MAX_LENGTH = 12;
  const ARRAY_LENGTH = 20;
  const { id, image, str, search } = props;
  const generatorNmb = () => {
    const array = [];
    for (let x = 0; x < ARRAY_LENGTH; x += 1) {
      array.push(x);
    }
    return array;
  };
  const renderIngredients = (ingre) => generatorNmb().map((e, index) => {
    const objName = `strIngredient${e}`;
    const string = `${ingre[objName]}`;
    console.log(string);
    if (string === '' || string === 'undefined' || string === 'null') {
      return '';
    }
    return (
      <span
        key={ `${ingre}, ${index}` }
      >
        { string }
        {', '}
      </span>
    );
  });
  return (
    <div>
      {searchResult && searchResult[search] && searchResult[search]
        .filter((food, index) => index < CARDS_MAX_LENGTH)
        .map((searchItem, index) => (
          <Link
            to={ `/${search}/${searchItem[id]}` }
            key={ searchItem[id] }
          >
            <div
              data-testid={ `${index}-recipe-card` }
              className="card-food-details"
            >
              <img
                src={ searchItem[image] }
                alt={ searchItem[str] }
                data-testid={ `${index}-card-img` }
              />
              <div className="title-des-rep">
                <h3
                  data-testid={ `${index}-card-name` }
                >
                  { searchItem[str] }
                </h3>
                { searchItem.strIngredient1 && (
                  <p className="recipe-details">
                    <span className="ingredients-md">Ingredients: </span>
                    {' '}
                    { renderIngredients(searchItem) }
                    { console.log(searchItem)}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

Recipes.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};
