import '@/app/ui/global.css';

import { robotoMono } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${robotoMono.className} antialiased`}>{children}</body>
    </html>
  );
}