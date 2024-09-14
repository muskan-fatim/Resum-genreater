
import React from 'react';
import Head from 'next/head';

export const metadata = {
  title: 'Resume Generator',
  description: 'A tool to create, edit, and generate resumes dynamically.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      {children}
    </>
  );
}
