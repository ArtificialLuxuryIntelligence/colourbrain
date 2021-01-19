import React from 'react';
import tinycolor from 'tinycolor2';
import { calculateScore } from './../../tools/scoring';
import './CompareColors.scss';
import Button from './../Button/Button';

export default function CompareColors({
  round,
  totalRounds,
  targetColor,
  pickedColor,
  roundColors,
  handleNextRound,
  handleShowResults,
}) {
  const targetCString = tinycolor.fromRatio(targetColor).toRgbString();
  const pickedCString = tinycolor.fromRatio(pickedColor).toRgbString();
  const score = Math.round(calculateScore(targetColor, pickedColor));
  console.log('SCORE', score);

  return (
    <div className="compare-colors">
      <div className="round-group">
        <div
          className="target"
          style={{ backgroundColor: `${targetCString}` }}
        ></div>
        <div
          className="picked"
          style={{ backgroundColor: `${pickedCString}` }}
        ></div>
        <h4>{score}%</h4>
      </div>
      {round === totalRounds ? (
        <Button handleClick={handleShowResults} label="Results" />
      ) : (
        <Button handleClick={handleNextRound} label="Next" />
      )}
    </div>
  );
}
