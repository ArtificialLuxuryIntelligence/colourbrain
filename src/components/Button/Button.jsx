import React from 'react';
import './Button.scss';

export default function Button({ label, dataKey, data, handleClick, Icon }) {
  return (
    <button
      className={Icon ? 'button svg-button' : 'button'}
      onClick={handleClick}
      value={label}
      {...{ ['data-' + dataKey]: data }}
    >
      {Icon ? <Icon /> : null}
      {label}
    </button>
  );
}
