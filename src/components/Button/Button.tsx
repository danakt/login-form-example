import React, { PropsWithChildren, ReactNode } from 'react';
import classNames from 'classnames';
import styles from './styles.css';

type Props = PropsWithChildren<{
  type?: 'primary' | 'secondary';
  icon?: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
}>;

export const Button = (props: Props) => {
  const type = props.type ?? 'primary';

  return (
    <button
      className={classNames(styles.button, {
        [styles.primary]: type === 'primary',
        [styles.secondary]: type === 'secondary',
      })}
      disabled={props.isDisabled}
      onClick={props.onClick}
    >
      {props.icon && <div className={styles.iconWrapper}>{props.icon}</div>}

      {props.children}
    </button>
  );
};
