import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "@/components/ScrollToTop";
// import logo from '../../public/'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PetNest || Find your new family member",
  icons:{
    icon:'/logo.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased body`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <ScrollToTop></ScrollToTop>
        <Navbar></Navbar>
        {children}
        <ToastContainer />
        <Footer></Footer>
      </body>
    </html>
  );
}
