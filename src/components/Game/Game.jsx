import React, { useEffect, useState, useRef } from 'react';
import './Game.scss';
import ColorPicker from '../ColorPicker/ColorPicker';
import RoundColor from '../RoundColor/RoundColor';
import Button from '../Button/Button';
import Results from '../Results/Results';
import CompareColors from '../CompareColors/CompareColors';

//must have minimum 2 rounds 
const totalRounds = 2;
const flashTime = 800
export default function Game() {
  const [roundColors, setRoundColors] = useState(generateRounds(totalRounds));
  const [results, setResults] = useState([]);
  const [pickedColor, setPickedColor] = useState(randomRGBA([20, 235]));
  const [round, setRound] = useState(totalRounds); // round number reset at start game (this is not set to 1 to ensure useeffect is triggered)
  // stages: new, preview, pick, compare, results
  const [roundStage, setRoundStage] = useState('new');

  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) {
      setRoundStage('preview');

      const timer = setTimeout(() => {
        setRoundStage('pick');
      }, flashTime);
      return () => clearTimeout(timer);
    } else {
      console.log('Ok');
      loaded.current = true;
    }
  }, [round]);

  const handlePickColor = (e) => {
    console.log(pickedColor);
    console.log(roundColors[round - 1]);

    setResults([
      ...results,
      { picked: pickedColor, target: roundColors[round - 1] },
    ]);
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
    console.log('restarting');
    setRoundColors(generateRounds(totalRounds));
    // setRoundStage('preview');
    setResults([]);
    setRound(1);
  };

  const { r, g, b, a } = roundColors[round - 1];
  const { r: rp, g: gp, b: bp, a: ap } = pickedColor;

  return (
    <div className="game-container">
      {roundStage === 'new' && (
        <div className="new-game">
          <Button label="New Game" handleClick={handleRestartGame} />
          <div>Match the colour flashed on screen.</div>
        </div>
      )}
      {roundStage === 'preview' && (
        <RoundColor color={roundColors[round - 1]} />
      )}
      {roundStage === 'pick' && (
        <>
          {/* <h1>Round {round}</h1> */}

          <ColorPicker
            pickedColor={pickedColor}
            setPickedColor={setPickedColor}
            handlePickColor={handlePickColor}
          />
        </>
      )}

      {roundStage == 'compare' && (
        <CompareColors
          round={round}
          totalRounds={totalRounds}
          roundColors={roundColors}
          pickedColor={pickedColor}
          handleNextRound={handleNextRound}
          handleShowResults={handleShowResults}
        />
      )}

      {roundStage == 'results' && (
        <Results results={results} handleRestartGame={handleRestartGame} />
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

const randomInRange = (range = [0, 1]) => {
  let [min, max] = range;
  return Math.random() * (max - min) + min;
};

const generateRounds = (rounds) => {
  let res = [];
  let r = 0;
  while (r < rounds) {
    res.push(randomRGBA([20, 235]));
    r++;
  }
  return res;
};
