import React, { useEffect } from 'react';
import tinycolor from 'tinycolor2';
import { calculateTotalScore, calculateScore } from './../../tools/scoring';
import './Results.scss';

import Button from '../Button/Button';

export default function Results({
  results,
  gameMode,
  roundColorNames,
  roundColors,
  handleRestartGame,
  handleBackToStart,
  handleUpdateHighscores,
}) {
  const totalScore = calculateTotalScore(results);
  useEffect(() => {
    handleUpdateHighscores(totalScore);
  }, [handleUpdateHighscores, results, totalScore]);

  return (
    <div className="results">
      <h3>
        {gameMode} - Score : {totalScore} %
      </h3>
      <Button label="Restart" handleClick={handleRestartGame} />
      <Button label="Home" handleClick={handleBackToStart} />

      <ul>
        {results.map((round, idx) => {
          const { r, g, b } = round.picked;
          const score = Math.round(calculateScore(round.picked, round.target));
          console.log(calculateScore(round.picked, round.target));
          console.log(roundColors[idx]);

          return (
            <li key={idx} className="round-group">
              {/* <h4>Round {idx + 1}</h4> */}
              <h4>{roundColorNames[idx]}</h4>
              {/* <h3>{roundColors}</h3> */}
              {/* <div
                className="target"
                style={{ backgroundColor: `rgb(${rp},${gp},${bp})` }}
              ></div> */}
              <TargetColor gameMode={gameMode} colors={roundColors[idx]} />
              <div
                className="picked"
                style={{ backgroundColor: `rgb(${r},${g},${b})` }}
              ></div>

              <h4>{score} %</h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function TargetColor({ colors, gameMode }) {
  console.log(colors);
  const targetColor = tinycolor.fromRatio(colors.targetColor).toHexString();

  switch (gameMode) {
    case 'Hue':
    case 'SatLum':
    case 'HSL':
      return (
        <div className="targets targets-1">
          <div
            className="target"
            style={{ backgroundColor: targetColor }}
          ></div>
        </div>
      );
    case 'CompHue':
    case 'CompSL':
    case 'CompHSL':
      return (
        <div className="targets targets-2">
          <div
            className="target"
            style={{ backgroundColor: targetColor }}
          ></div>
          <div className="target-group">
            <div
              className="target"
              style={{ backgroundColor: colors.complement }}
            ></div>
          </div>
        </div>
      );
    case 'TriadHue':
    case 'TriadSL':
    case 'TriadHSL':
      return (
        <div className="targets targets-3">
          <div
            className="target"
            style={{ backgroundColor: targetColor }}
          ></div>

          <div className="target-group">
            {colors.triad.map((col, idx) => {
              return (
                <div
                  className="target"
                  key={idx}
                  style={{ backgroundColor: col }}
                ></div>
              );
            })}
          </div>
        </div>
      );
    case 'TetradHue':
    case 'TetradSL':
    case 'TetradHSL':
      return (
        <div className="targets targets-4">
          <div
            className="target"
            style={{ backgroundColor: targetColor }}
          ></div>
          <div className="target-group">
            {colors.tetrad.map((col, idx) => {
              return (
                <div
                  className="target"
                  key={idx}
                  style={{ backgroundColor: col }}
                ></div>
              );
            })}
          </div>
        </div>
      );
    default:
      return (
        <div>
          <div className="targets">
            <div
              className="target"
              style={{ backgroundColor: targetColor }}
            ></div>
          </div>
        </div>
      );
  }
}
