import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

type Props<T = string> = {
  className?: T;
  children: T;
  to: T;
};

const TextLink: React.FC<Props> = ({ className, children, to }) => {
  return (
    <Link className={classNames('text-orange-300 hover:underline', className)} to={to}>
      {children}
    </Link>
  );
};

export default React.memo(TextLink);
