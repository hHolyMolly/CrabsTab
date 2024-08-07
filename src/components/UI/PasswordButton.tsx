import React from 'react';

type Props = {
  show: boolean;
  onShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const PasswordButton: React.FC<Props> = ({ show, onShow }) => {
  const onClick = React.useCallback(() => {
    onShow(!show);
  }, [show]);

  return (
    <button
      className="
        w-[40px] h-[40px]
        flex justify-center items-center
        transition-colors duration-200 ease-[ease]
        stroke-grey-500 hover:stroke-grey-800
        stroke-[8px]
      "
      onClick={onClick}
      type="button"
    >
      {show ? (
        <svg width="25" height="22" viewBox="0 0 107 97" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.4 5.4L96.8 91.8" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M46.8032 41.8176C45.0019 43.6177 43.9894 46.0596 43.9885 48.6062C43.9876 51.1528 44.9983 53.5955 46.7984 55.3968C48.5985 57.1982 51.0404 58.2106 53.587 58.2115C56.1336 58.2124 58.5763 57.2017 60.3776 55.4016"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40.9424 16.752C45.058 15.5747 49.3193 14.9848 53.6 15C72.8 15 88.7984 26.1984 101.6 48.6C97.8656 55.1328 93.8624 60.7152 89.5856 65.3424M79.3136 74.2752C71.4848 79.5552 62.9216 82.2 53.6 82.2C34.4 82.2 18.4016 71.0016 5.60001 48.6C12.1712 37.104 19.5824 28.56 27.8336 22.9632"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="25" height="18" viewBox="0 0 106 77" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M53 48.2C58.3019 48.2 62.6 43.9019 62.6 38.6C62.6 33.2981 58.3019 29 53 29C47.6981 29 43.4 33.2981 43.4 38.6C43.4 43.9019 47.6981 48.2 53 48.2Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M101 38.6C88.1984 61.0016 72.2 72.2 53 72.2C33.8 72.2 17.8016 61.0016 5 38.6C17.8016 16.1984 33.8 5 53 5C72.2 5 88.1984 16.1984 101 38.6Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default React.memo(PasswordButton);
