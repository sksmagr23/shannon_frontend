import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'antd/dist/reset.css';
import Navbar from "../../Components/layout/navbar";
import { Montserrat } from 'next/font/google';
import SessionWrapper from "../../Components/Session-Wrapper/SessionWrapper";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ['latin'], 
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata = {
  title: "Shannon web app",
  description: "Accurate Predictions for a Sustainable Future",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Navbar />
          {children}
        </body>
      </SessionWrapper>
    </html>
  );
}
