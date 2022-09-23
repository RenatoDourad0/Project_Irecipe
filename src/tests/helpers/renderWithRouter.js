import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import withRouter from './withRouter';

export default function renderWithRouter(
  component,
  {
    initialPath = '/',
    history = createMemoryHistory([initialPath]),
  } = {},
) {
  return {
    ...render(withRouter(component, history)),
    history,
  };
}
