import classNames from 'classnames';
import React, { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode, useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { InputValidator } from '../../types/form';
import styles from './styles.css';

type Props = {
  type?: HTMLInputTypeAttribute;
  value: string;
  label: string;
  isDefaultFocused?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  isValid?: boolean;
  errorMessage?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onIconClick?: () => void;
};

export const Input = (props: Props) => {
  const type = props.type ?? 'text';

  const [isFocused, setFocused] = useState(props.isDefaultFocused ?? false);
  const [isValidationResultShown, setValidationResultShown] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValidationResultShown(!isFocused);

    if (typeof props.onChange === 'function') {
      const value = event.target.value;
      props.onChange(value);
    }
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    if (typeof props.onBlur === 'function') {
      props.onBlur();
    }

    setFocused(false);
    setValidationResultShown(props.isValid != null);
  };

  return (
    <label
      className={classNames(styles.inputFocuser, {
        [styles.focused]: isFocused,
        [styles.error]: isValidationResultShown && !props.isValid,
        [styles.withIcon]: props.icon,
      })}
    >
      <div className={styles.inputPart}>
        <div className={styles.inputLabelsWrapper}>
          <div className={styles.inputLabel}>{props.label}</div>
          <div className={classNames(styles.inputError, { [styles.shown]: isValidationResultShown && !props.isValid })}>
            {isValidationResultShown && !props.isValid && props.errorMessage}
          </div>
        </div>

        <input
          className={styles.input}
          type={type}
          value={props.value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={props.placeholder}
          autoComplete={type === 'password' ? 'new-password' : 'off'}
        />
      </div>

      {isValidationResultShown && props.isValid && (
        <div className={styles.validationIcon}>
          <AiOutlineCheck size={18} />
        </div>
      )}

      {props.icon && (
        <div className={styles.inputIcon}>
          {props.onIconClick ? (
            <button className={styles.inputIconButton} onClick={props.onIconClick}>
              {props.icon}
            </button>
          ) : (
            props.icon
          )}
        </div>
      )}
    </label>
  );
};
