import { Inter } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Dashboard PT S2P",
  description: "Tempat Sewa lapangan baik",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
