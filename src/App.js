import React from 'react';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Details from './pages/Details';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Home } />
      <Route path="/cart" component={ Cart } />
      <Route exact path="/details/:id" component={ Details } />
    </Switch>
  );
}
export default App;
