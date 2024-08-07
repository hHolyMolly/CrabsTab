import React from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  title: string;
  to: string;
};

const MenuItem: React.FC<Props> = ({ title, to }) => {
  return (
    <li className="header-nav-item">
      <NavLink className={({ isActive }) => (isActive ? 'is-active' : '')} to={to}>
        {title}
      </NavLink>
    </li>
  );
};

export default React.memo(MenuItem);
