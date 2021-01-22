import React from 'react';
import './GridPicker.scss';
import { RgbColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';

export default function GridPicker({ color, onChange, gridColors }) {
  return (
    <div className="picker">
      {/* <RgbColorPicker
        className="picker__control"
        color={color}
        onChange={onChange}
      /> */}
      <div className="picker__swatches">
        {gridColors.map((presetColor) => {
          const { r, g, b } = presetColor;
          return (
            <button
              key={presetColor.r}
              className="picker__swatch"
              style={{ background: `rgb(${r},${g},${b})` }}
              onClick={() => onChange(presetColor)}
            />
          );
        })}
      </div>
    </div>
  );
}
