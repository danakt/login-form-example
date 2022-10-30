import React, { PropsWithChildren } from 'react';
import classNames from 'classnames';
import styles from './styles.css';

type Props = PropsWithChildren<{
  type?: 'primary' | 'secondary';
}>;

export const Text = (props: Props) => {
  const type = props.type ?? 'primary';

  return (
    <span
      className={classNames(styles.text, {
        [styles.primary]: type === 'primary',
        [styles.secondary]: type === 'secondary',
      })}
    >
      {props.children}
    </span>
  );
};
