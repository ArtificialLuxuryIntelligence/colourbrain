import React, { useState } from 'react';

export default function Dropdown({ options }) {
  const [state, setState] = useState('ok');
  return (
    <select value={state}>
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
