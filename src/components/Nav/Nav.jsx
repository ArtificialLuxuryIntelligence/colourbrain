import { Link } from 'react-router-dom';
import './Nav.scss';

import { ReactComponent as Wheel } from './../../assets/Group_3.svg';

export default function Nav({ navActive, setNavActive }) {
  const handleToggleNav = (e) => {
    setNavActive(!navActive);
  };

  return (
    <nav
      className={navActive ? 'nav-active' : ''}
      onMouseLeave={(e) => setNavActive(false)}
    >
      <span
        onTouchStart={handleToggleNav}
        onMouseEnter={(e) => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
          setNavActive(true);
        }}
        className="nav-toggle"
      >
        <Wheel />
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
