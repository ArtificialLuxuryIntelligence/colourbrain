import React from 'react';

export default function Checkbox({ label, handleClick, checked }) {
  return (
    <>
      <label>
        {label}
        <input type="checkbox" onClick={handleClick} checked={checked} />
      </label>{' '}
    </>
  );
}
