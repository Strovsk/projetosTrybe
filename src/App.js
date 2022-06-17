import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './Context/Provider';
import ProviderUi from './Context/ProviderUi';
import * as Pages from './pages';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <ProviderUi>
      <Provider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={ Pages.Login } />
            {/* // NOTE passar props para os componentes de mesma pagin */}
            <Route
              exact
              path="/foods"
              render={
                (routeProps) => (<Pages.HomeRecipes { ...routeProps } title="Foods" />)
              }
            />
            <Route
              exact
              path="/drinks"
              render={
                (routeProps) => (<Pages.HomeRecipes { ...routeProps } title="Drinks" />)
              }
            />
            <Route exact path="/foods/:recipe_id" component={ Pages.RecipeDetails } />
            <Route
              exact
              path="/foods/:recipe_id/in-progress"
              component={ Pages.InProgressRecipes }
            />
            <Route exact path="/drinks/:recipe_id" component={ Pages.RecipeDetails } />
            <Route
              exact
              path="/drinks/:recipe_id/in-progress"
              component={ Pages.InProgressRecipes }
            />
            <Route
              exact
              path="/explore"
              render={
                (routeProps) => (<Pages.Explore
                  { ...routeProps }
                  title="Explore"
                />)
              }
            />
            <Route
              exact
              path="/explore/foods"
              render={
                (routeProps) => (<Pages.ExploreFoodOrDrink
                  { ...routeProps }
                  title="Explore Foods"
                />)
              }
            />
            <Route
              exact
              path="/explore/foods/ingredients"
              render={
                (routeProps) => (<Pages.ExploreIngredients
                  { ...routeProps }
                  title="Explore Ingredients"
                />)
              }
            />
            <Route
              exact
              path="/explore/foods/nationalities"
              render={
                (routeProps) => (<Pages.ExploreByNationality
                  { ...routeProps }
                  title="Explore Nationalities"
                />)
              }
            />
            <Route
              exact
              path="/explore/drinks"
              render={
                (routeProps) => (<Pages.ExploreFoodOrDrink
                  { ...routeProps }
                  title="Explore Drinks"
                />)
              }
            />
            <Route
              exact
              path="/explore/drinks/ingredients"
              render={
                (historyProps) => (<Pages.ExploreIngredients
                  { ...historyProps }
                  title="Explore Ingredients"
                />)
              }
            />
            <Route
              exact
              path="/profile"
              render={
                (historyProps) => (<Pages.Profile
                  { ...historyProps }
                  title="Profile"
                />)
              }
            />
            <Route
              exact
              path="/done-recipes"
              render={
                (historyProps) => (<Pages.DoneRecipes
                  { ...historyProps }
                  title="Done Recipes"
                />)
              }
            />
            <Route
              exact
              path="/favorite-recipes"
              render={
                (historyProps) => (<Pages.FavoriteRecipes
                  { ...historyProps }
                  title="Favorite Recipes"
                />)
              }
            />
            <Route path="/*" component={ Pages.NotFound } />
          </Switch>
        </BrowserRouter>
      </Provider>
    </ProviderUi>
  );
}

export default App;
