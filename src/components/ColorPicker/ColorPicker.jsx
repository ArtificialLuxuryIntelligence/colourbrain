import './ColorPicker.scss';

import { RgbColorPicker } from 'react-colorful';
import 'react-colorful/dist/index.css';
import Button from './../Button/Button';
import GridPicker from './../GridPicker/GridPicker';

export default function ColorPicker({
  pickedColor,
  setPickedColor,
  handlePickColor,
  gamemode,
  roundColors,
  gridColors,
  gridColorsReverse,
}) {
  const {
    color,
    complement,
    grayscale,
    splitComplement,
    triad,
    tetrad,
  } = roundColors;
  const { r, g, b } = pickedColor;
  // console.log('color', color);

  function renderPickerSwitch(gamemode) {
    switch (gamemode) {
      case 'GSLum':
        return (
          <div className="grid-picker-container">
            <GridPicker
              color={pickedColor}
              onChange={setPickedColor}
              gridColors={gridColors}
            />

            <Button handleClick={handlePickColor} label="Pick" />
          </div>
        );
      case 'GSLumReverse':
        return (
          <div className="grid-picker-container">
            <GridPicker
              color={pickedColor}
              onChange={setPickedColor}
              gridColors={gridColorsReverse}
            />

            <Button handleClick={handlePickColor} label="Pick" />
          </div>
        );

      default:
        return (
          <>
            <RgbColorPicker color={pickedColor} onChange={setPickedColor} />

            <Button handleClick={handlePickColor} label="Pick" />
          </>
        );
    }
  }

  return (
    <div
      key={'picker'}
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

        {gamemode === 'GSLumReverse' && (
          <div
            key={grayscale}
            className="grayscale-color"
            style={{ backgroundColor: `${color}` }}
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

      {renderPickerSwitch(gamemode)}
    </div>
  );
}
