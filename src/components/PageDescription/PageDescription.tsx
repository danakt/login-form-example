import React, { PropsWithChildren } from 'react';
import styles from './styles.css';

type Props = PropsWithChildren<{
  //
}>;

export const PageDescription = (props: Props) => {
  return <h2 className={styles.pageDescription}>{props.children}</h2>;
};
