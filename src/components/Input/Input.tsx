import classNames from 'classnames';
import React, { ChangeEventHandler, HTMLInputTypeAttribute, ReactNode, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import styles from './styles.css';

type Props = {
  type?: HTMLInputTypeAttribute;
  name: string;
  value: string;
  label: string;
  isDefaultFocused?: boolean;
  placeholder?: string;
  icon?: ReactNode;
  isValid?: boolean;
  errorMessage?: string;
  isValidationResultShown?: boolean;
  iconButtonLabel?: string;
  onChange: (value: string, isFocused: boolean) => void;
  onBlur?: () => void;
  onIconButtonClick?: () => void;
};

export const Input = (props: Props) => {
  const type = props.type ?? 'text';

  const [isFocused, setFocused] = useState(props.isDefaultFocused ?? false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (typeof props.onChange === 'function') {
      const value = event.target.value;
      props.onChange(value, isFocused);
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
  };

  return (
    <label
      className={classNames(styles.inputFocuser, {
        [styles.focused]: isFocused,
        [styles.error]: props.isValidationResultShown && !props.isValid,
        [styles.withIcon]: props.icon,
      })}
    >
      <div className={styles.inputPart}>
        <div className={styles.inputLabelsWrapper}>
          <div className={styles.inputLabel}>{props.label}</div>
          <div
            className={classNames(styles.inputError, {
              [styles.shown]: props.isValidationResultShown && !props.isValid,
            })}
          >
            {props.isValidationResultShown && !props.isValid && props.errorMessage}
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

      {props.isValidationResultShown && props.isValid && (
        <div className={styles.validationIcon}>
          <AiOutlineCheck size={18} />
        </div>
      )}

      {props.icon && (
        <div className={styles.inputIcon}>
          {props.onIconButtonClick ? (
            <button
              className={styles.inputIconButton}
              onClick={props.onIconButtonClick}
              aria-label={props.iconButtonLabel}
              title={props.iconButtonLabel}
            >
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
