import classNames from 'classnames';
import React, { ReactNode, useState } from 'react';
import styles from './styles.css';
import { BsCheckLg } from 'react-icons/bs';

type Props = {
  text: ReactNode;
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

export const Checkbox = (props: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(event.target.checked);
  };

  return (
    <label className={styles.wrapper}>
      <input className={styles.realCheckbox} type="checkbox" checked={props.isChecked} onChange={handleChange} />

      <div className={styles.displayedCheckbox}>
        {props.isChecked && (
          <BsCheckLg
            className={classNames(styles.checkIcon, {
              [styles.shown]: props.isChecked,
            })}
          />
        )}
      </div>

      <div>{props.text}</div>
    </label>
  );
};
