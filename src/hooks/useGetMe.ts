import React from 'react';
import { useNavigate } from 'react-router-dom';

import paths from '@configs/Router/paths';

import { useAppDispatch, useAppSelector } from '@store';
import { fetchGetMe, selectIsAuth, setLogout } from '@store/slices/auth';

function useGetMe(): void {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const { payload } = await dispatch(fetchGetMe());

      if (payload?.code === 'ERR_BAD_REQUEST' || payload?.code === 'ERR_BAD_RESPONSE' || !payload) {
        dispatch(setLogout());
        return navigate(paths.Home);
      }
    } catch (err) {
      dispatch(setLogout());
      navigate(paths.Home);
    }
  }

  React.useEffect(() => {
    if (isAuth) {
      sendRequest();
    }
  }, []);
}

export default useGetMe;
