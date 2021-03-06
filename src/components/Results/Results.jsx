import React, { useEffect } from 'react';
import tinycolor from 'tinycolor2';
import { calculateTotalScore, calculateScore } from './../../tools/scoring';
import AnimatedCounter from './../AnimatedCounter/AnimatedCounter';

import { gamemodeMap } from './../../tools/gameModeMaps';
import './Results.scss';

import Button from '../Button/Button';

export default function Results({
  results,
  gamemode,
  roundColorNames,
  roundColors,
  handleRestartGame,
  handleBackToStart,
  handleUpdateHighscores,
}) {
  const readablegamemode = gamemodeMap[gamemode];
  const totalScore = calculateTotalScore(results);
  useEffect(() => {
    handleUpdateHighscores(totalScore);
  }, [handleUpdateHighscores, results, totalScore]);

  return (
    <div className="results">
      <h3>{readablegamemode}</h3>
      <h3>
        <span>Score : </span>
        <AnimatedCounter value={totalScore} />
      </h3>

      <ul>
        {results.map((round, idx) => {
          const { r, g, b } = round.picked;

          const score = Math.ceil(calculateScore(round.picked, round.target));
          // console.log(calculateScore(round.picked, round.target));
          // console.log(roundColors[idx]);

          return (
            <li key={idx} className="round-group">
              {/* <h4>Round {idx + 1}</h4> */}
              <h4 className="color-name">{roundColorNames[idx]}</h4>

              <TargetColor gamemode={gamemode} colors={roundColors[idx]} />
              <div
                className="picked"
                style={{ backgroundColor: `rgb(${r},${g},${b})` }}
                // style={{
                //   background: `radial-gradient(rgb(${r},${g},${b}) 0%, rgb(${r},${g},${b}) 80%,rgb(${rt},${gt},${bt}) 100%)`,
                // }}
              ></div>

              <h4 className="percent">{score} %</h4>
            </li>
          );
        })}
      </ul>

      <Button label="Restart" handleClick={handleRestartGame} />
      <Button label="Home" handleClick={handleBackToStart} />
    </div>
  );
}

function TargetColor({ colors, gamemode }) {
  // console.log(colors);
  const targetColor = tinycolor.fromRatio(colors.targetColor).toHexString();

  switch (gamemode) {
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
    case 'SCompHue':
    case 'SCompSL':
    case 'SCompHSL':
      return (
        <div className="targets targets-3">
          <div
            className="target"
            style={{ backgroundColor: targetColor }}
          ></div>

          <div className="target-group">
            {colors.splitComplement.map((col, idx) => {
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
