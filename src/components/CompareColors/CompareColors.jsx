import React, { useEffect, useState } from 'react';
import tinycolor from 'tinycolor2';
import { calculateScore } from './../../tools/scoring';
import './CompareColors.scss';
import Button from './../Button/Button';
import AnimatedCounter from './../AnimatedCounter/AnimatedCounter';

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
  const score = Math.ceil(calculateScore(targetColor, pickedColor));

  const [circleColor, setCircleColor] = useState(pickedCString);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCircleColor(targetCString);
    }, 0);
    return () => clearTimeout(timer);
  });

  return (
    <div className="compare-colors">
      {/* <h4>{score}%</h4> */}
      <h4>
        <AnimatedCounter value={score} />
      </h4>

      <div className="round-group">
        <div className="target" style={{ backgroundColor: circleColor }}></div>

        <div
          className="picked"
          style={{ backgroundColor: `${pickedCString}` }}
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
