import React from 'react';
import tinycolor from 'tinycolor2';
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
  
  return (
    <div className="compare-colors">
      <div className="round-group">
        <div
          className="picked"
          style={{ backgroundColor: `${pickedCString}` }}
        ></div>
        <div
          className="target"
          style={{ backgroundColor: `${targetCString}` }}
        ></div>
      </div>
      {round === totalRounds ? (
        <Button handleClick={handleShowResults} label="Results" />
      ) : (
        <Button handleClick={handleNextRound} label="Next" />
      )}
    </div>
  );
}
