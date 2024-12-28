import '@/styles/global.css';

import clsx from 'clsx';
import { Inter } from 'next/font/google';

const fontFamily = Inter({ subsets: ['latin'], variable: '--font-primary' });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
<meta name="viewport" content="width=device-width, user-scalable=no" />
</head>
      <body className={clsx('bg-gray-950 text-gray-50 p-4', fontFamily.variable)}>{children}</body>
    </html>
  );
}
