/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalProvider';

export default function RecomItems(props) {
  const { fetchRecFoods } = useContext(GlobalContext);
  const { id, thumb, search, str } = props;
  const [showIndex, setIndex] = useState({
    lower: 0,
    high: 1,
  });
  const { lower, high } = showIndex;
  const REC_MAX_LENGTH = 6;
  const changeRecom = () => {
    if (lower === 0) return setIndex({ lower: 2, high: 3 });
    if (lower === 2) return setIndex({ lower: 4, high: 5 });
    setIndex({ lower: 0, high: 1 });
  };
  return (
    <div>
      {fetchRecFoods && fetchRecFoods[search] && fetchRecFoods[search]
        .filter((rec, index) => index < REC_MAX_LENGTH)
        .map((e, index) => (
          <div
            key={ e[id] }
            data-testid={ `${index}-recommendation-card` }
            className="recomended-items-card"
            style={ { display: index !== high && lower !== index ? 'none' : 'block' } }
            display="none"
          >
            <p data-testid={ `${index}-recommendation-title` }>{ e[str] }</p>
            <img src={ e[thumb] } alt="recomendElement" />
          </div>
        ))}
      <button
        className="sugestion-card-btn"
        type="button"
        onClick={ changeRecom }
      >
        Next
      </button>
    </div>
  );
}
RecomItems.propTypes = {
  id: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};
