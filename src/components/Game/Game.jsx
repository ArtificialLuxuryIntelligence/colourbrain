import React, { useEffect, useState, useRef } from 'react';
import tinycolor from 'tinycolor2';
import { motion, AnimatePresence } from 'framer-motion';

import {
  randomRGBA,
  randomRGBA_matchH,
  randomRGBA_matchSL,
  randomRGBA_matchHS,
  generateRounds,
} from './../../tools/colorTools';
import './Game.scss';
import ColorPicker from '../ColorPicker/ColorPicker';
import RoundColor from '../RoundColor/RoundColor';
import Button from '../Button/Button';
// import Checkbox from './../Checkbox/Checkbox';
import Results from '../Results/Results';
import CompareColors from '../CompareColors/CompareColors';
import NewGameButtons from '../NewGameButtons/NewGameButtons';
import Highscores from '../Highscores/Highscores';
import Collapsible from 'react-collapsible';
import { Link } from 'react-router-dom';

//must have minimum 2 rounds
// make these a user adjustable settings option on homepage
const totalRounds = 2;
const flashTime = 2200; // take into account animation length of previous page unmount

export default function Game() {
  const [roundColors, setRoundColors] = useState(generateRounds(totalRounds));
  const [roundColorNames, setRoundColorNames] = useState([]);
  const [results, setResults] = useState([]);
  const [pickedColor, setPickedColor] = useState(randomRGBA([20, 235]));
  const [round, setRound] = useState(totalRounds); // round number reset at start game (this is not set to 1 to ensure useeffect is triggered)
  // stages: new, preview, pick, compare, results
  const [roundStage, setRoundStage] = useState('new');
  // game modes: Hue, SatLum, HSL
  const [gamemode, setgamemode] = useState(null);
  const [preview, setPreview] = useState(true);
  const [userPreferencePreview, setuserPreferencePreview] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [highscores, setHighscores] = useState({
    Hue: 0,
    SatLum: 0,
    HSL: 0,
    CompHue: 0,
    CompSL: 0,
    CompHSL: 0,
    SCompHue: 0,
    SCompSL: 0,
    SCompHSL: 0,
    TriadHue: 0,
    TriadSL: 0,
    TriadHSL: 0,
    TetradHue: 0,
    TetradSL: 0,
    TetradHSL: 0,
  });
  const timer = useRef();
  const isLoaded = useRef(false);

  // Update player colour options when moving to next round (i.e. lock in Hue or Sat/Lum dpending on game mode)
  useEffect(() => {
    if (gameActive) {
      const targetColor = roundColors[round - 1].targetColor;
      switch (gamemode) {
        case 'Hue':
        case 'CompHue':
        case 'SCompHue':
        case 'TriadHue':
        case 'TetradHue':
          setPickedColor(randomRGBA_matchSL(targetColor));
          break;
        case 'SatLum':
        case 'SCompSL':
        case 'CompSL':
        case 'TriadSL':
        case 'TetradSL':
          setPickedColor(randomRGBA_matchH(targetColor));
          break;
        case 'GSLum':
          console.log(targetColor);
          let p = randomRGBA_matchHS(targetColor);
          console.log(p);
          setPickedColor(p);

          break;

        // All HSL options get a random colour
        default:
          setPickedColor(randomRGBA([20, 235]));
      }
      if (preview) {
        setRoundStage('preview');
        timer.current = setTimeout(() => {
          setRoundStage('pick');
        }, flashTime);
        return () => clearTimeout(timer.current);
      } else {
        setRoundStage('pick');
      }
    }
  }, [round]);

  useEffect(() => {
    isLoaded.current && handleRestartGame();
    return () => {
      // cleanup;
    };
  }, [gamemode]);
  // Get highscores from local storage
  useEffect(() => {
    const data = localStorage.getItem('highscores');
    if (data) {
      setHighscores(JSON.parse(data));
    }
    return () => {};
  }, []);

  // Set highscores to local storage
  useEffect(() => {
    localStorage.setItem('highscores', JSON.stringify(highscores));
    return () => {};
  }, [highscores]);

  // Fetch colour names from API
  useEffect(() => {
    if (!isLoaded.current) {
      isLoaded.current = true;
      return;
    }
    let hexTargets = roundColors.map((round) =>
      tinycolor.fromRatio(round.targetColor).toHexString()
    );
    let requestString = hexTargets.map((t) => t.slice(1)).join(',');
    // https://github.com/meodai/color-names
    fetch(`https://api.color.pizza/v1/${requestString}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((response) => {
        // console.log('colors', response.colors);
        let names = response.colors.map((n) => n.name);
        setRoundColorNames(names);
      })
      .catch((error) => console.log(error));
  }, [roundColors]);

  // Event handlers
  const handlePickColor = (e) => {
    setRoundStage('compare');
    const targetColor = roundColors[round - 1].targetColor;
    setResults([...results, { picked: pickedColor, target: targetColor }]);
  };

  const handleNextRound = (e) => {
    console.log('round: ', round);
    setRoundStage('preview');
    setRound(round + 1);
  };

  const handleShowResults = (e) => {
    setRoundStage('results');
    // console.log(results);
  };

  const handleRestartGame = (e) => {
    console.log('restarting...');
    setGameActive(true);
    console.log(gamemode);
    // if (gamemode === 'GSLum') {
    // console.log('gsgsg');
    // setRoundColors(generateRounds(totalRounds, true));
    // } else {
    // console.log('gsgsg');

    setRoundColors(generateRounds(totalRounds));
    // }
    setRound(1);
    setResults([]);
  };

  const handleBackToStart = (e) => {
    console.log('back to start');
    setGameActive(false);
    
    // clearTimeout(timer.current);
    setRoundStage('new');
    setRound(totalRounds);
  };

  const handleSelectMode = (e) => {
    let mode = e.target.dataset.gamemode;
    setgamemode(mode);
    console.log(mode);

    if (
      userPreferencePreview ||
      mode === 'Hue' ||
      mode === 'SatLum' ||
      mode === 'HSL'
    ) {
      setPreview(true);
    } else {
      setPreview(false);
    }
    // handleRestartGame();
  };

  const handleToggleUserPrefPreview = (e) => {
    setuserPreferencePreview(!userPreferencePreview);
  };

  const handleUpdateHighscores = (score) => {
    // don't update highscore if using a preview (unless a memory gamemode)
    if (
      preview &&
      !(gamemode === 'Hue' || gamemode === 'SatLum' || gamemode === 'HSL')
    ) {
      return;
    }

    if (score > highscores[gamemode]) {
      setHighscores((prevState) => ({
        ...prevState,
        [gamemode]: score,
      }));
    }
  };

  return (
    <div className="game-container">
      <AnimatePresence exitBeforeEnter>
        {roundStage !== 'new' &&
          roundStage !== 'preview' &&
          roundStage !== 'results' && (
            <motion.div
              key="bbc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="back-button-container"
            >
              <Button label="Back" handleClick={handleBackToStart} />
            </motion.div>
          )}

        {roundStage === 'new' && (
          <motion.div
            key="ng"
            className="new-game"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NewGameButtons
              key={'buttons'}
              handleSelectMode={handleSelectMode}
              handleToggleUserPrefPreview={handleToggleUserPrefPreview}
              userPreferencePreview={userPreferencePreview}
            />

            <Collapsible
              key={'collapsible'}
              triggerClassName="collapsible-highscores"
              triggerOpenClassName="collapsible-highscores"
              trigger="Highscores"
            >
              <Highscores highscores={highscores} />
            </Collapsible>
          </motion.div>
        )}

        {roundStage === 'pick' && (
          <motion.div
            // no animating in if there has been a preview first - looks jarring otherwise
            initial={preview ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            // initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ColorPicker
              key={'colpick'}
              pickedColor={pickedColor}
              setPickedColor={setPickedColor}
              handlePickColor={handlePickColor}
              gamemode={gamemode}
              roundColors={roundColors[round - 1]}
            >
              <h1>Round {round}</h1>
            </ColorPicker>
          </motion.div>
        )}

        {roundStage === 'compare' && (
          <motion.div
            key="cmpr"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CompareColors
              key={'cmpcol'}
              round={round}
              roundColors={roundColors}
              totalRounds={totalRounds}
              targetColor={roundColors[round - 1].targetColor}
              pickedColor={pickedColor}
              handleNextRound={handleNextRound}
              handleShowResults={handleShowResults}
            />
          </motion.div>
        )}

        {roundStage === 'results' && (
          <motion.div
            key="reslts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Results
              key="resutls"
              results={results}
              gamemode={gamemode}
              roundColorNames={roundColorNames}
              roundColors={roundColors}
              handleRestartGame={handleRestartGame}
              handleBackToStart={handleBackToStart}
              handleUpdateHighscores={handleUpdateHighscores}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {roundStage === 'preview' && (
        // no exit animation (hence out of animatePresence component)
        // also for some reason putting it afterwards stops a Flash on screen when preview is off 🤷‍♂️
        <motion.div
          key={'prev'}
          initial={{ opacity: 1, clipPath: `circle(5%)` }}
          transition={{ duration: 1 }}
          animate={{ opacity: 1, clipPath: `circle(75%)` }}
        >
          <RoundColor key="rndcol" color={roundColors[round - 1].targetColor} />
        </motion.div>
      )}
    </div>
  );
}
