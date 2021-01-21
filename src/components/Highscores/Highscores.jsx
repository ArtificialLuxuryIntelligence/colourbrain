import React from 'react';
import { gamemodeMap } from './../../tools/gameModeMaps';
import './Highscores.scss';

export default function Highscores({ highscores }) {
  return (
    <div className="highscores">
      <table>
        <tbody>
          <tr>
            <th>Game Mode</th>
            <th>Score</th>
          </tr>
          {Object.entries(highscores).map((s, i) => {
            let readablegamemode = gamemodeMap[s[0]];
            let score = s[1];

            return (
              <tr key={i}>
                <td>{readablegamemode}</td>
                <td>{score}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
