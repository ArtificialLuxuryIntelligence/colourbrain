import React from 'react';

export default function Checkbox({ label, handleChange, checked }) {
  return (
    <>
      <label style={{ display: 'block' }}>
        {label}
        <input type="checkbox" onChange={handleChange} checked={checked} />
      </label>{' '}
    </>
  );
}
