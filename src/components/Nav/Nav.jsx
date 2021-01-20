import { Link } from 'react-router-dom';
import './Nav.scss';

export default function Nav({ navActive, setNavActive }) {
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
          <Link onClick={handleToggleNav} to="/play">
            Play
          </Link>
        </li>
        <li>
          <Link onClick={handleToggleNav} to="/FAQ">
            FAQ
          </Link>
        </li>
        <li>
          <Link onClick={handleToggleNav} to="/about">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}
