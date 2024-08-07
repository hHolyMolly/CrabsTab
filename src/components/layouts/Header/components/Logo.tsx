import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import paths from '@configs/Router/paths';

const Logo: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Link className="mr-[24px] font-medium text-[32px]" style={{ pointerEvents: pathname === paths.Home ? 'none' : 'auto' }} to={paths.Home}>
      <span className="text-orange-300">Flower</span> Shop
    </Link>
  );
};

export default Logo;
