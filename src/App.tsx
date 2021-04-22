import React from 'react';
import logo from './logo.svg';
import { Board } from './pages/Board';
import { ShowPokemon } from './pages/ShowPokemon.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div style={{ maxWidth: `980px`, margin: "auto" }} >
        <Switch>
          <Route exact path="/" component={Board} />
          <Route exact path="/pokemon/:pokemonId" component={ShowPokemon} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
