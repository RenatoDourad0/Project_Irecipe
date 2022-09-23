import { Router } from 'react-router-dom/cjs/react-router-dom.min';

export default function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}
