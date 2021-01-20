import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Game from './components/Game/Game';
import FAQ from './components/FAQ/FAQ';
import About from './components/About/About';

import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <Router>
        <header className="header">
          <Link to="/">
            <h1>Colour Brain</h1>
          </Link>

          <Nav />
        </header>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <main>
          <Switch>
            <Route path="/FAQ">
              <FAQ />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/play">
              <Game />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
