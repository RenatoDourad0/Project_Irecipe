import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" className="footer">
      <input
        type="image"
        src={ drinkIcon }
        alt="drinks page"
        data-testid="drinks-bottom-btn"
        onClick={ () => {
          history.push('/drinks');
        } }
      />
      <input
        type="image"
        src={ mealIcon }
        alt="meals page"
        data-testid="meals-bottom-btn"
        onClick={ () => {
          history.push('/meals');
        } }
      />
    </div>
  );
}
