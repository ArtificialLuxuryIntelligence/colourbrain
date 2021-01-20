import './App.scss';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Main from './components/Main/Main';
import Game from './components/Game/Game';
import FAQ from './components/FAQ/FAQ';
import About from './components/About/About';

import Nav from './components/Nav/Nav';

function App() {
  return (
    <div className="App">
      <header className="App-header"> Colour Brain</header>

      <Router>
        <Nav />

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
            <Route path="/">
              <Game />
            </Route>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
