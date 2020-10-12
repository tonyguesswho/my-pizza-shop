import React from 'react';
import './App.css';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './containers/Home'

const App = () => (
  <div className="App">
    <Switch>
      <Route path={"/"} exact component={Home} />
      <Redirect to={'/'} />
    </Switch>
  </div>
);

export default App;