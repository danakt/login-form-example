import React, { PropsWithChildren } from 'react';
import styles from './styles.css';

type Props = PropsWithChildren<{
  //
}>;

export const PageDescription = (props: Props) => {
  return <span className={styles.pageDescription}>{props.children}</span>;
};
