import { Inter, Lusitana, Roboto_Mono } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] });

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'], // optional: choose which weights you want
  variable: '--font-roboto-mono', // optional CSS variable
});
