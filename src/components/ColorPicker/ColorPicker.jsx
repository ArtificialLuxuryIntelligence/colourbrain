import './ColorPicker.scss';

import { RgbColorPicker, HslColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import Button from './../Button/Button';

export default function ColorPicker({
  pickedColor,
  setPickedColor,
  handlePickColor,
  gameMode,
  roundColors,
}) {
  const { complement, splitComplement, triad, tetrad } = roundColors;
  const { r, g, b } = pickedColor;

  return (
    <div
      className={`color-picker gameMode-${gameMode}`}
      style={{ backgroundColor: `rgb(${r},${g},${b})` }}
    >
      <div className="reference-colors">
        {(gameMode === 'CompHue' ||
          gameMode === 'CompSL' ||
          gameMode === 'CompHSL') && (
          <div
            key={complement}
            className="complement-color"
            style={{ backgroundColor: `${complement}` }}
          ></div>
        )}

        {(gameMode === 'SCompHue' ||
          gameMode === 'SCompSL' ||
          gameMode === 'SCompHSL') &&
          splitComplement.map((sComp) => (
            <div
              key={triad}
              className="split-complement-color"
              style={{ backgroundColor: `${sComp}` }}
            ></div>
          ))}

        {(gameMode === 'TriadHue' ||
          gameMode === 'TriadSL' ||
          gameMode === 'TriadHSL') &&
          triad.map((triad) => (
            <div
              key={triad}
              className="triad-color"
              style={{ backgroundColor: `${triad}` }}
            ></div>
          ))}
        {(gameMode === 'TetradHue' ||
          gameMode === 'TetradSL' ||
          gameMode === 'TetradHSL') &&
          tetrad.map((tetra) => (
            <div
              key={tetra}
              className="tetra-color"
              style={{ backgroundColor: `${tetra}` }}
            ></div>
          ))}
      </div>

      <RgbColorPicker color={pickedColor} onChange={setPickedColor} />
      {/* <HslColorPicker color={pickedColor} onChange={setPickedColor} /> */}

      <Button handleClick={handlePickColor} label="Pick" />
    </div>
  );
}

// const colorCombos = (color) => {
//   const complement = tinycolor(color).complement().toRgbString();
//   let triad = tinycolor(color)
//     .triad()
//     .map((c) => c.toRgbString());
//   let tetrad = tinycolor(color)
//     .tetrad()
//     .map((c) => c.toRgbString());

//   //remove original colors
//   triad.unshift();
//   tetrad.unshift();
//   return { complement, triad, tetrad };
// };
