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
<meta charset="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" /> -->
    <title>Random</title>
    <link rel="manifest" href="/manifest.json" />
    <link rel="stylesheet" href="/style.css">
    
    <!-- The `react-native-web` recommended style reset: https://necolas.github.io/react-native-web/docs/setup/#root-element -->
    <style id="expo-reset">
      /* These styles make the body full-height */
      html,
      body {
        height: 100%;
      }
      /* These styles disable body scrolling if you are using <ScrollView> */
      body {
        overflow: hidden;
      }
      /* These styles make the root element full-height */
      #root {
        display: flex;
        height: 100%;
        flex: 1;
      }
    </style>
</head>
      <link rel="manifest" href="/manifest.json" />
      <body className={clsx('bg-gray-950 text-gray-50 p-4', fontFamily.variable)}>{children}</body>
    </html>
  );
}
