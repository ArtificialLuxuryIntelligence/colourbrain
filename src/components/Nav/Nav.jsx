import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

export default function Nav() {
  const [navActive, setNavActive] = useState(false);

  const handleToggleNav = (e) => {
    setNavActive(!navActive);
  };
  return (
    <nav className={navActive ? 'nav-active' : ''}>
      <span onClick={handleToggleNav} className="nav-toggle">
        🎨
      </span>
      <ul>
        <li>
          <Link to="/">Play</Link>
        </li>
        <li>
          <Link to="/FAQ">FAQ</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
}