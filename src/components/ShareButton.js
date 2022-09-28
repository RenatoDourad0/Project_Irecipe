import React, { useState } from 'react';
import { copy } from 'clipboard-copy';
import image from '../images/shareIcon.svg';

export default function ShareButton() {
  const [linkCopied, setLinkCopied] = useState(false);

  const handleShare = () => {
    const timeShowingMsg = 5000;
    copy(global.document.location.href);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, timeShowingMsg);
  };

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ handleShare }
      >
        <img src={ image } alt="share-icon" />
      </button>
      { linkCopied && <h1>Link copied!</h1> }
    </div>
  );
}
