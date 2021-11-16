import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

import Pokemon from './components/Pokemon';
import Pokelist from './components/Pokelist';

function App() {
  return (
    <div className="App">

      <Router>
        <div>
          <nav>
            <div>
              <Link to='/pokelist'>
                All Pokemons
              </Link>
            </div>
            <div>
              <Link to='/pokemon'>
                Detail view
              </Link>
            </div>
          </nav>

          <h1>Pokemon</h1>

          <Route path="/pokelist">
            <Pokelist />
          </Route>
          <Route path="/pokemon/:id?">
            <Pokemon />
          </Route>
        </div>
      </Router>

    </div>
  );
}

export default App;
