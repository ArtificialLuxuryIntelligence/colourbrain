import React, { Children, useState } from 'react';
import './ColorPicker.scss';

import { RgbColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import Button from './../Button/Button';

export default function ColorPicker({
  pickedColor,
  setPickedColor,
  handlePickColor,
}) {
  const { r, g, b, a } = pickedColor;

  return (
    <div
      className="color-picker"
      style={{ backgroundColor: `rgb(${r},${g},${b})` }}
    >
      <RgbColorPicker color={pickedColor} onChange={setPickedColor} />
      <Button handleClick={handlePickColor} label="Pick" />
    </div>
  );
}
