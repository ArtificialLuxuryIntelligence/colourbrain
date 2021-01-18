import React from 'react';
import './RoundColor.scss';

export default function RoundColor({ color }) {
  let { r, g, b, a } = color;

  return (
    <div
      className="round-color"
      style={{ backgroundColor: `rgb(${r},${g},${b})` }}
    ></div>
  );
}
