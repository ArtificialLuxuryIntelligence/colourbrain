import React, { useEffect, useState, useRef } from 'react';
import tinycolor from 'tinycolor2';

import './Game.scss';
import ColorPicker from '../ColorPicker/ColorPicker';
import RoundColor from '../RoundColor/RoundColor';
import Button from '../Button/Button';
import Checkbox from './../Checkbox/Checkbox';
import Results from '../Results/Results';
import CompareColors from '../CompareColors/CompareColors';

//must have minimum 2 rounds
// make these a user adjustable settings option on homepage
const totalRounds = 2;
const flashTime = 1800;

export default function Game() {
  const [roundColors, setRoundColors] = useState(generateRounds(totalRounds));
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

  // const [complement, setComplement] = useState(null);
  // const [triad, setTriad] = useState(null);
  // const [tetrad, setTetrad] = useState(null);

  // const loaded = useRef(false);
  const timer = useRef();

  useEffect(() => {
    if (gameActive) {
      if (preview) {
        setRoundStage('preview');
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
        timer.current = setTimeout(() => {
          setRoundStage('pick');
        }, flashTime);

        return () => clearTimeout(timer.current);
      } else {
        setRoundStage('pick');
      }
    }
  }, [round]);

  // useEffect(() => {
  //   const targetColor = roundColors[round - 1].targetColor;
  //   const { complement, triad, tetrad } = colorCombos(
  //     roundColors[round - 1].targetColor
  //   );
  //   setComplement(complement);
  //   setTriad(triad);
  //   setTetrad(tetrad);
  // }, [round]);

  useEffect(() => {
    const data = localStorage.getItem('highscores');
    if (data) {
      setHighscores(JSON.parse(data));
    }
    return () => {};
  }, []);
  useEffect(() => {
    localStorage.setItem('highscores', JSON.stringify(highscores));
    return () => {};
  }, [highscores]);

  const handlePickColor = (e) => {
    // console.log(pickedColor);
    // console.log(roundColors[round - 1]);
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
    console.log(results);
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
    let mode = e.target.value;
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
    console.log(userPreferencePreview);
  };

  const handleUpdateHighscores = (score) => {
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
          <Button label="Hue" handleClick={handleSelectMode} />
          <Button label="SatLum" handleClick={handleSelectMode} />
          <Button label="HSL" handleClick={handleSelectMode} />

          <Button label="CompHue" handleClick={handleSelectMode} />
          <Button label="CompSL" handleClick={handleSelectMode} />
          <Button label="CompHSL" handleClick={handleSelectMode} />

          <Button label="TriadHue" handleClick={handleSelectMode} />
          <Button label="TriadSL" handleClick={handleSelectMode} />
          <Button label="TriadHSL" handleClick={handleSelectMode} />

          <Button label="TetradHue" handleClick={handleSelectMode} />
          <Button label="TetradSL" handleClick={handleSelectMode} />
          <Button label="TetradHSL" handleClick={handleSelectMode} />

          {/* custom game with checkbox to choose which modes to include */}
          <Checkbox
            label={'Colour preview *'}
            handleClick={handleToggleUserPrefPreview}
            checked={userPreferencePreview}
          />
          {/* checkbox to turn preview off */}

          <div>
            <p>Match the colour shown at the start of each round.</p>
            <p>Use the Complementary/Triad/Tetrad colours as guides</p>
            <p>
              * Only applies to modes where other colours are present (i.e. not
              Hue, SatLum, HSL)
            </p>
          </div>
          <div>
            <h2>Highscores</h2>
            {Object.entries(highscores).map((s) => {
              return (
                <li>
                  {s[0]} = {s[1]} %
                </li>
              );
            })}
          </div>
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
          handleRestartGame={handleRestartGame}
          handleBackToStart={handleBackToStart}
          handleUpdateHighscores={handleUpdateHighscores}
        />
      )}
    </div>
  );
}

// separate into own files?
const randomRGBA = (range = [0, 255], a = 1) => {
  return {
    r: randomInRange(range),
    g: randomInRange(range),
    b: randomInRange(range),
    a,
  };
};

// returns random rgba object with same saturation and luminosity as input color (different hue)
const randomRGBA_matchSL = (color) => {
  let hsl = tinycolor.fromRatio(color).toHsl();
  let hue = Math.random();
  hsl.h = hue;
  let rgb = tinycolor(hsl).toRgb();
  return rgb;
};

// returns random rgba object with different saturation and luminosity as input color (same hue)
const randomRGBA_matchH = (color) => {
  let hsl = tinycolor.fromRatio(color).toHsl();
  let sat = Math.random();
  let lum = Math.random();
  hsl.s = sat;
  hsl.l = lum;
  let rgb = tinycolor(hsl).toRgb();
  return rgb;
};

const randomInRange = (range = [0, 1]) => {
  let [min, max] = range;
  return Math.random() * (max - min) + min;
};

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

const colorCombos = (color) => {
  const complement = tinycolor(color).complement().toRgbString();
  let triad = tinycolor(color)
    .triad()
    .map((c) => c.toRgbString());
  let tetrad = tinycolor(color)
    .tetrad()
    .map((c) => c.toRgbString());

  //remove original colors
  triad.shift();
  tetrad.shift();
  console.log({ triad, tetrad });
  return { complement, triad, tetrad };
};
