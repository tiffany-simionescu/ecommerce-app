import React from 'react';
import { Link } from 'react-router-dom';

const UserNav = () => (
  <nav className="mt-3">
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link to="/user/history" className="nav-link">Order History</Link>
      </li>

      <li className="nav-item">
        <Link to="/user/wishlist" className="nav-link">Wishlist</Link>
      </li>

      <li className="nav-item">
        <Link to="/user/password" className="nav-link">Password</Link>
      </li>
    </ul>
  </nav>
);

export default UserNav;