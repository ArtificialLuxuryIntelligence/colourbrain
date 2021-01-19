import React from 'react';
import { gameModeMap } from './../../tools/gameModeMaps';
import './Highscores.scss';

export default function Highscores({ highscores }) {
  return (
    <div className="highscores">
      <h2>My highscores</h2>
      <table>
        <tr>
          <th>Game Mode</th>
          <th>Score</th>
        </tr>
        {Object.entries(highscores).map((s) => {
          let readableGameMode = gameModeMap[s[0]];
          let score = s[1];

          return (
            <tr>
              <td>{readableGameMode}</td>
              <td>{score}%</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
