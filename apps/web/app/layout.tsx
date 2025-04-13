import type { Metadata } from "next";
import { Poppins, Galada } from "next/font/google";
import "./globals.css";
import { MyContext } from "./context/MyContext";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const galada = Galada({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-school",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "LazyDev",
  description: "Get the best job possible",
  icons: {
    icon: "/LazyDev.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MyContext>
      <html lang="en" className={`${poppins.className} ${galada.className}`}>
        <body className="text-sm">
          {children}
          <Toaster position="top-center" duration={2000} />
        </body>
      </html>
    </MyContext>
  );
}
