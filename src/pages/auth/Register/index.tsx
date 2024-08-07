import React from 'react';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';

import type { TypeStatus } from '@interfaces/status.types';

import paths from '@configs/Router/paths';
import { toastText, toastID, toastDuration } from '@configs/constants/toast';

import { useAppDispatch, useAppSelector } from '@store';
import { fetchRegister, selectIsAuth } from '@store/slices/auth';

import Template from '../Template';
import { Button, PasswordButton, TextField, TextLink } from '@components/UI';

type TypeRegisterFields = {
  email: string;
  password: string;
  password_confirm: string;
};

function Register() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  const [status, setStatus] = React.useState<TypeStatus>('loaded');
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TypeRegisterFields>({
    defaultValues: {
      email: '',
      password: '',
      password_confirm: '',
    },
  });

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TypeRegisterFields> = React.useCallback(async (values) => {
    try {
      setStatus('loading');
      toast.loading(toastText.loading, { id: toastID, className: 'toast-loading' });

      const { email, password } = values;

      const { payload } = await dispatch(fetchRegister({ email, password }));

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
    <Template title="Register" description="Register and help us help you" imageURL={require('@assets/img/auth/register.png')}>
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
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
              maxLength: {
                value: 32,
                message: 'Password cannot exceed 32 characters',
              },
              pattern: {
                value: /^[a-zA-Z0-9]{8,32}$/,
                message: 'Password must contain only latin letters and numbers',
              },
            })}
            error={errors.password}
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            after={<PasswordButton show={showPassword} onShow={setShowPassword} />}
          />

          <TextField
            hookForm={register('password_confirm', {
              required: 'Please confirm your password',
              validate: (value: string) => {
                return value === watch('password') || 'Passwords do not match';
              },
            })}
            error={errors.password_confirm}
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            after={<PasswordButton show={showPassword} onShow={setShowPassword} />}
          />
        </div>

        <Button className="mb-[15px]" status={status} size="medium" type="submit">
          Register
        </Button>

        <div className="text-center text-grey-500">
          Already have an account? <TextLink to={paths.Login}>Login</TextLink>
        </div>
      </form>
    </Template>
  );
}

export default Register;
