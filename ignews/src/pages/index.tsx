import Head from 'next/head';

import styles from '../styles/home.module.scss';

function Home() {
  return (
    <>
      <Head>
        <title>
          Início | ig.news
        </title>
      </Head>

      <h1 className={styles.title}>
        Hello <span>world</span>!
      </h1>
    </>
  );
}

export default Home;
