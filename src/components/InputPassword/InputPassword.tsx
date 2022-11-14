import React, { useState } from 'react';
import { Input } from '../Input/Input';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from './styles.css';
import classNames from 'classnames';

type Props = {
  value: string;
  name: string;
  label: string;
  placeholder?: string;
  isValid?: boolean;
  errorMessage?: string;
  isValidationResultShown?: boolean;
  onChange: (value: string, isFocused: boolean) => void;
  onBlur?: () => void;
};

export const InputPassword = (props: Props) => {
  const [isPasswordShown, setPasswordShown] = useState(false);

  return (
    <Input
      type={isPasswordShown ? 'text' : 'password'}
      label={props.label}
      value={props.value}
      name={props.name}
      onChange={props.onChange}
      placeholder={props.placeholder}
      isValid={props.isValid}
      errorMessage={props.errorMessage}
      isValidationResultShown={props.isValidationResultShown}
      icon={
        <div className={classNames(styles.showPasswordIcon, { [styles.shown]: isPasswordShown })}>
          {isPasswordShown ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
        </div>
      }
      onIconClick={() => setPasswordShown(!isPasswordShown)}
      onBlur={props.onBlur}
    />
  );
};
