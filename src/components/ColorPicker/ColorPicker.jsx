import React, { useState, useEffect } from 'react';
import './ColorPicker.scss';

import { RgbColorPicker, HslColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import Button from './../Button/Button';

export default function ColorPicker({
  pickedColor,
  setPickedColor,
  handlePickColor,
  gameMode,
  roundColors,
}) {
  const { targetColor, complement, triad, tetrad } = roundColors;
  const { r, g, b, a } = pickedColor;
  const { r: rt, g: gt, b: bt } = targetColor;

  return (
    <div
      className={`color-picker gameMode-${gameMode}`}
      style={{ backgroundColor: `rgb(${r},${g},${b})` }}
    >
      {(gameMode === 'CompHue' ||
        gameMode === 'CompSL' ||
        gameMode === 'CompHSL') && (
        <div
          className="complement-color"
          style={{ backgroundColor: `${complement}` }}
        ></div>
      )}
      {(gameMode === 'TriadHue' ||
        gameMode === 'TriadSL' ||
        gameMode === 'TriadHSL') &&
        triad.map((triad) => (
          <div
            className="triad-color"
            style={{ backgroundColor: `${triad}` }}
          ></div>
        ))}
      {(gameMode === 'TetradHue' ||
        gameMode === 'TetradSL' ||
        gameMode === 'TetradHSL') &&
        tetrad.map((tetra) => (
          <div
            className="tetra-color"
            style={{ backgroundColor: `${tetra}` }}
          ></div>
        ))}

      <RgbColorPicker color={pickedColor} onChange={setPickedColor} />
      {/* <HslColorPicker color={pickedColor} onChange={setPickedColor} /> */}

      <Button handleClick={handlePickColor} label="Pick" />
    </div>
  );
}

// const colorCombos = (color) => {
//   const complement = tinycolor(color).complement().toRgbString();
//   let triad = tinycolor(color)
//     .triad()
//     .map((c) => c.toRgbString());
//   let tetrad = tinycolor(color)
//     .tetrad()
//     .map((c) => c.toRgbString());

//   //remove original colors
//   triad.unshift();
//   tetrad.unshift();
//   return { complement, triad, tetrad };
// };
