import React from 'react';
import './NewGameButtons.scss';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';

export default function NewGameButtons({
  handleSelectMode,
  handleToggleUserPrefPreview,
  userPreferencePreview,
}) {
  return (
    <div className="new-game-buttons">
      <h2>Memory</h2>
      <Button
        dataKey="gameMode"
        label="H"
        data="Hue"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gameMode"
        label="SL"
        data="SatLum"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gameMode"
        data="HSL"
        label="HSL"
        handleClick={handleSelectMode}
      />
      <h2>Complement</h2>
      <Button
        dataKey="gameMode"
        data="CompHue"
        label="H"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gameMode"
        data="CompSL"
        label="SL"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gameMode"
        data="CompHSL"
        label="HSL"
        handleClick={handleSelectMode}
      />

      <h2>Split-complement</h2>
      <Button
        dataKey="gameMode"
        data="SCompHue"
        label="H"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gameMode"
        data="SCompSL"
        label="SL"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gameMode"
        data="SCompHSL"
        label="HSL"
        handleClick={handleSelectMode}
      />

      <h2>Triad</h2>
      <Button
        dataKey="gameMode"
        data="TriadHue"
        label="H"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gameMode"
        data="TriadSL"
        label="SL"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gameMode"
        data="TriadHSL"
        label="HSL"
        handleClick={handleSelectMode}
      />

      <h2>Tetrad</h2>
      <Button
        dataKey="gameMode"
        data="TetradHue"
        label="H"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gameMode"
        data="TetradSL"
        label="SL"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gameMode"
        data="TetradHSL"
        label="HSL"
        handleClick={handleSelectMode}
      />

      {/* custom game with checkbox to choose which modes to include */}
      <Checkbox
        label={'Colour preview *'}
        handleChange={handleToggleUserPrefPreview}
        checked={userPreferencePreview}
      />
    </div>
  );
}
