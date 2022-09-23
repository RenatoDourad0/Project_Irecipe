import React, { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [CONSTANTE, SETCONTANTE] = useState(null); // pra editar

  const context = useMemo(() => ({
    CONSTANTE,
    SETCONTANTE,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), []);

  return (
    <GlobalContext.Provider value={ context }>
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
