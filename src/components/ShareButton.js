import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import image from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

export default function ShareButton(props) {
  const [linkCopied, setLinkCopied] = useState(false);
  const { testid, link } = props;
  const [URL, setURL] = useState('');
  const { pathname } = useLocation();

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

  const defineButtonClassName = pathname.includes('done-recipes')
    ? 'done-recipes-share-btn' : 'share-btn';

  const defineMessageClassName = pathname.includes('done-recipes')
    ? 'done-recipes-share-msg' : 'share-message';

  return (
    <>
      <button
        type="button"
        data-testid={ testid }
        onClick={ handleShare }
        src={ image }
        className={ defineButtonClassName }
      >
        <img src={ image } alt="share-icon" />
      </button>
      { linkCopied && <p className={ defineMessageClassName }>Link copied!</p> }
    </>
  );
}

ShareButton.propTypes = {
  testid: PropTypes.string,
  link: PropTypes.string,
}.isRequired;
