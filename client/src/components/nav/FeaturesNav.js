import React from 'react';
import { Link } from 'react-router-dom';

const FeaturesNav = () => (
  <nav className="mt-3">
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/features/admin" className="nav-link">Admin Features</Link>
      </li>

      <li className="nav-item">
        <Link to="/features/user" className="nav-link">User Features</Link>
      </li>
    </ul>
  </nav>
);

export default FeaturesNav;