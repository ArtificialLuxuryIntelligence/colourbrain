import React from 'react';
import './Results.scss';
import deltaE from './../../tools/deltaE';
import Button from '../Button/Button';

export default function Results({ results, handleRestartGame }) {
  const totalScore = calculateTotalScore(results);

  return (
    <div className="results">
      <h3>Score : {totalScore} %</h3>
      <Button label="Restart" handleClick={handleRestartGame} />

      <ul>
        {results.map((round, idx) => {
          const { r, g, b, a } = round.picked;
          const { r: rp, g: gp, b: bp, a: ap } = round.target;
          const score = colorDifference(round.picked, round.target);
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
              <h4>{100 - Math.round(score)} %</h4>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const colorDifference = (c1, c2) => {
  const { r, g, b, a } = c1;
  const { r: rp, g: gp, b: bp, a: ap } = c2;
  let diff = deltaE([r, g, b], [rp, gp, bp]);
  return diff;
};

const calculateTotalScore = (results) => {
  let score = results.reduce((acc, round) => {
    return colorDifference(round.picked, round.target) + acc;
  }, 0);

  console.log('score', score);
  return Math.round(
    ((100 * results.length - score) / (100 * results.length)) * 100
  );
};
