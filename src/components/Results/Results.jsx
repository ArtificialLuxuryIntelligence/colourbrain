import React, { useEffect } from 'react';
import './Results.scss';
import deltaE from './../../tools/deltaE';
import colorDifference from './../../tools/colorDifference';

import Button from '../Button/Button';

export default function Results({
  results,
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
      <h3>Score : {totalScore} %</h3>
      <Button label="Restart" handleClick={handleRestartGame} />
      <Button label="Home" handleClick={handleBackToStart} />

      <ul>
        {results.map((round, idx) => {
          const { r, g, b, a } = round.picked;
          const { r: rp, g: gp, b: bp, a: ap } = round.target;
          const score = Math.round(calculateScore(round.picked, round.target));

          return (
            <li key={idx} className="round-group">
              <h4>Round {idx + 1}</h4>
              <div
                className="picked"
                style={{ backgroundColor: `rgb(${r},${g},${b})` }}
              ></div>
              <div
                className="target"
                style={{ backgroundColor: `rgb(${rp},${gp},${bp})` }}
              ></div>
              <h4>{score} %</h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const calculateScore = (c1, c2) => {
  let diff = colorDifference(c1, c2); // 0 (same) - 100 (opposite)
  let temp = 100 - diff * 2;
  let score = temp >= 0 ? temp :0
  return score
};
const calculateTotalScore = (results) => {
  let total = results.reduce((acc, round) => {
    let score = calculateScore(round.picked, round.target);
    return score + acc;
  }, 0);

  return Math.round(total / results.length);
};
