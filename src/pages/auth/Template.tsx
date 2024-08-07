import React from 'react';
import { Link } from 'react-router-dom';

import paths from '@configs/Router/paths';

type Props = {
  children: React.ReactNode;
  title: String;
  description: string;
  imageURL: string;
};

function Template({ children, title, description, imageURL }: Props) {
  const backHome = React.useMemo(() => {
    return (
      <Link
        className="
          mt-[12px]
          flex items-center
          fill-orange-300
          hover:fill-orange-500
          hover:text-grey-800
        "
        to={paths.Home}
      >
        <svg className="mr-[4px] transition-colors duration-200 ease-[ease]" width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.9941 8.10083C16.9941 8.66239 16.5514 9.10227 16.0497 9.10227H15.1052L15.1259 14.097C15.1259 14.1843 15.12 14.2655 15.1111 14.3497V14.8551C15.1111 15.5445 14.5828 16.103 13.9306 16.103H13.4583C13.4259 16.103 13.3934 16.0749 13.3609 16.0999C13.3196 16.0749 13.2783 16.103 13.237 16.103H11.5694C10.9172 16.103 10.3889 15.5445 10.3889 14.8551V12.1097C10.3889 11.5575 9.96684 11.1114 9.44444 11.1114H7.55555C7.03316 11.1114 6.61111 11.5575 6.61111 12.1097V14.8551C6.61111 15.5445 6.08281 16.103 5.43055 16.103H3.78073C3.73646 16.103 3.69219 16.0999 3.64792 16.0967C3.6125 16.0999 3.57708 16.103 3.54167 16.103H3.06944C2.41748 16.103 1.88889 15.5445 1.88889 14.8551V11.361C1.88889 11.3329 1.88977 11.3017 1.89154 11.2736V9.10227H0.94592C0.413785 9.10227 0 8.66239 0 8.10083C0 7.82006 0.0886597 7.57048 0.295434 7.3521L7.8625 0.379962C8.0691 0.161143 8.30521 0.129883 8.5118 0.129883C8.7184 0.129883 8.95451 0.192403 9.13455 0.348702L16.6694 7.3521C16.9056 7.57048 17.0266 7.82006 16.9941 8.10083Z" />
        </svg>

        <span className="transition-colors duration-200 ease-[ease] text-[18px] leading-[1]">Back to home</span>
      </Link>
    );
  }, []);

  return (
    <div className="py-[30px] px-[15px] flex justify-center items-center flex-auto">
      <div className="m-auto max-w-[980px] w-full min-h-[630px] grid grid-cols-2">
        <div className="p-[30px_50px_50px] flex-col-auto bg-white">
          <div className="mb-[15px] flex flex-col">
            <div className="mb-[15px] flex justify-between items-start">
              <h1 className="mr-[15px] text-[32px]" style={{ overflowWrap: 'anywhere' }}>
                {title}
              </h1>

              {backHome}
            </div>

            <p className="text-[18px] text-grey-500" style={{ overflowWrap: 'anywhere' }}>
              {description}
            </p>
          </div>

          <div className="flex-col-auto">{children}</div>
        </div>

        <div className="pb-[100%] _ibg">
          <img src={imageURL} alt="Image" />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Template);
