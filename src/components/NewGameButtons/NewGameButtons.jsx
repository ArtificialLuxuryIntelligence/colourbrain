import React, { useState } from 'react';
import Collapsible from 'react-collapsible';

import './NewGameButtons.scss';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';

import { ReactComponent as Wheel } from './../../assets/Group_3.svg';
import { ReactComponent as ArrowToggle } from './../../assets/arrowToggle.svg';

export default function NewGameButtons({
  handleSelectMode,
  handleToggleUserPrefPreview,
  userPreferencePreview,
}) {
  return (
    <div className="new-game-buttons">
      <ul>
        <li>
          <Collapsible
            triggerClassName="collapsible-memory"
            triggerOpenedClassName="collapsible-memory"
            trigger={
              <h2>
                <Wheel />
                Memory <ArrowToggle />
              </h2>
            }
            open={true}
          >
            <div className="memory">
              <h3>Memory</h3>
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
            </div>
          </Collapsible>
        </li>
        <li>
          <Collapsible
            triggerClassName="collapsible-harmonies"
            triggerOpenedClassName="collapsible-harmonies"
            trigger={
              <h2>
                <Wheel />
                Harmony <ArrowToggle />
              </h2>
            }
            lazyRender={true}
          >
            <div className="complement">
              <h3>
                <Wheel />
                <span>Complement</span>
              </h3>
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
            </div>

            <div className="split-complement">
              <h3>
                <Wheel />
                <span>Split-Complement</span>
              </h3>
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
            </div>

            <div className="triad">
              <h3>
                <Wheel />
                <span>Triad</span>
              </h3>
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
            </div>

            <div className="tetrad">
              <h3>
                <Wheel />
                <span>Tetrad</span>
              </h3>
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
            </div>
          </Collapsible>
        </li>
      </ul>

      {/* custom game with checkbox to choose which modes to include */}
      <div className="user-options">
        <Checkbox
          label={'Colour preview *'}
          handleChange={handleToggleUserPrefPreview}
          checked={userPreferencePreview}
        />
        <div>
          <small>
            * Stuck? Lets you preview the colour. (Score don't contribute to
            highscores. Doesn't apply to memory games).
          </small>
        </div>
      </div>
    </div>
  );
}
