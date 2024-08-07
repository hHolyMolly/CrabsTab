import React from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

import { type TypeStatus } from 'interfaces/status.types';

import { LoadingIcon } from '@components/icons';

type TypeVariant = 'orange' | 'orange-outline';

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  variant?: TypeVariant;
  size?: 'little' | 'medium';
  type?: HTMLButtonElement['type'];
  disabled?: HTMLButtonElement['disabled'];
  status?: TypeStatus;
  before?: React.ReactNode;
  after?: React.ReactNode;
};

const loadingIconColors: Record<TypeVariant, string> = {
  orange: 'var(--white)',
  'orange-outline': 'var(--orange-300)',
};

const Button: React.FC<Props> = ({
  children,
  className,
  style,
  onClick,
  variant = 'orange',
  size = 'little',
  type = 'button',
  disabled = false,
  status = 'loaded',
  before,
  after,
}) => {
  const onClickButton = React.useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  return (
    <button
      className={classNames(
        styles.Button,

        className,

        size === 'little' && styles.ButtonLittle,
        size === 'medium' && styles.ButtonMedium,

        variant === 'orange' && styles.ButtonOrange,
        variant === 'orange-outline' && styles.ButtonOrangeOutline
      )}
      style={style}
      onClick={onClickButton}
      type={type}
      disabled={disabled || status === 'error' || status === 'loading'}
    >
      {before && <i className={styles.ButtonBefore}>{before}</i>}

      {status !== 'loading' ? children : <LoadingIcon color={loadingIconColors[variant]} />}

      {after && <i className={styles.ButtonAfter}>{after}</i>}
    </button>
  );
};

export default React.memo(Button);
