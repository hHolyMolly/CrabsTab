import React from 'react';
import { Link } from 'react-router-dom';

import paths from '@configs/Router/paths';

const User: React.FC = () => {
  return (
    <Link className="header-actions-item" to={paths.Login}>
      <svg width="26" height="29" viewBox="0 0 26 29" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.629 14.5C16.6151 14.5 19.8456 11.2539 19.8456 7.25C19.8456 3.24607 16.6151 0 12.629 0C8.64299 0 5.41244 3.24607 5.41244 7.25C5.41244 11.2539 8.64299 14.5 12.629 14.5ZM15.4875 17.2188H9.77059C4.37562 17.2188 0 21.6141 0 27.0346C0 28.1187 0.875012 28.9983 1.95412 28.9983H23.3051C24.3842 29 25.2581 28.1221 25.2581 27.0346C25.2581 21.6141 20.883 17.2188 15.4875 17.2188Z" />
      </svg>
    </Link>
  );
};

export default User;
