import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import image from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton(props) {
  const [linkCopied, setLinkCopied] = useState(false);
  const { testid, link } = props;
  const [URL, setURL] = useState('');

  useEffect(() => {
    if (link.includes('/in-progress')) {
      const filteredURL = link.split('/in-progress');
      filteredURL.pop();
      setURL(filteredURL[0]);
    } else setURL(link);
  }, [link]);

  const handleShare = () => {
    const timeShowingMsg = 5000;
    copy(URL);
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
        className="share-btn"
      >
        <img src={ image } alt="share-icon" />
      </button>
      { linkCopied && <p className="share-message">Link copied!</p> }
    </>
  );
}

ShareButton.propTypes = {
  testid: PropTypes.string,
  link: PropTypes.string,
}.isRequired;
