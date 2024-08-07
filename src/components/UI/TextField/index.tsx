import React from 'react';
import classNames from 'classnames';
import { type UseFormRegisterReturn, type FieldError } from 'react-hook-form';

import styles from './TextField.module.scss';

type Props = {
  className?: string;
  hookForm?: UseFormRegisterReturn;
  error?: FieldError;
  label?: string | false;
  disabled?: boolean;
  type?: HTMLInputElement['type'];
  placeholder?: HTMLInputElement['placeholder'];
  before?: React.ReactNode;
  after?: React.ReactNode;
};

const TextField: React.FC<Props> = ({ className, hookForm, error, label = false, type = '', placeholder = '', disabled = false, before, after }) => {
  return (
    <div className={classNames(styles.TextField, className)}>
      {label && <div className={styles.TextFieldLabel}>{label}</div>}

      <div className="w-full relative">
        {before && <div className={styles.TextFieldBefore}>{before}</div>}

        <input
          className={classNames(styles.TextFieldInput, before && styles.TextFieldInputBefore, after && styles.TextFieldInputAfter, error && styles.TextFieldInputError)}
          {...hookForm}
          disabled={disabled}
          type={type}
          placeholder={placeholder}
        />

        {after && <div className={styles.TextFieldAfter}>{after}</div>}
      </div>

      {error && <div className={styles.TextFieldError}>{error?.message}</div>}
    </div>
  );
};

export default React.memo(TextField);
