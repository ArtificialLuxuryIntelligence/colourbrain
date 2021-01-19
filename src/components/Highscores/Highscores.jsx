import React from 'react';
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
          return (
            <tr>
              <th>{s[0]}</th>
              <td>{s[1]}%</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
