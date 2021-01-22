import './ColorPicker.scss';

import { RgbColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import Button from './../Button/Button';

export default function ColorPicker({
  pickedColor,
  setPickedColor,
  handlePickColor,
  gamemode,
  roundColors,
}) {
  const { complement, grayscale, splitComplement, triad, tetrad } = roundColors;
  const { r, g, b } = pickedColor;
  console.log(gamemode);

  return (
    <div
      className={`color-picker gamemode-${gamemode}`}
      style={{ backgroundColor: `rgb(${r},${g},${b})` }}
    >
      <div className="reference-colors">
        {gamemode === 'GSLum' && (
          <div
            key={grayscale}
            className="grayscale-color"
            style={{ backgroundColor: `${grayscale}` }}
          ></div>
        )}

        {(gamemode === 'CompHue' ||
          gamemode === 'CompSL' ||
          gamemode === 'CompHSL') && (
          <div
            key={complement}
            className="complement-color"
            style={{ backgroundColor: `${complement}` }}
          ></div>
        )}

        {(gamemode === 'SCompHue' ||
          gamemode === 'SCompSL' ||
          gamemode === 'SCompHSL') &&
          splitComplement.map((sComp) => (
            <div
              key={sComp}
              className="split-complement-color"
              style={{ backgroundColor: `${sComp}` }}
            ></div>
          ))}

        {(gamemode === 'TriadHue' ||
          gamemode === 'TriadSL' ||
          gamemode === 'TriadHSL') &&
          triad.map((triad) => (
            <div
              key={triad}
              className="triad-color"
              style={{ backgroundColor: `${triad}` }}
            ></div>
          ))}
        {(gamemode === 'TetradHue' ||
          gamemode === 'TetradSL' ||
          gamemode === 'TetradHSL') &&
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
