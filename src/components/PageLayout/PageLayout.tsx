import React, { PropsWithChildren } from 'react';
import styles from './styles.css';

type Props = PropsWithChildren<{
  //
}>;

export const PageLayout = (props: Props) => {
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logoWrapper}>
          <div className={styles.logoImage} />
          <div className={styles.logoCompanyName}>Company name</div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.contentWrapper}>{props.children}</div>
      </main>

      <footer className={styles.footer}>
        Company name <span className={styles.copyleft} /> 2022
      </footer>
    </div>
  );
};
