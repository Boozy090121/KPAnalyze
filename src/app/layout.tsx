"use client";

import React from 'react';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Pharmaceutical Process Analytics Dashboard</title>
        <meta name="description" content="Advanced analytics dashboard for pharmaceutical manufacturing processes" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
