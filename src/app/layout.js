import "~/styles/globals.css";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import ClientHeaderWrapper from './_components/ClientHeaderWrapper';

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>
          <ClientHeaderWrapper />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
} 