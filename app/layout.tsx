import React from 'react';
import './globals.css';

export const metadata = {
  title: 'Radio Station App sponsored by radio.de',
  description: 'Explore the top 100 radio stations of radio.de',
};

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="text-white">{children}</body>
    </html>
  );
};

export default RootLayout;
