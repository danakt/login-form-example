import React, { useState } from 'react';
import { Input } from '../Input/Input';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import styles from './styles.css';
import classNames from 'classnames';

type Props = {
  value: string;
  label: string;
  placeholder?: string;
  isValid?: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
};

export const InputPassword = (props: Props) => {
  const [isPasswordShown, setPasswordShown] = useState(false);

  return (
    <Input
      type={isPasswordShown ? 'text' : 'password'}
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      isValid={props.isValid}
      errorMessage={props.errorMessage}
      icon={
        <div className={classNames(styles.showPasswordIcon, { [styles.shown]: isPasswordShown })}>
          {isPasswordShown ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
        </div>
      }
      onIconClick={() => setPasswordShown(!isPasswordShown)}
    />
  );
};
