import Head from 'next/head';
import { ReactElement, ReactNode } from 'react';
import Header from './Header';

type Props = {
  children: JSX.Element,
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Clerk App</title>
        <meta property="og:title" content="Next.js + Clerk App" />
      </Head>
      <Header />
      <main className='container mx-auto mt-20'>{children}</main>
    </>
  );
};

export default Layout;
