import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import paths from '@configs/Router/paths';

function MainLayout() {
  const { pathname } = useLocation();

  const isNavigation = React.useMemo(() => {
    const pagesWithoutNav = [paths.Login, paths.Register] as string[];

    return !pagesWithoutNav.includes(pathname);
  }, [pathname]);

  return (
    <div className="min-h-full flex flex-col flex-auto">
      {isNavigation && <Header />}

      <main className="flex flex-col flex-auto">
        <Outlet />
      </main>

      {isNavigation && <Footer />}

      <Toaster />
    </div>
  );
}

export default MainLayout;
