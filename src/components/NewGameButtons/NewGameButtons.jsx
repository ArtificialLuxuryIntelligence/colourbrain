import React from 'react';
import Collapsible from 'react-collapsible';

import './NewGameButtons.scss';
import Button from '../Button/Button';
import Checkbox from '../Checkbox/Checkbox';

import { ReactComponent as Wheel } from './../../assets/Group_3.svg';

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
            trigger="Colour Memory"
          >
            <div className="memory">
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
            </div>
          </Collapsible>
        </li>
        <li>
          <Collapsible
            triggerClassName="collapsible-harmonies"
            triggerOpenedClassName="collapsible-harmonies"
            trigger="Colour Harmonies"
            lazyRender={true}
          >
            <div className="complement">
              <h2>
                <Wheel />
                <span>Complement</span>
              </h2>
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
              <h2>
                <Wheel />
                <span>Split-Complement</span>
              </h2>
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
              <h2>
                <Wheel />
                <span>Triad</span>
              </h2>
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
              <h2>
                <Wheel />
                <span>Tetrad</span>
              </h2>
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
      <div>
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
