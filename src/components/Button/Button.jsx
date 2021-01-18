import React from 'react';
import './Button.scss';

export default function Button({ label, handleClick }) {
  return (
    <button className="button" onClick={handleClick}>
      {label}
    </button>
  );
}
