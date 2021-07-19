/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import Link from 'next/link';

import { ActiveLink } from '../ActiveLink';

import { SignInButton } from './components/SignInButton';

import styles from './styles.module.scss';

export function Header() {
  const { asPath } = useRouter();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />

        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a className={asPath === '/' ? styles.active : ''}>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active} prefetch>
            <a className={asPath === '/posts' ? styles.active : ''}>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  )
}
