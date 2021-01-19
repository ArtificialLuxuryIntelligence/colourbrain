import React from 'react';
import './Button.scss';

export default function Button({ label, dataKey, data, handleClick }) {
  return (
    <button
      className="button"
      onClick={handleClick}
      value={label}
      {...{ ['data-' + dataKey]: data }}
    >
      {label}
    </button>
  );
}
