import React, { PropsWithChildren } from 'react';
import styles from './styles.css';

type Props = PropsWithChildren<{
  //
}>;

export const PageHeader = (props: Props) => {
  return <h1 className={styles.heading}>{props.children}</h1>;
};
