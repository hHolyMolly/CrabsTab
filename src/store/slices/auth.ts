import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import { type RootState } from '../';
import type { IUserModel } from '@interfaces/models/UserModel';
import type { TypeStatus } from '@interfaces/status.types';

import { API } from '@services/API';

type TypeAuthReturn = {
  token: string;
  user: IUserModel;
};

export const fetchRegister: any = createAsyncThunk('fetchRegister', async (values) => {
  try {
    const { data } = await API.post('/auth/register', values);

    return data;
  } catch (err) {
    console.log(err);

    const data = {
      ...err?.response?.data,
      code: err?.code,
    };

    return data;
  }
});

export const fetchLogin: any = createAsyncThunk('fetchLogin', async (values) => {
  try {
    const { data } = await API.post('/auth/login', values);

    return data;
  } catch (err) {
    const data = {
      ...err?.response?.data,
      code: err?.code,
    };

    return data;
  }
});

export const fetchGetMe: any = createAsyncThunk('fetchGetMe', async () => {
  try {
    const { data } = await API.get('/auth/me');

    return data;
  } catch (err) {
    const data = {
      ...err?.response?.data,
      code: err?.code,
    };

    return data;
  }
});

interface IAuth {
  user: IUserModel;

  token: string;

  status: TypeStatus;
}

const getToken: IAuth['token'] = window.localStorage.getItem('token') || null;

const initialState: IAuth = {
  user: null,

  token: getToken,

  status: 'loaded',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogout: (state) => {
      state.user = null;
      state.token = null;
      window.localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [fetchRegister.pending]: (state) => {
      state.status = 'loading';

      state.user = null;
    },

    [fetchRegister.fulfilled]: (state, { payload }: PayloadAction<TypeAuthReturn>) => {
      state.status = 'loaded';

      const { user } = payload;

      state.user = user;

      if (payload?.token) {
        state.token = payload?.token;
        window.localStorage.setItem('token', payload?.token);
      }
    },

    [fetchRegister.rejected]: (state) => {
      state.status = 'error';

      state.user = null;
    },

    [fetchLogin.pending]: (state) => {
      state.status = 'loading';

      state.user = null;
    },

    [fetchLogin.fulfilled]: (state, { payload }: PayloadAction<TypeAuthReturn>) => {
      state.status = 'loaded';

      const { user } = payload;

      state.user = user;

      if (payload?.token) {
        state.token = payload?.token;
        window.localStorage.setItem('token', payload?.token);
      }
    },

    [fetchLogin.rejected]: (state) => {
      state.status = 'error';

      state.user = null;
    },

    [fetchGetMe.pending]: (state) => {
      state.status = 'loading';

      state.user = null;
    },

    [fetchGetMe.fulfilled]: (state, { payload }: PayloadAction<IUserModel>) => {
      state.status = 'loaded';

      state.user = payload;
    },

    [fetchGetMe.rejected]: (state) => {
      state.status = 'error';

      state.user = null;
    },
  },
});

export const { setLogout } = authSlice.actions;

export const selectIsAuth = (state: RootState): boolean => Boolean(state.auth.token);

export default authSlice.reducer;
