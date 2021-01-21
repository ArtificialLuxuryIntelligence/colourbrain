// import React, { useState } from 'react';
// // import Button from '../Button/Button';

// export default function SVGButton(label, dataKey, data, handleClick, Icon) {
//   //   const [isHover, setIsHover] = useState(false);
//   //   return (
//   //     <span className="svg-btn-wrapper">
//   //       <span> {label}</span>
//   //       <button
//   //         className={'button svg-button'}
//   //         onClick={handleClick}
//   //         value={label}
//   //         {...{ ['data-' + dataKey]: data }}
//   //       >
//   //         <Icon />
//   //         {label}
//   //       </button>
//   //     </span>
//   //   );

//   return (
//     <button
//       className={Icon ? 'button svg-button' : 'button'}
//       onClick={handleClick}
//       value={label}
//       {...{ ['data-' + dataKey]: data }}
//     >
//       {Icon ? <Icon /> : null}
//       {label}
//     </button>
//   );
// }

import React from 'react';
import './SVGButton.scss';

export default function SVGButton({ label, dataKey, data, handleClick, Icon }) {
  return (
    <span className="svg-btn-wrapper">
      <span> {label}</span>
      <button
        className="button svg-button"
        onClick={handleClick}
        value={label}
        {...{ ['data-' + dataKey]: data }}
      >
        <Icon />
      </button>
    </span>
  );
}
