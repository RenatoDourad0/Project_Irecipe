import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/meals" component={ Meals } />
      <Route exact path="/drinks" component={ Drinks } />
      {/* <Route exact path="/meals/:id" component={  } />
      <Route exact path="/drinks/:id" component={  } />
      <Route exact path="/meals/:id/in-progress" component={  } />
      <Route exact path="/drinks/:id/in-progress" component={  } /> */}
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ Favorites } />
    </Switch>
  );
}

export default App;
