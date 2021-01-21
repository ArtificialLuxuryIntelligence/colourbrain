import './App.scss';
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Home from './components/Home/Home';
import Game from './components/Game/Game';
import FAQ from './components/FAQ/FAQ';
import About from './components/About/About';

import Nav from './components/Nav/Nav';

import useOutsideClick from './components/Hooks/useOutsideClick.jsx';

function App() {
  const [navActive, setNavActive] = useState(false);

  const navRef = useRef();

  useOutsideClick(navRef, () => {
    if (navActive) {
      setNavActive(false);
    }
  });

  return (
    <div className="App">
      <Router>
        <header className="header">
          <Link to="/">
            <h1>Colour Brain</h1>
          </Link>

          <div ref={navRef}>
            <Nav navActive={navActive} setNavActive={setNavActive} />
          </div>
        </header>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <main>
          <Switch>
            <AnimatePresence exitBeforeEnter>
              <Route key="faq" path="/FAQ">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <FAQ />
                </motion.div>
              </Route>
              <Route key="about" path="/about">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <About />
                </motion.div>
              </Route>
              <Route key="game" path="/play">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Game />
                </motion.div>
              </Route>

              <Route key="home" path="/">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Home />
                </motion.div>
              </Route>
            </AnimatePresence>
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
