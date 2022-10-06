import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import FavoritesRecipes from './pages/FavoriteRecipes';
import ProfilePage from './pages/ProfilePage';
import DoneRecipes from './pages/DoneRecipes';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
    <GlobalProvider>
      <Switch>
        <Route exact path="/Project_Irecipe" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals/:id" component={ RecipeDetails } />
        <Route exact path="/drinks/:id" component={ RecipeDetails } />
        <Route exact path="/profile" component={ ProfilePage } />
        <Route exact path="/meals/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoritesRecipes } />
      </Switch>
    </GlobalProvider>
  );
}

export default App;
