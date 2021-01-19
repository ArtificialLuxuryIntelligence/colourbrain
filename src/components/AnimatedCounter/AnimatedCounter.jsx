import React, { useRef, useState, useEffect } from 'react';

export default function AnimatedCounter({ value = 0, symbol = '%' }) {
  const interval = useRef(null);

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    interval.current && clearInterval(interval.current);

    interval.current = setInterval(() => {
      setDisplay((val) => {
        if (val >= value) {
          clearInterval(interval.current);
          return value;
        }
        return val + 1;
      });
    }, 20);
    return () => clearInterval(interval.current);
  }, [value]);

  return (
    <span>
      {display}
      {symbol}
    </span>
  );
}
// }
