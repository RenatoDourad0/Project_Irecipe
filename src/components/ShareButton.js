import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import image from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton(props) {
  const [linkCopied, setLinkCopied] = useState(false);
  const { testid, link } = props;

  const handleShare = () => {
    const timeShowingMsg = 5000;
    copy(link);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, timeShowingMsg);
  };

  return (
    <>
      <button
        type="button"
        data-testid={ testid }
        onClick={ handleShare }
        src={ image }
      >
        <img src={ image } alt="share-icon" />
      </button>
      { linkCopied && <p>Link copied!</p> }
    </>
  );
}

ShareButton.propTypes = {
  testid: PropTypes.string,
  link: PropTypes.string,
}.isRequired;
