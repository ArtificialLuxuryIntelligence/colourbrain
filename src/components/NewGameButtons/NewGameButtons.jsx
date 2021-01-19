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
        dataKey="gamemode"
        label="H"
        data="Hue"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gamemode"
        label="SL"
        data="SatLum"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gamemode"
        data="HSL"
        label="HSL"
        handleClick={handleSelectMode}
      />
      <h2>Complement</h2>
      <Button
        dataKey="gamemode"
        data="CompHue"
        label="H"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gamemode"
        data="CompSL"
        label="SL"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gamemode"
        data="CompHSL"
        label="HSL"
        handleClick={handleSelectMode}
      />

      <h2>Split-Complement</h2>
      <Button
        dataKey="gamemode"
        data="SCompHue"
        label="H"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gamemode"
        data="SCompSL"
        label="SL"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gamemode"
        data="SCompHSL"
        label="HSL"
        handleClick={handleSelectMode}
      />

      <h2>Triad</h2>
      <Button
        dataKey="gamemode"
        data="TriadHue"
        label="H"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gamemode"
        data="TriadSL"
        label="SL"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gamemode"
        data="TriadHSL"
        label="HSL"
        handleClick={handleSelectMode}
      />

      <h2>Tetrad</h2>
      <Button
        dataKey="gamemode"
        data="TetradHue"
        label="H"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gamemode"
        data="TetradSL"
        label="SL"
        handleClick={handleSelectMode}
      />
      <Button
        dataKey="gamemode"
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
