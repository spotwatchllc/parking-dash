import '@/app/ui/global.css';
import { robotoMono } from '@/app/ui/fonts';

export const metadata = {
  title: 'Image Map Linker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css"
          rel="stylesheet"
        />
      </head>
      <body className={`${robotoMono.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
