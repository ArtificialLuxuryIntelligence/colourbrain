import React from 'react';
import "./CompareColors.scss"
import Button from './../Button/Button';

export default function CompareColors({
  round,
  totalRounds,
  targetColor,
  pickedColor,
  handleNextRound,
  handleShowResults,
}) {
  const { r, g, b, a } = targetColor;
  const { r: rp, g: gp, b: bp, a: ap } = pickedColor;

  return (
    <div className="compare-colors">
      <div className="round-group">
        <div
          className="picked"
          style={{ backgroundColor: `rgb(${r},${g},${b})` }}
        ></div>
        <div
          className="target"
          style={{ backgroundColor: `rgb(${rp},${gp},${bp})` }}
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
