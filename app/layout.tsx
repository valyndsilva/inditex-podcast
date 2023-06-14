import { Header, Providers } from "./components";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Inditex Music Podcast",
  description: "Created using Next.js, TypeScript and TailwindCSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white flex min-h-screen flex-col items-center p-10 max-w-7xl mx-auto `}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
