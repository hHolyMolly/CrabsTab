import React from 'react';

type TypeUseScrollLockReturn<T = (duration?: number) => void> = {
  lockScroll: T;
  unlockScroll: T;
};

function useScrollLock(duration: number = 300): TypeUseScrollLockReturn {
  const body = window.document.body as HTMLBodyElement;

  const lockScroll = React.useCallback(() => {
    const scrollWidth = window.innerWidth - body.offsetWidth;

    setTimeout(() => {
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollWidth}px`;
    }, duration);
  }, []);

  const unlockScroll = React.useCallback(() => {
    setTimeout(() => {
      body.style.overflow = 'auto';
      body.style.paddingRight = '0px';
    }, duration);
  }, []);

  return {
    lockScroll,
    unlockScroll,
  };
}

export default useScrollLock;
