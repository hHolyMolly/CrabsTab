import React from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import type { TypeStatus } from '@interfaces/status.types';

import paths from '@configs/Router/paths';
import { toastText, toastID, toastDuration } from '@configs/constants/toast';

import { useAppDispatch, useAppSelector } from '@store';
import { fetchLogin, selectIsAuth } from '@store/slices/auth';

import Template from '../Template';
import { Button, PasswordButton, TextField, TextLink } from '@components/UI';

type TypeLoginFields = {
  email: string;
  password: string;
};

function Login() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  const [status, setStatus] = React.useState<TypeStatus>('loaded');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeLoginFields>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TypeLoginFields> = React.useCallback(async (values) => {
    try {
      setStatus('loading');
      toast.loading(toastText.loading, { id: toastID, className: 'toast-loading' });

      const { email, password } = values;

      const { payload } = await dispatch(fetchLogin({ email, password }));

      const message: string = payload?.message;

      if (payload?.code === 'ERR_BAD_REQUEST' || payload?.code === 'ERR_BAD_RESPONSE' || !payload) {
        setStatus('loaded');
        return toast.error(message || toastText.error, { id: toastID, duration: toastDuration, className: 'toast-error' });
      }

      navigate(paths.Home);
      toast.success(message || toastText.success, { id: toastID, className: 'toast-success' });
    } catch (err) {
      setStatus('error');
      toast.success(toastText.success, { id: toastID, className: 'toast-success' });
    } finally {
      setStatus('loaded');
    }
  }, []);

  if (isAuth) {
    return <Navigate to={paths.Home} />;
  }

  return (
    <Template title="Login" description="Login and have more fun" imageURL={require('@assets/img/auth/login.png')}>
      <form className="flex-col-auto" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <div className="mb-[15px] gap-[15px] flex-col-auto justify-center">
          <TextField
            hookForm={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            error={errors.email}
            type="email"
            placeholder="Email"
          />

          <TextField
            hookForm={register('password', {
              required: 'Password is required',
            })}
            error={errors.password}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            after={<PasswordButton show={showPassword} onShow={setShowPassword} />}
          />
        </div>

        <Button className="mb-[15px]" status={status} size="medium" type="submit">
          Login
        </Button>

        <div className="text-center text-grey-500">
          Don't have an account? <TextLink to={paths.Register}>Register</TextLink>
        </div>
      </form>
    </Template>
  );
}

export default Login;
