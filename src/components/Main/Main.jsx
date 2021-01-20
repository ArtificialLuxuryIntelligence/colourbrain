import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Game from '../Game/Game';
import './Main.scss';

export default function Main() {
  return (
    <div className="main">
      <Game />
    </div>
  );
}
