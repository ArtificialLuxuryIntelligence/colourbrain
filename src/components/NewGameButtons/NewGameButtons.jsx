import React, { useState } from 'react';
import Collapsible from 'react-collapsible';

import './NewGameButtons.scss';
import Button from '../Button/Button';
import SVGButton from '../SVGButton/SVGButton';
import Checkbox from '../Checkbox/Checkbox';

import { ReactComponent as Wheel } from './../../assets/Group_3.svg';
import { ReactComponent as ArrowToggle } from './../../assets/arrowToggle.svg';
import { ReactComponent as Ax1 } from './../../assets/ax-1.svg';
import { ReactComponent as Ax2 } from './../../assets/ax-2.svg';
import { ReactComponent as Ax3 } from './../../assets/ax-3.svg';

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
            lazyRender={true}
            trigger={
              <h2>
                <Wheel />
                Memory <ArrowToggle />
              </h2>
            }
            // open={true}
          >
            <div className="memory">
              <h3>
                <Wheel />
                Memory
              </h3>
              <div className="btn-cont">
                <SVGButton
                  dataKey="gamemode"
                  label="Hue"
                  Icon={Ax1}
                  data="Hue"
                  handleClick={handleSelectMode}
                />
                <SVGButton
                  dataKey="gamemode"
                  label={'Saturation Luminance'}
                  Icon={Ax2}
                  data="SatLum"
                  handleClick={handleSelectMode}
                />
                <SVGButton
                  dataKey="gamemode"
                  data="HSL"
                  label={'Hue Saturation Luminance'}
                  Icon={Ax3}
                  handleClick={handleSelectMode}
                />
              </div>
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
              <div className="btn-cont">
                <SVGButton
                  dataKey="gamemode"
                  data="CompHue"
                  label="Hue"
                  Icon={Ax1}
                  handleClick={handleSelectMode}
                />
                <SVGButton
                  dataKey="gamemode"
                  data="CompSL"
                  label={'Saturation Luminance'}
                  Icon={Ax2}
                  handleClick={handleSelectMode}
                />
                <SVGButton
                  dataKey="gamemode"
                  data="CompHSL"
                  label={'Hue Saturation Luminance'}
                  Icon={Ax3}
                  handleClick={handleSelectMode}
                />
              </div>
            </div>

            <div className="split-complement">
              <h3>
                <Wheel />
                <span>Split-Complement</span>
              </h3>
              <div className="btn-cont">
                <SVGButton
                  dataKey="gamemode"
                  data="SCompHue"
                  label="Hue"
                  Icon={Ax1}
                  handleClick={handleSelectMode}
                />
                <SVGButton
                  dataKey="gamemode"
                  data="SCompSL"
                  label={'Saturation Luminance'}
                  Icon={Ax2}
                  handleClick={handleSelectMode}
                />
                <SVGButton
                  dataKey="gamemode"
                  data="SCompHSL"
                  label={'Hue Saturation Luminance'}
                  Icon={Ax3}
                  handleClick={handleSelectMode}
                />
              </div>
            </div>

            <div className="triad">
              <h3>
                <Wheel />
                <span>Triad</span>
              </h3>
              <div className="btn-cont">
                <SVGButton
                  dataKey="gamemode"
                  data="TriadHue"
                  label="Hue"
                  Icon={Ax1}
                  handleClick={handleSelectMode}
                />
                <SVGButton
                  dataKey="gamemode"
                  data="TriadSL"
                  label={'Saturation Luminance'}
                  Icon={Ax2}
                  handleClick={handleSelectMode}
                />
                <SVGButton
                  dataKey="gamemode"
                  data="TriadHSL"
                  label={'Hue Saturation Luminance'}
                  Icon={Ax3}
                  handleClick={handleSelectMode}
                />
              </div>
            </div>

            <div className="tetrad">
              <h3>
                <Wheel />
                <span>Tetrad</span>
              </h3>
              <div className="btn-cont">
                <SVGButton
                  dataKey="gamemode"
                  data="TetradHue"
                  label="Hue"
                  Icon={Ax1}
                  handleClick={handleSelectMode}
                />

                <SVGButton
                  dataKey="gamemode"
                  data="TetradSL"
                  label={'Saturation Luminance'}
                  Icon={Ax2}
                  handleClick={handleSelectMode}
                />
                <SVGButton
                  dataKey="gamemode"
                  data="TetradHSL"
                  label={'Hue Saturation Luminance'}
                  Icon={Ax3}
                  handleClick={handleSelectMode}
                />
              </div>
            </div>
          </Collapsible>
        </li>
        <li>
          <Collapsible
            triggerClassName="collapsible-shade"
            triggerOpenedClassName="collapsible-shade"
            lazyRender={true}
            trigger={
              <h2>
                <Wheel />
                Shade <ArrowToggle />
              </h2>
            }
            // open={true}
          >
            <div className="shade">
              <h3>
                <Wheel />
                Colour - Grey
              </h3>
              <div className="btn-cont">
                <SVGButton
                  dataKey="gamemode"
                  label="Luminance"
                  Icon={Ax1}
                  data="GSLum"
                  handleClick={handleSelectMode}
                />
                {/* <SVGButton
                  dataKey="gamemode"
                  label={'Luminance'}
                  Icon={Ax2}
                  data="GSLumReverse"
                  handleClick={handleSelectMode}
                /> */}
                {/* <SVGButton
                  dataKey="gamemode"
                  data="HSL"
                  label={'Hue Saturation Luminance'}
                  Icon={Ax3}
                  handleClick={handleSelectMode}
                /> */}
              </div>
            </div>

            <div className="shade">
              <h3>
                <Wheel />
                Grey - Colour
              </h3>
              <div className="btn-cont">
                <SVGButton
                  dataKey="gamemode"
                  label="Luminance"
                  Icon={Ax1}
                  data="GSLumReverse"
                  handleClick={handleSelectMode}
                />
                {/* <SVGButton
                  dataKey="gamemode"
                  label={'Saturation Luminance'}
                  Icon={Ax2}
                  data="SatLum"
                  handleClick={handleSelectMode}
                /> */}
                {/* <SVGButton
                  dataKey="gamemode"
                  data="HSL"
                  label={'Hue Saturation Luminance'}
                  Icon={Ax3}
                  handleClick={handleSelectMode}
                /> */}
              </div>
            </div>
          </Collapsible>
        </li>
      </ul>

      {/* custom game with checkbox to choose which modes to include */}
      <div className="user-options">
        <h4>Stuck? </h4>
        <Checkbox
          label={'Colour preview '}
          handleChange={handleToggleUserPrefPreview}
          checked={userPreferencePreview}
        />
        <div>
          <small>
            Lets you preview the colour. (Score don't contribute to highscores.
            Doesn't apply to memory games).
          </small>
        </div>
      </div>
    </div>
  );
}
