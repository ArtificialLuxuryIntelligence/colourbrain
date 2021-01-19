import React, { useEffect, useState, useRef } from 'react';
import tinycolor from 'tinycolor2';
import {
  randomRGBA,
  randomRGBA_matchH,
  randomRGBA_matchSL,
  colorCombos,
} from './../../tools/colorTools';
import './Game.scss';
import ColorPicker from '../ColorPicker/ColorPicker';
import RoundColor from '../RoundColor/RoundColor';
import Button from '../Button/Button';
import Checkbox from './../Checkbox/Checkbox';
import Results from '../Results/Results';
import CompareColors from '../CompareColors/CompareColors';
import NewGameButtons from '../NewGameButtons/NewGameButtons';
import Highscores from '../Highscores/Highscores';

//must have minimum 2 rounds
// make these a user adjustable settings option on homepage
const totalRounds = 2;
const flashTime = 1200;

export default function Game() {
  const [roundColors, setRoundColors] = useState(generateRounds(totalRounds));
  const [roundColorNames, setRoundColorNames] = useState([]);
  const [results, setResults] = useState([]);
  const [pickedColor, setPickedColor] = useState(randomRGBA([20, 235]));
  const [round, setRound] = useState(totalRounds); // round number reset at start game (this is not set to 1 to ensure useeffect is triggered)
  // stages: new, preview, pick, compare, results
  const [roundStage, setRoundStage] = useState('new');
  // game modes: Hue, SatLum, HSL
  const [gameMode, setgameMode] = useState('Hue');
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
      switch (gameMode) {
        case 'Hue':
          setPickedColor(randomRGBA_matchSL(targetColor));
          break;
        case 'CompHue':
          setPickedColor(randomRGBA_matchSL(targetColor));
          break;
        case 'TriadHue':
          setPickedColor(randomRGBA_matchSL(targetColor));
          break;
        case 'TetradHue':
          setPickedColor(randomRGBA_matchSL(targetColor));
          break;
        case 'SatLum':
          setPickedColor(randomRGBA_matchH(targetColor));
          break;
        case 'CompSL':
          setPickedColor(randomRGBA_matchH(targetColor));
          break;
        case 'TriadSL':
          setPickedColor(randomRGBA_matchH(targetColor));
          break;
        case 'TetradSL':
          setPickedColor(randomRGBA_matchH(targetColor));
          break;
        // case 'HSL':
        //   setPickedColor(randomRGBA([20, 235]));
        //   break;
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
    const targetColor = roundColors[round - 1].targetColor;

    setResults([...results, { picked: pickedColor, target: targetColor }]);
    setRoundStage('compare');
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
    setGameActive(true);
    setRoundColors(generateRounds(totalRounds));
    setRound(1);
    setResults([]);
  };

  const handleBackToStart = (e) => {
    setGameActive(false);
    // clearTimeout(timer.current);
    setRoundStage('new');
    setRound(totalRounds);
  };

  const handleSelectMode = (e) => {
    let mode = e.target.dataset.gamemode;
    console.log(mode);
    setgameMode(mode);

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
    handleRestartGame();
  };

  const handleToggleUserPrefPreview = (e) => {
    setuserPreferencePreview(!userPreferencePreview);
  };

  const handleUpdateHighscores = (score) => {
    // don't update highscore if using a preview (unless a memory gamemode)
    if (
      preview &&
      !(gameMode === 'Hue' || gameMode === 'SatLum' || gameMode === 'HSL')
    ) {
      return;
    }

    if (score > highscores[gameMode]) {
      setHighscores((prevState) => ({
        ...prevState,
        [gameMode]: score,
      }));
    }
  };

  // const { r, g, b, a } = roundColors[round - 1];
  // const { r: rp, g: gp, b: bp, a: ap } = pickedColor;

  return (
    // use switch statement?
    <div className="game-container">
      {roundStage !== 'new' &&
        roundStage !== 'preview' &&
        roundStage !== 'results' && (
          <div className="back-button-container">
            <Button label="Back" handleClick={handleBackToStart} />
          </div>
        )}
      {roundStage === 'new' && (
        <div className="new-game">
          <NewGameButtons
            handleSelectMode={handleSelectMode}
            handleToggleUserPrefPreview={handleToggleUserPrefPreview}
            userPreferencePreview={userPreferencePreview}
          />

          <div>
            <p>Match the colour shown at the start of each round.</p>
            <p>Use the Complementary/Triad/Tetrad colours as guides</p>
            <p>
              * Lets you preview the target colour. Score don't contribute to
              highscores. Doesn't apply to memory games.
            </p>
          </div>
          <Highscores highscores={highscores} />
        </div>
      )}
      {roundStage === 'preview' && (
        <RoundColor color={roundColors[round - 1].targetColor} />
      )}
      {roundStage === 'pick' && (
        <>
          <ColorPicker
            pickedColor={pickedColor}
            setPickedColor={setPickedColor}
            handlePickColor={handlePickColor}
            gameMode={gameMode}
            roundColors={roundColors[round - 1]}
            // targetColor={roundColors[round - 1].targetColor}
            // complement={roundColors[round - 1].complement}
            // triad={roundColors[round - 1].triad}
            // tetrad={roundColors[round - 1].tetrad}
          >
            <h1>Round {round}</h1>
          </ColorPicker>
        </>
      )}

      {roundStage === 'compare' && (
        <CompareColors
          round={round}
          roundColors={roundColors}
          totalRounds={totalRounds}
          targetColor={roundColors[round - 1].targetColor}
          pickedColor={pickedColor}
          handleNextRound={handleNextRound}
          handleShowResults={handleShowResults}
        />
      )}

      {roundStage === 'results' && (
        <Results
          results={results}
          gameMode={gameMode}
          roundColorNames={roundColorNames}
          roundColors={roundColors}
          handleRestartGame={handleRestartGame}
          handleBackToStart={handleBackToStart}
          handleUpdateHighscores={handleUpdateHighscores}
        />
      )}
    </div>
  );
}

const generateRounds = (rounds) => {
  let res = [];
  let r = 0;
  while (r < rounds) {
    const targetColor = randomRGBA([20, 235]);

    const { complement, triad, tetrad } = colorCombos(targetColor);

    res.push({ targetColor, complement, triad, tetrad });
    r++;
  }
  return res;
};
