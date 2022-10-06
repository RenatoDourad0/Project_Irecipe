/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { GlobalContext } from '../context/GlobalProvider';

export default function RecomItems(props) {
  const [index, setIndex] = useState(0);
  const { fetchRecFoods } = useContext(GlobalContext);
  const { id, thumb, search, str } = props;
  const REC_MAX_LENGTH = 6;

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Carousel
        activeIndex={ index }
        onSelect={ handleSelect }
        className="recomended-corousel"
      >
        { fetchRecFoods && fetchRecFoods[search] && fetchRecFoods[search]
          .filter((rec, ind) => ind < REC_MAX_LENGTH)
          .map((e) => (
            <Carousel.Item key={ e[id] }>
              <img
                className="d-block w-100"
                src={ e[thumb] }
                alt="recomendElement"
                style={ { padding: '0' } }
              />
              <Carousel.Caption>
                <h3 style={ { textAlign: 'center' } }>
                  { e[str] }
                </h3>
                <p>
                  { ' ' }
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}

RecomItems.propTypes = {
  id: PropTypes.string.isRequired,
  thumb: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
};
