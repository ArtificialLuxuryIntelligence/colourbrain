import React, { useRef, useState } from 'react';

export default function AnimatedCounter({ value = 0, symbol = '%' }) {
  const interval = useRef(null);
  const [display, setDisplay] = useState(0);

  interval.current = setInterval(() => {
    setDisplay((val) => {
      if (val >= value) {
        clearInterval(interval.current);
        return value;
      }
      return val + 1;
    });
  }, 100);

  return (
    <span>
      {display}
      {symbol}
    </span>
  );
}
