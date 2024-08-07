import React from 'react';

import paths from '@configs/Router/paths';

import MenuItem from './MenuItem';

function Menu() {
  return (
    <nav className="mr-[24px]">
      <ul className="gap-x-[24px] gap-y-[4px] flex items-center flex-wrap">
        <MenuItem title="Home" to={paths.Home} />

        <MenuItem title="Shop" to={paths.Shop} />

        <MenuItem title="Blog" to={paths.Blog} />

        <MenuItem title="About" to={paths.About} />
      </ul>
    </nav>
  );
}

export default Menu;
